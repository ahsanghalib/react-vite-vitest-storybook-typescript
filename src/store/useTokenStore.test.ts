import { renderHook, act } from '@testing-library/react';
import { useTokenStore } from './useTokenStore';

describe('useTokenStore', () => {
  test('setTokens', () => {
    const { result } = renderHook(() => useTokenStore());
    expect(result.current.accessToken).toBe('');
    expect(result.current.refreshToken).toBe('');

    act(() => {
      result.current.setTokens({
        accessToken: 'foo',
        refreshToken: 'bar',
      });
    });

    expect(result.current.accessToken).toBe('foo');
    expect(result.current.refreshToken).toBe('bar');
  });

  test('clearTokens', () => {
    useTokenStore.setState({
      accessToken: 'foo',
      refreshToken: 'foo',
    });

    const { result } = renderHook(() => useTokenStore());

    expect(result.current.accessToken).toBe('foo');
    expect(result.current.refreshToken).toBe('foo');

    act(() => {
      result.current.clearTokens();
    });

    expect(result.current.accessToken).toBe('');
    expect(result.current.refreshToken).toBe('');
  });

  test('isAuth - false', () => {
    const { result } = renderHook(() => useTokenStore());

    let isAuth;
    act(() => {
      isAuth = result.current.isAuth();
    });

    expect(isAuth).toBe(false);
  });

  test('isAuth - true', () => {
    useTokenStore.setState({
      accessToken: 'foo',
      refreshToken: 'foo',
    });

    const { result } = renderHook(() => useTokenStore());

    let isAuth;
    act(() => {
      isAuth = result.current.isAuth();
    });

    expect(isAuth).toBe(true);
  });
});
