/// <reference types="vite/client" />

declare module 'swiper/css'
declare module 'swiper/css/pagination'

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string
  readonly VITE_WS_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
