import { Reveal } from './Reveal';

const examples = [
  { label: 'Семьи', value: '100+', text: 'семей участвовали хотя бы в одной программе в 2011–2025 годах' },
  { label: 'Занятия', value: '≈28', text: 'групповых и семейных занятий в 2025 году' },
  { label: 'Обучение', value: '≈40', text: 'участников прошли обучение в 2025 году' },
];

export function ImpactSection() {
  return (
    <section className="impact" aria-labelledby="impact-title">
      <div className="impact__heading">
        <Reveal><div className="section-label">Поддержка в цифрах</div></Reveal>
        <Reveal><h2 id="impact-title" className="section-title">Поддержка, которую можно <em>почувствовать</em></h2></Reveal>
        <Reveal><p>Ориентировочные данные внутреннего учёта команды за 2011–2025 годы. Отдельная отчётность АНО будет опубликована после первого года работы.</p></Reveal>
      </div>
      <div className="impact__grid">
        {examples.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.08} className="impact-card-wrap">
            <article className="impact-card">
              <div className="impact-card__body">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.text}</p>
                <small>Ориентировочные данные команды</small>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
