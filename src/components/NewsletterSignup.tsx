import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || !email.trim()) return;

    const subject = encodeURIComponent('Заявка на информационную рассылку');
    const body = encodeURIComponent(
      `Здравствуйте! Прошу добавить меня в список для информационной рассылки АНО «Мечты и судьбы».\n\nАдрес для рассылки: ${email.trim()}\n\nПодтверждаю отдельное согласие на получение информационной рассылки и обработку этого адреса электронной почты. Редакция согласия от 13.10.2026: https://focus-tp.github.io/mechty-i-sudby/mailing-consent.`,
    );
    window.location.href = `mailto:mechty.sudby@mail.ru?subject=${subject}&body=${body}`;
  }

  return (
    <form className="newsletter-signup" onSubmit={prepareRequest}>
      <h3>Получать новости</h3>
      <p>Расскажем о проектах и встречах, когда запустим письма.</p>
      <label className="newsletter-signup__email" htmlFor="newsletter-email">Ваш e-mail</label>
      <div className="newsletter-signup__row">
        <input id="newsletter-email" type="email" autoComplete="email" required placeholder="email@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        <button type="submit" disabled={!consent}>Подготовить письмо</button>
      </div>
      <label className="newsletter-signup__consent">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>Согласна(-ен) на <Link to="/mailing-consent" target="_blank">получение рассылки</Link> и обработку e-mail для этой цели.</span>
      </label>
      <small>Откроется почтовое приложение. Заявка поступит нам, только когда вы отправите письмо.</small>
    </form>
  );
}
