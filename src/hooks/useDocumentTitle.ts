import { useEffect } from 'react';

const SITE_NAME = 'Мечты и судьбы';

/**
 * Хук для установки заголовка вкладки.
 * SEO: каждая страница получает уникальный <title>.
 * @param pageTitle — заголовок текущей страницы (без имени сайта)
 */
export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = pageTitle
      ? `${pageTitle} | ${SITE_NAME}`
      : `${SITE_NAME} | Помощь приёмным семьям в Екатеринбурге`;

    return () => {
      document.title = prev;
    };
  }, [pageTitle]);
}
