import { Reveal } from './Reveal';
import { asset } from '../utils';

const pillars = [
  {
    title: 'Научный подход',
    text: 'Программа КППТ признана в 59 странах',
    image: '/icons/training.png',
    imageAlt: '',
  },
  {
    title: 'Личный опыт',
    text: 'Руководитель — мама 10 детей, 6 из них приёмные',
    image: '/team/zenya.jpeg',
    imageAlt: 'Евгения Ощепкова',
    portrait: true,
  },
  {
    title: 'Международный охват',
    text: 'Работаем в России, Турции, Гане, Кении',
    image: '/icons/global.png',
    imageAlt: '',
  },
];

export function AboutSection() {
  return (
    <section className="about relative" id="about">
      <div className="about-grid">
        <div className="about-copy-column">
          <Reveal className="about-label-reveal">
            <div className="section-label">О служении</div>
          </Reveal>
          <Reveal className="about-title-reveal">
            <h2 className="section-title">
              Команда специалистов-волонтёров для <em>уязвимых детей</em>
            </h2>
          </Reveal>

          <Reveal type="left" className="about-lead-reveal">
            <div className="about-text about-text--lead">
              <p>Команда «Мечты и судьбы» помогает приёмным семьям с 2011 года. В 2026 году многолетнее волонтёрское служение было официально зарегистрировано как автономная некоммерческая организация. Тренеры и волонтёры проводят практические занятия для детей и обучение опекунов, учителей и социальных работников.</p>
            </div>
          </Reveal>

          <Reveal type="left" className="about-secondary-reveal">
            <div className="about-text about-text--secondary">
              <p>Мы стремимся создать более здоровую и благоприятную среду для исцеления детей, перенёсших психологическую травму, опыт пренебрежительного отношения и насилия.</p>
              <p>Наш подход основан на международной программе КППТ и ТОВД, которые работают в 59 странах мира.</p>
            </div>
          </Reveal>
        </div>

        <div className="about-visual-column">
          <Reveal type="right" className="about-photo-reveal">
            <div className="about-photo-block">
              <div className="about-photo-frame">
                <img
                  src={asset('/hero/team-specialists.jpeg')}
                  alt="Команда специалистов и волонтёров Мечты и судьбы"
                  className="about-photo"
                  loading="lazy"
                />
                <div className="about-float-badge">
                  <div className="about-float-badge__num">15</div>
                  <div className="about-float-badge__text">лет<br />служения</div>
                </div>
                <div className="about-photo-caption">
                  <span>Команда специалистов и волонтёров</span>
                </div>
              </div>
              <div className="about-photo-bg-decor" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="about-quote-reveal">
            <blockquote className="about-founder-note about-founder-note--visual">
              <p>«Каждый ребёнок заслуживает любящую семью.»</p>
              <cite>Евгения Ощепкова, руководитель АНО</cite>
            </blockquote>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.18}>
        <div className="about-trust-row">
          {pillars.map((pillar) => (
            <div className="about-pillar" key={pillar.title}>
              <div className={`about-pillar-icon${pillar.portrait ? ' about-pillar-icon--portrait' : ''}`}>
                <img src={asset(pillar.image)} alt={pillar.imageAlt} />
              </div>
              <div>
                <strong>{pillar.title}</strong>
                <span>{pillar.text}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <div className="about-directions-action">
          <a href="#projects" className="btn-primary">
            <span>Наши направления →</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
