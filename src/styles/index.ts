import { css } from 'styled-components';

/**
 * STYLE HELPERS
 */
export const mpGetter = (v: number | string) => (typeof v === 'number' ? `${v}rem` : `${v}`);

export const lighten = (v: number) => css`
  filter: brightness(${v + 1});
`;

export const darken = (v: number) => css`
  filter: brightness(${1 - v});
`;

/**
 * TESTS
 */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('mpGetter - rem', () => {
    const result = mpGetter(2);
    expect(result).toEqual('2rem');
  });

  test('mpGetter - without rem', () => {
    const result = mpGetter('2rem 2rem 2rem 2rem');
    expect(result).toEqual('2rem 2rem 2rem 2rem');
  });

  test('lighten', () => {
    const result = lighten(0.2);
    expect(result).toMatchSnapshot();
  });

  test('darken', () => {
    const result = darken(0.2);
    expect(result).toMatchSnapshot();
  });
}

/* c8 ignore start */

export * from './theme';
export * from './globalStyles';

/* c8 ignore stop */
