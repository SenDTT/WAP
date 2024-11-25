/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly API_ENDPOINT: string;
  readonly API_KEY: string;
  readonly CITY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const API_ENDPOINT: string;
declare const API_KEY: string;
declare const CITY: string;
