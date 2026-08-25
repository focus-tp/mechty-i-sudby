import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ExternalLink, FileText, ReceiptText } from 'lucide-react';
import { Reveal } from './Reveal';
import { useUI } from '../context/UIContext';
import { asset } from '../utils';

type Frequency = 'once' | 'monthly';

const presetAmounts = [500, 1000, 2500, 5000];
const documents = [
  { title: 'Реквизиты организации', meta: 'Официальные сведения АНО', href: '/legal' },
  { title: 'Устав АНО', meta: 'Учредительный документ · PDF', href: '/документы/устав НКО.pdf', external: true },
  { title: 'Лист записи ЕГРЮЛ', meta: 'Государственная регистрация · PDF', href: '/документы/Лист записи ЕГРН.pdf', external: true },
  { title: 'Выписка из ЕГРН', meta: 'Реестр налогоплательщиков · PDF', href: '/документы/Выписка из ЕГРН.pdf', external: true },
  { title: 'Публичная оферта', meta: 'Условия пожертвования', href: '/offer' },
  { title: 'Политика обработки персональных данных', meta: 'Правила обработки данных', href: '/privacy' },
  { title: 'Согласие на обработку данных', meta: 'Отдельный документ', href: '/consent' },
  { title: 'Пользовательское соглашение', meta: 'Правила использования сайта', href: '/terms' },
  { title: 'Отчётность организации', meta: 'Порядок публикации отчётов', href: '/reports' },
];

export function DonateSection() {
  const { showToast } = useUI();
  const [frequency, setFrequency] = useState<Frequency>('once');
  const [amount, setAmount] = useState('1000');
  const [isCustom, setIsCustom] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [needsReceipt, setNeedsReceipt] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [dataAccepted, setDataAccepted] = useState(false);
  const [recurringAccepted, setRecurringAccepted] = useState(false);

  const isMonthly = frequency === 'monthly';
  const canPrepareTransfer = offerAccepted && (!isMonthly || recurringAccepted);

  const changeFrequency = (value: Frequency) => {
    setFrequency(value);
    setShowTransfer(false);
  };

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
    if (isMonthly && !recurringAccepted) {
      showToast('Подтвердите условия ежемесячной поддержки');
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
      `Здравствуйте! Прошу направить квитанцию о пожертвовании на сумму ${Number(amount).toLocaleString('ru-RU')} ₽.\n\nИмя: ${donorName || 'не указано'}\nE-mail: ${donorEmail}\n\nОтдельное согласие на обработку указанных персональных данных (редакция от 25.08.2026) предоставлено при подготовке письма на сайте.`,
    );
    window.location.href = `mailto:mechty.sudby@mail.ru?subject=${subject}&body=${body}`;
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
              <div className="donate-frequency" aria-label="Периодичность пожертвования">
                <button type="button" className={!isMonthly ? 'is-active' : ''} onClick={() => changeFrequency('once')} aria-pressed={!isMonthly}>
                  Один раз
                </button>
                <button type="button" className={isMonthly ? 'is-active' : ''} onClick={() => changeFrequency('monthly')} aria-pressed={isMonthly}>
                  Ежемесячно
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={frequency}
                  className="donate-frequency-note"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {isMonthly
                    ? 'Постоянная помощь позволяет планировать программы заранее.'
                    : 'Разовое пожертвование на уставные программы организации.'}
                </motion.p>
              </AnimatePresence>

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
                      <span><a href={asset('/consent')} target="_blank" rel="noreferrer">Даю согласие на обработку персональных данных</a> в соответствии с <a href={asset('/privacy')} target="_blank" rel="noreferrer">Политикой обработки персональных данных</a>.</span>
                    </label>
                    <button type="button" className="donate-receipt-action" onClick={prepareReceiptEmail} disabled={!dataAccepted}>Подготовить письмо для квитанции</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="donate-agreements" aria-label="Согласия и условия">
                {isMonthly && (
                  <label>
                    <input type="checkbox" checked={recurringAccepted} onChange={(event) => setRecurringAccepted(event.target.checked)} />
                    <span>Я согласен(на) с <a href={asset('/recurring')} target="_blank" rel="noreferrer">условиями ежемесячной поддержки</a></span>
                  </label>
                )}
                <label>
                  <input type="checkbox" checked={offerAccepted} onChange={(event) => setOfferAccepted(event.target.checked)} />
                  <span>Я принимаю <a href={asset('/offer')} target="_blank" rel="noreferrer">публичную оферту о пожертвовании</a></span>
                </label>
              </div>

              <button type="button" className="donate-primary" onClick={prepareTransfer} disabled={!canPrepareTransfer}>
                {isMonthly ? 'Поддерживать ежемесячно' : 'Поддержать'} <span>{amount ? formattedAmount : ''}</span>
              </button>
              <p className="donate-helper">
                {isMonthly
                  ? 'До подключения эквайринга автоматических списаний на сайте нет. Покажем способ регулярного перевода через банк.'
                  : 'До подключения эквайринга предоставим банковские реквизиты по запросу. Деньги на сайте не списываются.'}
              </p>

              <AnimatePresence initial={false}>
                {showTransfer && (
                  <motion.div className="donate-transfer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    {isMonthly ? (
                      <>
                        <div className="donate-transfer__top">
                          <div>
                            <span>Ежемесячная поддержка</span>
                            <strong>{formattedAmount} в месяц</strong>
                            <small>Запросите реквизиты и настройте регулярный перевод в приложении своего банка.</small>
                          </div>
                        </div>
                        <a className="donate-requisites" href="mailto:mechty.sudby@mail.ru?subject=Ежемесячное%20пожертвование">
                          Получить реквизиты и инструкцию <ExternalLink size={15} />
                        </a>
                      </>
                    ) : (
                      <>
                        <div className="donate-transfer__top">
                          <div>
                            <span>Разовое пожертвование</span>
                            <strong>{formattedAmount}</strong>
                            <small>Запросите банковские реквизиты организации по электронной почте.</small>
                          </div>
                        </div>
                        <a className="donate-requisites" href="mailto:mechty.sudby@mail.ru?subject=Запрос%20банковских%20реквизитов">
                          Запросить банковские реквизиты <ExternalLink size={15} />
                        </a>
                      </>
                    )}
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
              <p className="donate-documents__details">АНО «Мечты и судьбы» · ИНН 6686173647 · КПП 668601001 · ОГРН 1269600021712</p>
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
