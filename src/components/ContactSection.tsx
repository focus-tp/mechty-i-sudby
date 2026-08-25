import { useState } from 'react';
import { useUI } from '../context/UIContext';
import { Reveal } from './Reveal';
import { asset } from '../utils';

export function ContactSection() {
  const { showToast } = useUI();
  const [form, setForm] = useState({ name: '', contact: '', topic: '', message: '', consent: false });

  const submitContact = () => {
    if (!form.name || !form.contact) {
      showToast('Заполните имя и контакт');
      return;
    }

    // Простая валидация: либо email (содержит @), либо телефон (только цифры и символы)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact);
    const isPhone = /^[\d\s\-\+\(\)]+$/.test(form.contact);
    if (!isEmail && !isPhone) {
      showToast('Введите корректный email или телефон');
      return;
    }

    if (!form.consent) {
      showToast('Дайте согласие на обработку данных');
      return;
    }
    const subject = encodeURIComponent(form.topic || 'Обращение с сайта');
    const body = encodeURIComponent(
      `Здравствуйте!\n\n${form.message || 'Хочу задать вопрос.'}\n\nИмя: ${form.name}\nКонтакт для ответа: ${form.contact}\n\nОтдельное согласие на обработку указанных персональных данных предоставлено при подготовке письма на сайте.`,
    );
    window.location.href = `mailto:O.E.U.76@mail.ru?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact" id="contact">
      <Reveal>
        <div className="section-label">Связаться с нами</div>
      </Reveal>
      <Reveal>
        <h2 className="section-title">Мы <em>рядом</em></h2>
      </Reveal>
      
      <div className="contact-grid">
        <Reveal type="left">
          <div className="contact-info">
            <p>Если у вас есть вопросы о тренингах, площадке «Связь», домиках или вы хотите стать волонтёром — напишите нам. Ответим в течение рабочего дня.</p>
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <img src={asset('/icons/phone.png')} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="contact-item-text">
                  <strong>WhatsApp / Телефон</strong>
                  <a href="tel:+79321275011" style={{ color: 'inherit', textDecoration: 'none' }}>+7 932-127-50-11</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <img src={asset('/icons/email.png')} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="contact-item-text">
                  <strong>Email</strong>
                  <a href="mailto:O.E.U.76@mail.ru" style={{ color: 'inherit', textDecoration: 'none' }}>O.E.U.76@mail.ru</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <img src={asset('/icons/location.png')} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="contact-item-text">
                  <strong>Адрес</strong>
                  <span>624090, Свердловская обл., г. Верхняя Пышма, ул. 40 лет Октября, д. 30</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <img src={asset('/icons/consult.png')} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="contact-item-text">
                  <strong>Telegram</strong>
                  <a href="https://t.me/svyaz_ekb" target="_blank" rel="noreferrer">Канал «Связь»</a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal type="right">
          <div className="contact-form-card contact-form-letter">
            <h3>Напишите нам</h3>
            <div className="form-field">
              <label>Ваше имя *</label>
              <input type="text" placeholder="Как вас зовут?" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-field">
              <label>Телефон или e-mail *</label>
              <input type="text" placeholder="+7 или email" value={form.contact} onChange={(e) => setForm({...form, contact: e.target.value})} />
            </div>
            <div className="form-field">
              <label>Тема обращения</label>
              <select value={form.topic} onChange={(e) => setForm({...form, topic: e.target.value})}>
                <option value="">Выберите тему</option>
                <option>Тренинг КППТ</option>
                <option>Площадка «Связь»</option>
                <option>Домики для семей</option>
                <option>Группа поддержки</option>
                <option>Стать волонтёром</option>
                <option>Пожертвование</option>
                <option>Другое</option>
              </select>
            </div>
            <div className="form-field">
              <label>Сообщение</label>
              <textarea rows={3} placeholder="Ваш вопрос или пожелание..." value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}></textarea>
            </div>
            <label className="consent-label consent-label--light" style={{ marginBottom: '.75rem', display: 'flex' }}>
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({...form, consent: e.target.checked})} />
              <span style={{ fontSize: '.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Я даю отдельное <a href="/consent" target="_blank" rel="noreferrer" style={{ color: 'var(--purple)' }}>согласие на обработку персональных данных</a>
              </span>
            </label>
            <button className="form-submit" onClick={submitContact}>Открыть письмо</button>
            <p style={{ marginTop: '.65rem', fontSize: '.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Откроется ваше почтовое приложение. Сообщение будет отправлено только после вашего подтверждения.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
