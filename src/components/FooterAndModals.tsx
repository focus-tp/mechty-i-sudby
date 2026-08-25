import { useUI } from '../context/UIContext';
import { Link } from 'react-router-dom';
import { asset } from '../utils';
import { ArrowUpRight, Mail, Phone, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-epilogue">
        <div>
          <span className="footer-epilogue__label">послесловие</span>
          <p>Добрые истории продолжаются,<br />когда рядом есть люди.</p>
        </div>
        <Link className="footer-support" to="/#donate">
          <span>Поддержать семьи</span>
          <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="nav-logo" to="/">
            <img src={asset('/logo.png')} alt="Мечты и Судьбы" className="logo-img" />
          </Link>
          <p>Команда «Мечты и судьбы» поддерживает приёмные семьи с 2011 года. В 2026 году служение официально зарегистрировано как АНО — центр комплексной поддержки семьи, материнства, отцовства и детства.</p>
          <span className="footer-brand__note">команда рядом с семьями с 2011 года</span>
        </div>
        <div className="footer-col">
          <h5>Проекты</h5>
          <ul>
            <li><Link to="/svyaz">Площадка «Связь»</Link></li>
            <li><Link to="/training">Тренинг КППТ</Link></li>
            <li><Link to="/#projects">Группы поддержки</Link></li>
            <li><Link to="/cabins">Домики</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>О нас</h5>
          <ul>
            <li><Link to="/#about">Миссия</Link></li>
            <li><Link to="/team">Команда</Link></li>
            <li><Link to="/#contact">Контакты</Link></li>
            <li><Link to="/#donate">Пожертвовать</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Связаться</h5>
          <div className="footer-contacts">
            <a href="mailto:mechty.sudby@mail.ru"><Mail size={17} /><span>mechty.sudby@mail.ru</span></a>
            <a href="tel:+79321275011"><Phone size={17} /><span>+7 932 127-50-11</span></a>
            <a href="https://t.me/svyaz_ekb" target="_blank" rel="noreferrer"><Send size={17} /><span>Telegram</span></a>
          </div>
        </div>
      </div>

      <section className="footer-colophon" aria-labelledby="footer-legal-title">
        <p className="footer-colophon__label" id="footer-legal-title">Официальные сведения</p>
        <div className="footer-colophon__grid">
          <strong>АВТОНОМНАЯ НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ ЦЕНТР КОМПЛЕКСНОЙ ПОДДЕРЖКИ СЕМЬИ, МАТЕРИНСТВА, ОТЦОВСТВА И ДЕТСТВА «МЕЧТЫ И СУДЬБЫ»</strong>
          <p><span>ОГРН 1269600021712</span><span>ИНН 6686173647</span></p>
          <address><span className="footer-colophon__item-label">Юридический адрес</span>624090, Свердловская область, г.о. Верхняя Пышма, г. Верхняя Пышма, ул. 40 лет Октября, д. 30</address>
        </div>
      </section>

      <div className="footer-bottom">
        <p>© 2026 АНО «Мечты и судьбы»</p>
        <nav className="footer-legal-links" aria-label="Правовая информация">
          <Link to="/legal">Реквизиты</Link>
          <Link to="/reports">Отчёты</Link>
          <Link to="/offer">Публичная оферта</Link>
          <Link to="/privacy">Политика обработки ПДн</Link>
          <Link to="/terms">Пользовательское соглашение</Link>
          <Link to="/consent">Согласие на обработку данных</Link>
          <Link to="/recurring">Ежемесячная поддержка</Link>
        </nav>
      </div>
    </footer>
  );
}

export function ModalsAndToasts() {
  const { toastMsg } = useUI();

  return (
    <>
      {toastMsg && (
        <div className="toast show" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}
    </>
  );
}
