/* c8 ignore start */
import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { TestWrappers } from '@/tests/TestWrappers';

const server = setupServer();

const customRender = (ui: React.ReactElement, wrapper = true, options = {}) =>
  wrapper ? render(ui, { wrapper: TestWrappers, ...options }) : render(ui, { ...options });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render, server, rest };

/* c8 ignore stop */
