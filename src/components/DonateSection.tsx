import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Copy, ExternalLink, FileText, ReceiptText } from 'lucide-react';
import { Reveal } from './Reveal';
import { useUI } from '../context/UIContext';
import { asset } from '../utils';

const presetAmounts = [500, 1000, 2500, 5000];
const documents = [
  { title: 'Реквизиты организации', meta: 'Официальные сведения АНО', href: '/legal' },
  { title: 'Устав АНО', meta: 'Учредительный документ · PDF', href: '/документы/устав НКО.pdf', external: true },
  { title: 'Лист записи ЕГРЮЛ', meta: 'Государственная регистрация · PDF', href: '/документы/Лист записи ЕГРЮЛ.pdf', external: true },
  { title: 'Выписка из ЕГРН', meta: 'Реестр налогоплательщиков · PDF', href: '/документы/Выписка из ЕГРН.pdf', external: true },
  { title: 'Публичная оферта', meta: 'Условия пожертвования', href: '/offer' },
  { title: 'Политика обработки персональных данных', meta: 'Правила обработки данных', href: '/privacy' },
  { title: 'Согласие на обработку данных', meta: 'Отдельный документ', href: '/consent' },
  { title: 'Согласие на рассылку', meta: 'Добровольная подписка по e-mail', href: '/mailing-consent' },
  { title: 'Пользовательское соглашение', meta: 'Правила использования сайта', href: '/terms' },
  { title: 'Отчётность организации', meta: 'Порядок публикации отчётов', href: '/reports' },
];

const bankDetails = {
  recipient: 'АНО «Мечты и судьбы»',
  account: '40703810311940000002',
  bank: 'АО «Альфа-Банк»',
  bik: '044525593',
  correspondentAccount: '30101810200000000593',
};

const bankDetailsText = `Получатель: ${bankDetails.recipient}
ИНН: 6686173647
КПП: 667901001
Расчётный счёт: ${bankDetails.account}
Банк: ${bankDetails.bank}
БИК: ${bankDetails.bik}
Корреспондентский счёт: ${bankDetails.correspondentAccount}
Назначение платежа: добровольное пожертвование на уставную деятельность.`;

export function DonateSection() {
  const { showToast } = useUI();
  const [amount, setAmount] = useState('1000');
  const [isCustom, setIsCustom] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [needsReceipt, setNeedsReceipt] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [dataAccepted, setDataAccepted] = useState(false);

  const canPrepareTransfer = offerAccepted;

  const selectAmount = (value: number) => {
    setAmount(String(value));
    setIsCustom(false);
    setShowTransfer(false);
  };

  const chooseCustomAmount = () => {
    setAmount('');
    setIsCustom(true);
    setShowTransfer(false);
  };

  const prepareTransfer = () => {
    const numericAmount = Number(amount);
    if (!amount || numericAmount < 50) {
      showToast('Введите сумму от 50 ₽');
      return;
    }
    if (!offerAccepted) {
      showToast('Примите условия публичной оферты');
      return;
    }
    setShowTransfer(true);
  };

  const prepareReceiptEmail = () => {
    if (!donorEmail.trim()) {
      showToast('Укажите e-mail для квитанции');
      return;
    }
    if (!dataAccepted) {
      showToast('Подтвердите согласие на обработку данных');
      return;
    }

    const subject = encodeURIComponent('Квитанция о пожертвовании');
    const body = encodeURIComponent(
      `Здравствуйте! Прошу направить квитанцию о пожертвовании на сумму ${Number(amount).toLocaleString('ru-RU')} ₽.\n\nИмя: ${donorName || 'не указано'}\nE-mail: ${donorEmail}\n\nОтправляя это письмо, я подтверждаю согласие на обработку указанных персональных данных для подготовки и направления квитанции. Версия согласия — 01.10.2026.`,
    );
    window.location.href = `mailto:mechty.sudby@mail.ru?subject=${subject}&body=${body}`;
  };

  const copyBankDetails = async () => {
    try {
      await navigator.clipboard.writeText(bankDetailsText);
      showToast('Реквизиты скопированы');
    } catch {
      showToast('Не удалось скопировать реквизиты. Выделите их вручную.');
    }
  };

  const formattedAmount = amount && Number(amount) >= 0
    ? `${Number(amount).toLocaleString('ru-RU')} ₽`
    : 'пожертвование';

  return (
    <section className="donate" id="donate">
      <div className="donate-inner">
        <div className="donate-editorial">
          <Reveal>
            <div className="donate-story">
              <div className="section-label">Пожертвования</div>
              <h2 className="section-title">Помочь продолжить <em>историю</em></h2>
              <p className="donate-lead">
                Ваша поддержка помогает проводить группы для родителей, развивать площадку «Связь», обеспечивать психологическую поддержку детям и обучать специалистов.
              </p>
              <p className="donate-note" aria-hidden="true">помощь становится частью истории</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="donate-panel">
              <p className="donate-frequency-note">Разовое пожертвование на уставные программы организации.</p>

              <div className="donate-panel__heading">
                <span>Размер пожертвования</span>
                <small>Минимальная сумма 50 ₽</small>
              </div>

              <div className="donate-amounts" aria-label="Выберите размер пожертвования">
                {presetAmounts.map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={`donate-amount ${!isCustom && amount === String(value) ? 'is-active' : ''}`}
                    onClick={() => selectAmount(value)}
                    aria-pressed={!isCustom && amount === String(value)}
                  >
                    {value.toLocaleString('ru-RU')} ₽
                  </button>
                ))}
                <button type="button" className={`donate-amount ${isCustom ? 'is-active' : ''}`} onClick={chooseCustomAmount} aria-pressed={isCustom}>
                  Своя сумма
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isCustom && (
                  <motion.label className="donate-custom" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <span>Сумма в рублях</span>
                    <input
                      type="number"
                      min="50"
                      inputMode="numeric"
                      value={amount}
                      onChange={(event) => {
                        setAmount(event.target.value);
                        setShowTransfer(false);
                      }}
                      placeholder="Например, 1500"
                      autoFocus
                    />
                  </motion.label>
                )}
              </AnimatePresence>

              <button type="button" className="donate-receipt-toggle" onClick={() => setNeedsReceipt((value) => !value)} aria-expanded={needsReceipt}>
                <ReceiptText size={18} />
                <span>Нужна квитанция</span>
                <ChevronDown className={needsReceipt ? 'is-open' : ''} size={18} />
              </button>

              <AnimatePresence initial={false}>
                {needsReceipt && (
                  <motion.div className="donate-receipt" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <div className="donate-receipt__fields">
                      <label>
                        <span>Ваше имя</span>
                        <input autoComplete="name" value={donorName} onChange={(event) => setDonorName(event.target.value)} placeholder="Необязательно" />
                      </label>
                      <label>
                        <span>E-mail для квитанции</span>
                        <input type="email" autoComplete="email" required value={donorEmail} onChange={(event) => setDonorEmail(event.target.value)} placeholder="email@example.com" />
                      </label>
                    </div>
                    <label className="consent-label consent-label--light" style={{ display: 'flex' }}>
                      <input type="checkbox" checked={dataAccepted} onChange={(event) => setDataAccepted(event.target.checked)} />
                      <span><Link to="/consent" target="_blank">Даю согласие на обработку персональных данных</Link> в соответствии с <Link to="/privacy" target="_blank">Политикой обработки персональных данных</Link>.</span>
                    </label>
                    <button type="button" className="donate-receipt-action" onClick={prepareReceiptEmail} disabled={!dataAccepted}>Подготовить письмо для квитанции</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="donate-agreements" aria-label="Согласия и условия">
                <label>
                  <input type="checkbox" checked={offerAccepted} onChange={(event) => setOfferAccepted(event.target.checked)} />
                  <span>Я принимаю <a href={asset('/offer')} target="_blank" rel="noreferrer">публичную оферту о пожертвовании</a></span>
                </label>
              </div>

              <button type="button" className="donate-primary" onClick={prepareTransfer} disabled={!canPrepareTransfer}>
                Показать способы перевода <span>{amount ? formattedAmount : ''}</span>
              </button>
              <p className="donate-helper">
                Перевод проходит в приложении вашего банка. Данные карты на сайте не вводятся.
              </p>

              <AnimatePresence initial={false}>
                {showTransfer && (
                  <motion.div className="donate-transfer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <div className="donate-transfer__top">
                      <div>
                        <span>Разовое пожертвование</span>
                        <strong>{formattedAmount}</strong>
                        <small>
                          {`Выбрано: ${formattedAmount}. Отсканируйте код в приложении банка и укажите эту сумму.`}
                        </small>
                      </div>
                    </div>

                    <div className="donate-qr">
                      <a
                        className="donate-qr__image"
                        href={asset('/payment-code.jpg')}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Открыть QR-код для пожертвования крупно"
                      >
                        <img src={asset('/payment-code.jpg')} alt="QR-код для пожертвования АНО «Мечты и судьбы»" />
                      </a>
                      <div className="donate-qr__copy">
                        <strong>Оплата по QR-коду</strong>
                        <p>Откройте приложение банка, отсканируйте код и проверьте получателя перед переводом.</p>
                        <a href={asset('/payment-code.jpg')} target="_blank" rel="noreferrer">
                          Открыть код крупно <ExternalLink size={15} />
                        </a>
                      </div>
                    </div>

                    <div className="donate-bank-details" aria-label="Банковские реквизиты для пожертвования">
                      <strong>Или переведите по реквизитам</strong>
                      <dl>
                        <div><dt>Получатель</dt><dd>{bankDetails.recipient}</dd></div>
                        <div><dt>Счёт</dt><dd>{bankDetails.account}</dd></div>
                        <div><dt>Банк</dt><dd>{bankDetails.bank}</dd></div>
                        <div><dt>БИК</dt><dd>{bankDetails.bik}</dd></div>
                        <div><dt>Кор. счёт</dt><dd>{bankDetails.correspondentAccount}</dd></div>
                      </dl>
                      <small>Назначение платежа: добровольное пожертвование на уставную деятельность.</small>
                      <button type="button" className="donate-bank-details__copy" onClick={copyBankDetails}>
                        <Copy size={15} aria-hidden="true" /> Скопировать реквизиты
                      </button>
                    </div>

                    <a
                      className="donate-requisites"
                      href="mailto:mechty.sudby@mail.ru?subject=Вопрос%20о%20пожертвовании"
                    >
                      Не получается оплатить? Написать нам <ExternalLink size={15} />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <details className="donate-documents">
            <summary>
              <div>
                <span>Открыто и понятно</span>
                <strong>Документы организации</strong>
                <small>Регистрационные документы и условия пожертвования</small>
              </div>
              <ChevronDown size={22} />
            </summary>
            <div className="donate-documents__content">
              <div className="donate-documents__list">
                {documents.map((document) => (
                  <a key={document.title} href={asset(document.href)} target={document.external ? '_blank' : undefined} rel={document.external ? 'noreferrer' : undefined}>
                    <FileText size={19} />
                    <span><strong>{document.title}</strong><small>{document.meta}</small></span>
                    <ExternalLink size={16} />
                  </a>
                ))}
              </div>
              <p className="donate-documents__details">АНО «Мечты и судьбы» · ИНН 6686173647 · КПП 667901001 · ОГРН 1269600021712</p>
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
