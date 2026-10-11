import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readStoragePreferences, saveCookiePreferences } from '../cookiePreferences';

export function CookiePreferencesButton() {
  return (
    <button
      className="cookie-settings"
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
    >
      Настройки cookies
    </button>
  );
}

export function CookieBanner() {
  const [open, setOpen] = useState(() => readStoragePreferences() === null);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);

  useEffect(() => {
    const listener = () => {
      const current = readStoragePreferences();
      if (current) {
        setAnalyticsAllowed(current.analytics);
      }
      setOpen(true);
      setShowDetails(true);
    };
    window.addEventListener('open-cookie-settings', listener);
    return () => window.removeEventListener('open-cookie-settings', listener);
  }, []);

  function handleAcceptAll() {
    saveCookiePreferences({ analytics: true });
    setOpen(false);
  }

  function handleAcceptEssentialOnly() {
    saveCookiePreferences({ analytics: false });
    setOpen(false);
  }

  function handleSaveCustom() {
    saveCookiePreferences({ analytics: analyticsAllowed });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <section className="cookie-banner" role="region" aria-labelledby="cookie-title">
      <div className="cookie-content">
        <div className="cookie-icon" aria-hidden="true">🍪</div>
        <div className="cookie-text">
          <strong id="cookie-title">Мы используем файлы cookie и аналитику</strong>
          <span>
            Они помогают сохранять место чтения в электронной книге, обеспечивать работу сайта и анонимно понимать, какие разделы и материалы наиболее полезны приёмным семьям.
          </span>

          {showDetails && (
            <div className="cookie-details" style={{ marginTop: '0.85rem' }}>
              <div className="cookie-category">
                <label className="cookie-checkbox-label">
                  <input type="checkbox" checked disabled />
                  <span>
                    <strong>Необходимые cookies и хранилище</strong> (всегда включены)
                    <small>Сохранение вашего выбора согласия и закладки чтения книги в браузере.</small>
                  </span>
                </label>
              </div>

              <div className="cookie-category" style={{ marginTop: '0.5rem' }}>
                <label className="cookie-checkbox-label">
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  />
                  <span>
                    <strong>Статистика и Яндекс Метрика</strong>
                    <small>Анонимный сбор посещаемости без передачи персональных данных третьим лицам.</small>
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="cookie-policy-link">
            <Link to="/privacy#browser-storage">Политика обработки данных</Link>
            {!showDetails && (
              <button
                type="button"
                className="cookie-customize-btn"
                onClick={() => setShowDetails(true)}
              >
                Настроить состав
              </button>
            )}
          </div>
        </div>

        <div className="cookie-btns">
          {showDetails ? (
            <>
              <button type="button" className="cookie-accept" onClick={handleSaveCustom}>
                Сохранить выбор
              </button>
              <button type="button" className="cookie-decline" onClick={handleAcceptEssentialOnly}>
                Только необходимые
              </button>
            </>
          ) : (
            <>
              <button type="button" className="cookie-accept" onClick={handleAcceptAll}>
                Принять все
              </button>
              <button
                type="button"
                className="cookie-decline"
                onClick={handleAcceptEssentialOnly}
              >
                Только необходимые
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
