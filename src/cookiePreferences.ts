import { disableYandexMetrika, initYandexMetrika } from './yandexMetrika';

export const bookmarkKey = 'mechty-i-sudby:rozhdennye-serdtsem:bookmark';
const preferenceKey = 'mechty-i-sudby:cookie-preferences:v3';
const previousPreferenceKey = 'mechty-i-sudby:cookie-preferences:v2';
const legacyPreferenceKey = 'mechty-i-sudby:storage-choice:v1';
const lifetime = 180 * 24 * 60 * 60 * 1000;

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  at: number;
}

export function readStoragePreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(preferenceKey);
    if (raw) {
      const record = JSON.parse(raw);
      if (
        record &&
        typeof record.necessary === 'boolean' &&
        typeof record.analytics === 'boolean' &&
        typeof record.at === 'number' &&
        Date.now() >= record.at &&
        Date.now() - record.at < lifetime
      ) {
        return record;
      }
    }

  } catch {
    /* Storage can be unavailable */
  }
  return null;
}

/**
 * Для сохранения прогресса в истории (обратная совместимость с существующим кодом)
 */
export function readStorageChoice(): boolean | null {
  const prefs = readStoragePreferences();
  if (prefs) return prefs.necessary;
  try {
    const previous = localStorage.getItem(previousPreferenceKey);
    if (previous) {
      const record = JSON.parse(previous);
      if (typeof record.necessary === 'boolean' && typeof record.at === 'number' && Date.now() - record.at < lifetime) {
        return record.necessary;
      }
    }
    const legacy = localStorage.getItem(legacyPreferenceKey);
    if (legacy) {
      const record = JSON.parse(legacy);
      if (typeof record.allowed === 'boolean') return record.allowed;
    }
  } catch {
    /* Storage can be unavailable */
  }
  return null;
}

export function saveCookiePreferences(options: { analytics: boolean }) {
  const preferences: CookiePreferences = {
    necessary: true,
    analytics: options.analytics,
    at: Date.now(),
  };

  try {
    localStorage.setItem(preferenceKey, JSON.stringify(preferences));
    if (!options.analytics) {
      // При отказе от аналитики не трогаем закладку, но если отключено вообще все - удаляем
    }
  } catch {
    /* The site remains usable without storage */
  }

  if (options.analytics) {
    initYandexMetrika();
  } else {
    disableYandexMetrika();
  }

  window.dispatchEvent(new CustomEvent('cookie-preferences-changed', { detail: preferences }));
  window.dispatchEvent(new Event('storage-choice-changed'));
}

export function saveStorageChoice(allowed: boolean) {
  saveCookiePreferences({ analytics: allowed });
  if (!allowed) {
    try {
      localStorage.removeItem(bookmarkKey);
    } catch {
      /* ignore */
    }
  }
}

// Автоматически запускаем Яндекс Метрику при старте, если пользователь уже давал согласие
if (typeof window !== 'undefined') {
  const existing = readStoragePreferences();
  if (existing?.analytics) {
    initYandexMetrika();
  }
}
