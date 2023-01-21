import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '@/styles';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppRoutes } from '@/routes';
import { queryClient } from '@/utils/queryClient';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
