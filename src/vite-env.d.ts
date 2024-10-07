/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOVE_SMART_API: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
