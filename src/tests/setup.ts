import 'vitest-dom/extend-expect';
import * as domMatchers from 'vitest-dom/matchers';
import { expect, afterEach, afterAll, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from '@/tests/utils';

expect.extend(domMatchers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
  cleanup();
});
