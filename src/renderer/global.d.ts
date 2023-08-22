import { api } from '../main/preload';

type ApiSurface = typeof api;

declare global {
  interface Window {
    electron: ApiSurface;
  }
}
