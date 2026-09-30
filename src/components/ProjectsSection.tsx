import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { asset } from '../utils';

interface Project {
  id: string;
  title: string;
  desc: string;
  detail: string;
  link: string;
  linkLabel: string;
  image: string;
  mobileImage?: string;
}

const projects: Project[] = [
  {
    id: 'svyaz',
    title: 'Площадка «Связь»',
    desc: 'Семейная программа поддержки для детей и родителей.',
    detail: 'На занятиях дети осваивают навыки саморегуляции, а взрослые учатся поддерживать ребёнка в сложных ситуациях.',
    link: '/svyaz',
    linkLabel: 'О площадке',
    image: '/hero/svyaz-project.jpeg',
    mobileImage: '/hero/svyaz-project-720.jpg',
  },
  {
    id: 'training',
    title: 'Тренинг КППТ',
    desc: 'Международная программа помощи при травматизации.',
    detail: 'Три дня практики, девять модулей и опыт, который помогает специалистам бережно работать с семьями.',
    link: '/training',
    linkLabel: 'О тренинге',
    image: '/Тренинг RGGN.jpg',
    mobileImage: '/training-project-720.jpg',
  },
  {
    id: 'support-groups',
    title: 'Группы поддержки',
    desc: 'Еженедельные встречи для приёмных семей.',
    detail: 'Безопасное пространство для честного разговора, поддержки родителей и занятий с детьми.',
    link: '#contact',
    linkLabel: 'Записаться',
    image: '/hero/support-groups.jpg',
    mobileImage: '/hero/support-groups-720.jpg',
  },
  {
    id: 'cabins',
    title: 'Отдых для семей',
    desc: 'Загородные домики для восстановления сил.',
    detail: 'Возможность выдохнуть, побыть вместе и набраться сил вдали от городского ритма.',
    link: '/domiki',
    linkLabel: 'Посмотреть домики',
    image: '/cabins/family-interior.jpeg',
  },
  {
    id: 'consult',
    title: 'Консультации',
    desc: 'Индивидуальное сопровождение семей.',
    detail: 'Разбираем вопросы усыновления, опеки и приёмного родительства вместе с сертифицированными специалистами.',
    link: '#contact',
    linkLabel: 'Записаться',
    image: '/hero/consultations.jpeg',
    mobileImage: '/hero/consultations-720.jpg',
  },
  {
    id: 'world',
    title: 'Международное обучение',
    desc: 'Опыт и знания, которые выходят за границы одного города.',
    detail: 'Наши тренеры обучают специалистов из России, Турции, Ганы и Кении помогать детям и семьям.',
    link: '#contact',
    linkLabel: 'Стать партнёром',
    image: '/hero/международное служение.jpg',
    mobileImage: '/hero/international-720.jpg',
  },
];

function ProjectLink({ project }: { project: Project }) {
  const className = 'chapter-project__link';
  const content = <>{project.linkLabel}<ArrowUpRight size={18} aria-hidden="true" /></>;

  return project.link.startsWith('/') ? (
    <Link className={className} to={project.link}>{content}</Link>
  ) : (
    <a className={className} href={project.link}>{content}</a>
  );
}

export function ProjectsSection() {
  return (
    <section className="chapter-projects" id="projects">
      <div className="chapter-projects__inner">
        <div className="chapter-projects__heading">
          <Reveal>
            <div className="chapter-projects__eyebrow">Глава 02</div>
          </Reveal>
          <Reveal>
            <h2>
              <span className="hero-copy--desktop">Шесть направлений <em>поддержки</em> семей</span>
              <span className="hero-copy--mobile">Чем можем <em>помочь</em></span>
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Мы работаем комплексно - от еженедельных групп поддержки до международного обучения специалистов.
            </p>
          </Reveal>
        </div>

        <div className="chapter-projects__list">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={Math.min(index * 0.05, 0.25)}
              className={`chapter-project-wrap${index === 0 ? ' chapter-project-wrap--featured' : ''}`}
            >
              <article className={`chapter-project${index === 0 ? ' chapter-project--featured' : ''}`}>
                <span className="chapter-project__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div className="chapter-project__photo">
                  <picture>
                    {project.mobileImage && <source media="(max-width: 900px)" srcSet={asset(project.mobileImage)} />}
                    <img
                      src={asset(project.image)}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="chapter-project__copy">
                  <h3>{project.title}</h3>
                  <p className="chapter-project__summary">{project.desc}</p>
                  <p className="chapter-project__detail">{project.detail}</p>
                </div>
                <ProjectLink project={project} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
