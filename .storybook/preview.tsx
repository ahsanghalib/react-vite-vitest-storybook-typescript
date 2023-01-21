import React from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from '@storybook/theming';
import { theme } from '../src/styles/theme';
import { GlobalStyles } from '../src/styles/globalStyles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: themes.dark,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (story: any) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{ margin: '1rem' }}>{story()}</div>
    </ThemeProvider>
  ),
];
