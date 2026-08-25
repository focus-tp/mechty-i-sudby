import { Reveal } from './Reveal';

const milestones = [
  { year: '2011', title: 'Основание служения', desc: 'Евгения Ощепкова создаёт волонтёрское служение «Мечты и судьбы» для поддержки приёмных семей Екатеринбурга.', icon: '🌱' },
  { year: '2013', title: 'Первые группы поддержки', desc: 'Еженедельные встречи для приёмных родителей становятся регулярными. Появляются параллельные занятия с детьми.', icon: '🤝' },
  { year: '2016', title: 'Тренинг КППТ', desc: 'Запуск международной программы «Компетентная помощь при травматизации» — 9 модулей, признанных в 59 странах мира.', icon: '🎓' },
  { year: '2018', title: 'Площадка «Связь»', desc: 'Открытие семейной терапевтической площадки, где дети обретают навыки саморегуляции после психологической травмы.', icon: '💞' },
  { year: '2020', title: 'Загородные домики', desc: 'Запуск программы загородного отдыха для приёмных семей — возможность восстановить силы и ресурс.', icon: '🏡' },
  { year: '2023', title: 'Международный выход', desc: 'Наши тренеры работают в Турции, Гане, Кении. Опыт служения выходит за пределы России.', icon: '🌍' },
  { year: '2025', title: 'XII Рождественский банкет', desc: 'Ежегодный праздник для 100+ приёмных семей — атмосфера праздника, живая музыка и тепло общения.', icon: '🎄' },
  { year: '2026', title: 'Регистрация АНО', desc: 'Многолетнее волонтёрское служение официально зарегистрировано как автономная некоммерческая организация и продолжает работу команды, начатую в 2011 году.', icon: '📖' },
];

export function HistoryTimeline() {
  return (
    <section className="history-timeline" id="history">
      <div className="history-timeline-inner">
        <Reveal>
          <div className="section-label" style={{ color: 'var(--gold)' }}>История</div>
        </Reveal>
        <Reveal>
          <h2 className="section-title" style={{ color: 'white' }}>
            15 лет <em>пути</em>
          </h2>
        </Reveal>
        <Reveal>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>
            От маленькой группы волонтёров — к международному служению
          </p>
        </Reveal>

        <div className="timeline-list">
          {milestones.map((m, i) => (
            <div key={i}>
              <Reveal delay={i * 0.07} type={i % 2 === 0 ? 'left' : 'right'}>
                <div className="timeline-item">
                  <div className="timeline-year">{m.year}</div>
                  <div className="timeline-dot">
                    <span>{m.icon}</span>
                  </div>
                  <div className="timeline-content">
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
