/**
 * Модуль интеграции Яндекс Метрики.
 * 
 * Инициализируется только после согласия пользователя в окне Cookie/Согласия.
 * Чтобы активировать сбор аналитики, укажите реальный ID счетчика в переменной YANDEX_METRIKA_ID.
 */

// Замените на ваш ID счетчика Яндекс Метрики, когда получите его
export const YANDEX_METRIKA_ID: number | null = null;

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
    webvisor: true,
  });

  isInitialized = true;
}

export function trackGoal(targetName: string, params?: Record<string, any>) {
  if (YANDEX_METRIKA_ID && typeof window.ym === 'function') {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', targetName, params);
  }
}
