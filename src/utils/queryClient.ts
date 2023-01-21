import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {},
    queries: {
      retry: false,
      staleTime: Infinity,
      cacheTime: 60 * 60 * 1000,
    },
  },
});
