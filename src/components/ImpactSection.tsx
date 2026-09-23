import { Reveal } from './Reveal';
import { asset } from '../utils';

const examples = [
  { image: '/placeholders/support-group.png', label: 'Семьи', value: '100+', text: 'семей получили поддержку команды' },
  { image: '/placeholders/family-workshop.png', label: 'Занятия', value: '28', text: 'занятий провела команда' },
  { image: '/placeholders/training-team.png', label: 'Обучение', value: '40', text: 'человек прошли обучение' },
];

export function ImpactSection() {
  return (
    <section className="impact" aria-labelledby="impact-title">
      <div className="impact__heading">
        <Reveal><div className="section-label">Поддержка в цифрах</div></Reveal>
        <Reveal><h2 id="impact-title" className="section-title">Поддержка, которую можно <em>почувствовать</em></h2></Reveal>
        <Reveal><p>Эти цифры отражают многолетнюю работу команды с 2011 года. Отдельная отчётность АНО будет опубликована после первого года работы.</p></Reveal>
      </div>
      <div className="impact__grid">
        {examples.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.08} className="impact-card-wrap">
            <article className="impact-card">
              <img src={asset(item.image)} alt="" loading="lazy" />
              <div className="impact-card__body">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.text}</p>
                <small>Данные команды</small>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
