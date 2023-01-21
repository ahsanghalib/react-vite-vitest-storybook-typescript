/* eslint-disable react/display-name */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const QueryClientTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
      queries: {
        retry: false,
        staleTime: Infinity,
        cacheTime: 60 * 60 * 1000,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
