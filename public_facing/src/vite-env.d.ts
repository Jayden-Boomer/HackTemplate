/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_BASE_URL?: string
  // Add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


