/* c8 ignore start */
export const { MODE: ENVIRONMENT, REACT_APP_API_DOMAIN: API_DOMAIN } = import.meta.env;

export enum STORAGE_KEYS {
  ACCESS_TOKEN_KEY = 'token',
  REFRESH_TOKEN_KEY = 'refresh',
}

export const API_ENDPOINTS = {
  AUTH_JWT: `/auth/api/jwt/`,
  AUTH_REFRESH: `/auth/api/jwt/refresh/`,
};

/* c8 ignore stop */
