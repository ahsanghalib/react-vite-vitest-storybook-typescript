import { API_DOMAIN, API_ENDPOINTS } from '@/constants';

export const getApiEndpoint = (key: keyof typeof API_ENDPOINTS, baseUrl: string = API_DOMAIN) =>
  `${baseUrl}${API_ENDPOINTS[key]}`;
