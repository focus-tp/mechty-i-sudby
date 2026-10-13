/**
 * Модуль интеграции Яндекс Метрики.
 * 
 * Инициализируется только после согласия пользователя в окне Cookie/Согласия.
 * Чтобы активировать сбор аналитики, задайте VITE_YANDEX_METRIKA_ID при сборке.
 */

const configuredId = Number(import.meta.env.VITE_YANDEX_METRIKA_ID);
export const YANDEX_METRIKA_ID: number | null = Number.isSafeInteger(configuredId) && configuredId > 0 ? configuredId : null;

declare global {
  interface Window {
    ym?: ((id: number, action: string, ...args: any[]) => void) & {
      a?: any[];
      l?: number;
    };
  }
}

let isInitialized = false;

export function initYandexMetrika() {
  if (isInitialized || !YANDEX_METRIKA_ID) return;
  if (typeof window === 'undefined') return;
  Object.assign(window, { [`disableYaCounter${YANDEX_METRIKA_ID}`]: false });

  (function (m: any, e: any, t: any, r: any, i: any) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * (new Date() as any);
    for (let j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    const k = e.createElement(t);
    const a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

  window.ym?.(YANDEX_METRIKA_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  });

  isInitialized = true;
}

export function disableYandexMetrika() {
  if (!YANDEX_METRIKA_ID || typeof window === 'undefined') return;
  Object.assign(window, { [`disableYaCounter${YANDEX_METRIKA_ID}`]: true });
  if (isInitialized) window.ym?.(YANDEX_METRIKA_ID, 'destruct');
  isInitialized = false;
}

export function trackGoal(targetName: string, params?: Record<string, any>) {
  if (YANDEX_METRIKA_ID && typeof window.ym === 'function') {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', targetName, params);
  }
}
