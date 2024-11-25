/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly API_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const API_ENDPOINT: string;
