/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly MODE: string;
  readonly REACT_APP_API_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
