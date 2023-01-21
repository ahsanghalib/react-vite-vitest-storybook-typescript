import { useTokenStore } from '@/store';
import { queryClient } from '@/utils/queryClient';
import { getApiEndpoint } from '@/utils';
import { rest, server } from '@/tests/utils';
import qs from 'qs';

const { fetch: orignalFetch } = window;

const defaultHeaders = { 'Content-Type': 'application/json; charset=UTF-8' };

const authHeaders = () => {
  const { isAuth, accessToken } = useTokenStore.getState();
  return isAuth()
    ? { Authorization: `Bearer ${accessToken}`, ...defaultHeaders }
    : { ...defaultHeaders };
};

const apiError = (status: number, statusText: string, error: string) => ({
  status,
  statusText,
  error,
});

const refreshTokenRequest = async () => {
  const { refreshToken, clearTokens, setTokens } = useTokenStore.getState();
  const res = await orignalFetch(getApiEndpoint('AUTH_REFRESH'), {
    method: 'POST',
    body: JSON.stringify({ refresh: refreshToken }),
    headers: defaultHeaders,
  });
  if (!res.ok && res.status === 401) {
    clearTokens();
    return Promise.reject(apiError(res.status, res.statusText, await res.text()));
  }
  const data: { accessToken: string; refreshToken: string } = await res.json();
  setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
};

const fetch = async (req: Request) => {
  const res = await orignalFetch(req);
  if (!res.ok && res.status === 401) {
    await refreshTokenRequest();
    await queryClient.invalidateQueries();
    return;
  }
  if (!res.ok) {
    return Promise.reject(apiError(res.status, res.statusText, await res.text()));
  }
  return await res.json();
};

export const apiClient = {
  get: async (
    url: string,
    params?: Record<string, string>,
    headers = {},
    removeAuthHeaders = false,
  ) => {
    try {
      const u = new URL(url);
      u.search = Object.keys(params || {}).length ? qs.stringify(params, { encode: false }) : '';
      const h = removeAuthHeaders
        ? { ...headers, ...defaultHeaders }
        : { ...headers, ...authHeaders() };
      const req = new Request(u, {
        method: 'GET',
        headers: { ...h },
      });
      return await fetch(req);
    } catch {
      throw new Error('Invalid Request');
    }
  },

  post: async (url: string, data: any, headers = {}) => {
    try {
      const u = new URL(url);
      const h = { ...headers, ...authHeaders };
      const req = new Request(u, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { ...h },
      });
      return await fetch(req);
    } catch {
      throw new Error('Invalid Request');
    }
  },
};

/**
 * TESTS
 */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('authHeaders - noAuth', () => {
    useTokenStore.setState({
      accessToken: '',
      refreshToken: '',
    });
    expect(authHeaders()).toStrictEqual(defaultHeaders);
  });

  test('authHeaders - Auth', () => {
    useTokenStore.setState({
      accessToken: 'foo',
      refreshToken: 'foo',
    });
    const { accessToken } = useTokenStore.getState();
    expect(authHeaders()).toStrictEqual({
      Authorization: `Bearer ${accessToken}`,
      ...defaultHeaders,
    });
  });

  test('apiError', () => {
    const err = apiError(401, 'unauthorized', 'unauthorized');
    expect(err).toStrictEqual({
      status: 401,
      statusText: 'unauthorized',
      error: 'unauthorized',
    });
  });

  test('refreshTokenRequest - Expired', async () => {
    server.use(
      rest.post(getApiEndpoint('AUTH_REFRESH'), (req, res, ctx) => {
        return res(ctx.status(401));
      }),
    );

    await expect(refreshTokenRequest()).rejects.toStrictEqual({
      error: '',
      status: 401,
      statusText: 'Unauthorized',
    });
  });

  test('refreshTokenRequest - Okay', async () => {
    server.use(
      rest.post(getApiEndpoint('AUTH_REFRESH'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ accessToken: 'new_jwt', refreshToken: 'new_ref' }));
      }),
    );
    await refreshTokenRequest();
    const { refreshToken, accessToken } = useTokenStore.getState();
    expect(refreshToken).toEqual('new_ref');
    expect(accessToken).toEqual('new_jwt');
  });

  test('fetch - okay', async () => {
    const URL = 'https://foo.bar';
    server.use(
      rest.get(URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'Okay' }));
      }),
    );
    const req = new Request(URL);
    const result = await fetch(req);
    expect(result).toStrictEqual({ status: 'Okay' });
  });

  test('fetch - error', async () => {
    const URL = 'https://foo.bar';
    server.use(
      rest.get(URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ status: 'error' }));
      }),
    );
    const req = new Request(URL);
    await expect(fetch(req)).rejects.toStrictEqual({
      error: JSON.stringify({ status: 'error' }),
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  test('fetch - 401', async () => {
    const URL = 'https://foo.bar';
    server.use(
      rest.get(URL, (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({ status: 'error' }));
      }),
    );
    server.use(
      rest.post(getApiEndpoint('AUTH_REFRESH'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ accessToken: 'new_jwt', refreshToken: 'new_ref' }));
      }),
    );
    const req = new Request(URL);
    await fetch(req);
    const { refreshToken, accessToken } = useTokenStore.getState();
    expect(refreshToken).toEqual('new_ref');
    expect(accessToken).toEqual('new_jwt');
  });

  test('apiClient - invalid request error', async () => {
    await expect(apiClient.get('/foobar')).rejects.toThrow('Invalid Request');
    await expect(apiClient.post('/foobar', {})).rejects.toThrow('Invalid Request');
  });
}
