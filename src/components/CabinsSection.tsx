import { Reveal } from './Reveal';
import { ButterflySVG } from './Decorations';

export function CabinsSection() {
  const bookingUrl = import.meta.env.VITE_CABIN_BOOKING_URL?.trim();
  const bookingHref = bookingUrl || '/#contact';
  const bookingLabel = bookingUrl ? 'Онлайн-запись' : 'Уточнить запись';

  return (
    <section className="cabins relative" id="cabins">
      <ButterflySVG className="absolute text-purple-300/20 w-40 h-40" style={{ top: '5%', right: '-5%', transform: 'rotate(-45deg)' }} />
      
      <Reveal>
        <div className="section-label">Отдых и восстановление</div>
      </Reveal>
      <Reveal>
        <h2 className="section-title">Домики для <em>приёмных семей</em></h2>
      </Reveal>
      <Reveal>
        <p className="section-subtitle">Три уютных скандинавских домика со всеми удобствами — место, где можно отдохнуть, зарядиться и побыть собой.</p>
      </Reveal>

      <div className="cabins-grid">
        <Reveal delay={0.1}>
          <div className="cabin-card c1">
            <div className="cabin-visual"><span className="cabin-emoji">🌸</span></div>
            <div className="cabin-body">
              <h3>Милый дом</h3>
              <p>Уютный домик для семьи с детьми. Терраса, природа, полная тишина и покой.</p>
              <a className="cabin-btn" href={bookingHref} target={bookingUrl ? '_blank' : undefined} rel={bookingUrl ? 'noreferrer' : undefined}>
                <span>{bookingLabel}</span>
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="cabin-card c2">
            <div className="cabin-visual"><span className="cabin-emoji">🌿</span></div>
            <div className="cabin-body">
              <h3>Домик Любви</h3>
              <p>Идеально для мамы и папы, которым нужна перезагрузка. Отдых без суеты.</p>
              <a className="cabin-btn" href={bookingHref} target={bookingUrl ? '_blank' : undefined} rel={bookingUrl ? 'noreferrer' : undefined}>
                <span>{bookingLabel}</span>
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="cabin-card c3">
            <div className="cabin-visual"><span className="cabin-emoji">🌻</span></div>
            <div className="cabin-body">
              <h3>Домик надежды</h3>
              <p>Просторный вариант для большой семьи. Всё для комфортного совместного отдыха.</p>
              <a className="cabin-btn" href={bookingHref} target={bookingUrl ? '_blank' : undefined} rel={bookingUrl ? 'noreferrer' : undefined}>
                <span>{bookingLabel}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TrainingSection() {
  return (
    <section className="training" id="training">
      <Reveal>
        <div className="section-label">Ближайший тренинг</div>
      </Reveal>
      <Reveal>
        <h2 className="section-title">Компетентная помощь<br />при <em>травме</em></h2>
      </Reveal>

      <div className="training-grid">
        <Reveal type="left">
          <div className="training-info">
            <p>В партнёрстве с «Мир без травмы» — трёхдневный тренинг КППТ для приёмных родителей, социальных работников и специалистов. 9 модулей, 24 академических часа. Программа работает в 59 странах.</p>
            <div className="training-details">
              <div className="training-detail"><span className="detail-icon">📆</span> 24, 25, 26 апреля 2026 года</div>
              <div className="training-detail"><span className="detail-icon">🕙</span> с 10:00 до 18:00</div>
              <div className="training-detail"><span className="detail-icon">📍</span> г. Екатеринбург</div>
              <div className="training-detail"><span className="detail-icon">💰</span> 3 000 ₽ (кофе-брейки и пособия включены)</div>
              <div className="training-detail"><span className="detail-icon">⚠️</span> Обязательно все три дня</div>
            </div>
            <a href="https://forms.yandex.ru/cloud/69b938be6d2d7330d642c645" target="_blank" rel="noreferrer" className="btn-primary">
              <span>Зарегистрироваться</span>
            </a>
            <p style={{ marginTop: '.75rem', fontSize: '.8rem', color: 'rgba(255,255,255,.5)' }}>
              Трудности с оплатой — звоните: +7 932-127-50-11
            </p>
          </div>
        </Reveal>

        <Reveal type="right">
          <div className="outcomes-card">
            <h4>После тренинга вы:</h4>
            <ul className="outcomes-list">
              <li>Поймёте принципы благополучия детей</li>
              <li>Узнаете о влиянии травмы на развитие ребёнка</li>
              <li>Обретёте навыки ухода за травмированными детьми</li>
              <li>Научитесь распознавать детские реакции и их источники</li>
              <li>Узнаете о защитных факторах адаптации</li>
              <li>Получите стратегии реагирования на вызывающее поведение</li>
              <li>Научитесь заботиться о себе и предотвращать выгорание</li>
              <li>Проработаете свой детский негативный опыт</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
