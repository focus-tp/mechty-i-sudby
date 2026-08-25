import { useUI } from '../context/UIContext';
import { Link } from 'react-router-dom';
import { asset } from '../utils';
import { Mail, Phone, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="nav-logo" to="/">
            <img src={asset('/logo.png')} alt="Мечты и Судьбы" className="logo-img" />
          </Link>
          <p>АНО «Мечты и судьбы» — центр комплексной поддержки семьи, материнства, отцовства и детства. Команда поддерживает приёмные семьи с 2011 года.</p>
          <address className="footer-legal-identity">
            <strong>АВТОНОМНАЯ НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ ЦЕНТР КОМПЛЕКСНОЙ ПОДДЕРЖКИ СЕМЬИ, МАТЕРИНСТВА, ОТЦОВСТВА И ДЕТСТВА «МЕЧТЫ И СУДЬБЫ»</strong>
            <span>ОГРН 1269600021712 · ИНН 6686173647</span>
            <span>Юридический адрес: 624090, Свердловская область, г.о. Верхняя Пышма, г. Верхняя Пышма, ул. 40 лет Октября, д. 30</span>
          </address>
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
