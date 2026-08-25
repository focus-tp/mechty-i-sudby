import { Reveal } from '../components/Reveal';
import { TrainingSection } from '../components/CabinsSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const modules = [
  { num: '01', title: 'Принципы благополучия детей', desc: 'Что нужно ребёнку для здорового развития. Потребности, права, ответственность взрослых.' },
  { num: '02', title: 'Детская травма', desc: 'Виды травмы, её влияние на мозг и поведение. Почему «плохое поведение» — это сигнал боли.' },
  { num: '03', title: 'Привязанность', desc: 'Теория привязанности Боулби. Как формируются безопасные и нарушенные типы привязанности.' },
  { num: '04', title: 'Диссоциация и защитные реакции', desc: 'Заморозка, борьба, бегство. Как травма меняет реакции ребёнка на стресс.' },
  { num: '05', title: 'Навыки ухода за травмированным ребёнком', desc: 'Практические стратегии: как реагировать, когда помочь и когда дать пространство.' },
  { num: '06', title: 'Распознавание детских реакций', desc: 'Что стоит за агрессией, уходом, зависимостью, ложью. Читаем поведение как язык.' },
  { num: '07', title: 'Защитные факторы адаптации', desc: 'Что помогает детям восстановиться. Резилентность, значимый взрослый, ритуалы.' },
  { num: '08', title: 'Вызывающее поведение: стратегии', desc: 'Конкретные алгоритмы реагирования. Де-эскалация, границы, логические последствия.' },
  { num: '09', title: 'Забота о себе и профилактика выгорания', desc: 'Признаки выгорания у опекунов. Ресурсы, группы поддержки, личные границы.' },
];

export function TrainingPage() {
  useDocumentTitle('Тренинг КППТ');
  const isPast = new Date() > new Date('2026-04-27T00:00:00+05:00');

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--cream)' }}>
      
      {/* Hero-шапка страницы */}
      <section className="training-page-hero">
        <div className="training-page-hero-inner">
          <Reveal>
            <div className="section-label" style={{ color: 'var(--gold)' }}>Ближайший тренинг</div>
          </Reveal>
          <Reveal>
            <h1 className="training-page-title">
              Тренинг КППТ —<br />
              <em>Компетентная помощь<br />при травматизации</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="training-page-subtitle">
              Международная программа, работающая в 59 странах мира. 3 дня · 9 модулей · 24 академических часа.
              Для приёмных родителей, опекунов, педагогов и социальных работников.
            </p>
          </Reveal>

          {/* Карточки деталей */}
          <Reveal delay={0.2}>
            <div className="training-details-grid">
              <div className="training-detail-card">
                <span className="training-detail-icon">📆</span>
                <div>
                  <strong>Дата</strong>
                  <span>{isPast ? 'Дата уточняется' : '24–26 апреля 2026'}</span>
                </div>
              </div>
              <div className="training-detail-card">
                <span className="training-detail-icon">🕙</span>
                <div>
                  <strong>Время</strong>
                  <span>10:00 — 18:00 каждый день</span>
                </div>
              </div>
              <div className="training-detail-card">
                <span className="training-detail-icon">📍</span>
                <div>
                  <strong>Место</strong>
                  <span>г. Екатеринбург (адрес при записи)</span>
                </div>
              </div>
              <div className="training-detail-card training-detail-card--accent">
                <span className="training-detail-icon">💰</span>
                <div>
                  <strong>Стоимость</strong>
                  <span>3 000 ₽ (кофе-брейки и пособие включены)</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="training-page-cta">
              <a
                href="https://forms.yandex.ru/cloud/69b938be6d2d7330d642c645"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}
              >
                <span>Зарегистрироваться на тренинг →</span>
              </a>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem' }}>
                Вопросы? Пишите: <a href="tel:+79321275011" style={{ color: 'rgba(255,255,255,0.85)' }}>+7 932-127-50-11</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Для кого */}
      <section style={{ padding: '80px 5%', background: 'white' }}>
        <Reveal>
          <div className="section-label">Аудитория</div>
        </Reveal>
        <Reveal>
          <h2 className="section-title">Для кого этот тренинг</h2>
        </Reveal>
        <div className="training-audience-grid">
          {[
            { icon: '👨‍👩‍👧‍👦', title: 'Приёмные семьи', desc: 'Опекуны, усыновители, приёмные родители — все, кто воспитывает детей из трудных ситуаций.' },
            { icon: '🏫', title: 'Педагоги', desc: 'Учителя, воспитатели, школьные психологи, работающие с детьми из уязвимых семей.' },
            { icon: '🤝', title: 'Соцработники', desc: 'Специалисты органов опеки, НКО и кризисных центров помощи семье.' },
            { icon: '💼', title: 'Специалисты', desc: 'Психологи, коучи, волонтёры, все, кто работает с детьми, пережившими травму.' },
          ].map((item, i) => (
            <div key={i}>
              <Reveal delay={i * 0.08}>
                <div className="training-audience-card">
                  <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline модулей */}
      <section style={{ padding: '80px 5%', background: 'var(--cream)' }}>
        <Reveal>
          <div className="section-label">Программа</div>
        </Reveal>
        <Reveal>
          <h2 className="section-title">9 модулей — полное погружение</h2>
        </Reveal>
        <Reveal>
          <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
            Каждый модуль — это теория + практика. Обязательно посещение всех трёх дней.
          </p>
        </Reveal>

        <div className="training-timeline">
          {modules.map((mod, i) => (
            <div key={i}>
              <Reveal delay={i * 0.06} type={i % 2 === 0 ? 'left' : 'right'}>
                <div className="training-timeline-item">
                  <div className="training-timeline-num">{mod.num}</div>
                  <div className="training-timeline-content">
                    <h3>{mod.title}</h3>
                    <p>{mod.desc}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Партнёры и финальный CTA */}
      <TrainingSection />
    </div>
  );
}
