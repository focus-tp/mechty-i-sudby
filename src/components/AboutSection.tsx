import { Reveal } from './Reveal';
import { asset } from '../utils';
import { MobileDisclosure } from './MobileDisclosure';

const pillars = [
  {
    title: 'Научный подход',
    text: 'Практические инструменты для родителей и специалистов',
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
    title: 'Обмен опытом',
    text: 'Сотрудничаем с коллегами и партнёрами из разных стран',
    image: '/icons/global.png',
    imageAlt: '',
  },
];

export function AboutSection({ compact = false }: { compact?: boolean }) {
  if (compact) return (
    <section className="mobile-about" id="about">
      <img src={asset('/hero/team-specialists.jpeg')} alt="Команда специалистов и волонтёров «Мечты и судьбы»" loading="lazy" />
      <div className="mobile-about__copy">
        <span className="section-label">Давайте знакомиться</span>
        <h2>Рядом — <em>свои люди</em></h2>
        <p>С 2011 года поддерживаем приёмные семьи. В нашей команде — родители, специалисты и волонтёры.</p>
        <MobileDisclosure title="Подробнее о нас">
          <p>В 2026 году команда зарегистрирована как АНО «Мечты и судьбы». Мы проводим семейные занятия, группы поддержки и обучение родителей и специалистов.</p>
          <p>Используем инструменты КППТ и ТОВД, адаптируя занятия к запросу конкретной семьи. Руководитель Евгения Ощепкова — мама десяти детей, шесть из них приёмные.</p>
        </MobileDisclosure>
      </div>
    </section>
  );
  return (
    <section className="about relative" id="about">
      <div className="about-grid">
        <div className="about-copy-column">
          <Reveal className="about-label-reveal">
            <div className="section-label">О служении</div>
          </Reveal>
          <Reveal className="about-title-reveal">
            <h2 className="section-title">
              Команда, которая помогает <em>приёмным семьям</em> справляться вместе
            </h2>
          </Reveal>

          <Reveal type="left" className="about-lead-reveal">
            <div className="about-text about-text--lead">
              <p>Команда «Мечты и судьбы» поддерживает приёмные семьи с 2011 года. В 2026 году она была зарегистрирована как автономная некоммерческая организация. Мы проводим семейные занятия, группы поддержки и обучение для родителей и специалистов.</p>
            </div>
          </Reveal>

          <Reveal type="left" className="about-secondary-reveal">
            <div className="about-text about-text--secondary">
              <p>Мы создаём бережное пространство, где ребёнок и взрослый могут укреплять доверие, контакт и ощущение безопасности.</p>
              <p>В работе используем инструменты КППТ и ТОВД, адаптируя занятия к запросу конкретной семьи.</p>
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
          <a href="#projects" className="editorial-link">
            <span>Наши направления →</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
