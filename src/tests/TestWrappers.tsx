import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '@/styles';
import { QueryClientTestWrapper } from './QueryClientTestWrapper';
import { MemoryRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  initialEntries?: any[];
}

export const TestWrappers: React.FC<Props> = ({ children, initialEntries = ['/'] }) => {
  const routes = <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {QueryClientTestWrapper()({ children: routes })}
    </ThemeProvider>
  );
};
