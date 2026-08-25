/**
 * Prepends Vite's base URL to asset paths from /public.
 * Locally BASE_URL is "/", on GitHub Pages it's "/mechty-i-sudby/".
 */
const BASE = import.meta.env.BASE_URL;

export function asset(path: string): string {
  // Remove leading slash to avoid double-slash
  const clean = path.replace(/^\//, '');
  return `${BASE}${clean}`;
}
