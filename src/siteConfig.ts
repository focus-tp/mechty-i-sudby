const legacySiteUrl = 'https://focus-tp.github.io/mechty-i-sudby/';

export const siteUrl = import.meta.env.VITE_SITE_URL
  || (import.meta.env.PROD
    ? new URL(import.meta.env.BASE_URL, window.location.origin).href
    : legacySiteUrl);

export const isRegHosting = import.meta.env.VITE_HOSTING_PROVIDER === 'reg-ru';

export function withCurrentSiteUrl(text: string): string {
  return text.replaceAll(legacySiteUrl, siteUrl);
}
