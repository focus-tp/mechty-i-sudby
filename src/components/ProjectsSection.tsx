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
  imageSet?: { src: string; width: number }[];
}

const projects: Project[] = [
  {
    id: 'svyaz',
    title: 'Площадка «Связь»',
    desc: 'Семейная программа поддержки для детей и родителей.',
    detail: 'На занятиях дети осваивают навыки саморегуляции, а взрослые учатся поддерживать ребёнка в сложных ситуациях.',
    link: '/svyaz',
    linkLabel: 'О площадке',
    image: '/hero/svyaz-project.webp',
    mobileImage: '/hero/svyaz-project-720.webp',
    imageSet: [{ src: '/hero/svyaz-project-480.webp', width: 480 }, { src: '/hero/svyaz-project-960.webp', width: 960 }, { src: '/hero/svyaz-project.webp', width: 1280 }],
  },
  {
    id: 'training',
    title: 'Тренинг КППТ',
    desc: 'Программа помощи при травматизации.',
    detail: 'Три дня практики, девять модулей и опыт, который помогает специалистам бережно работать с семьями.',
    link: '/training',
    linkLabel: 'О тренинге',
    image: '/Тренинг RGGN.webp',
    mobileImage: '/training-project-720.webp',
    imageSet: [{ src: '/Тренинг RGGN-480.webp', width: 480 }, { src: '/Тренинг RGGN-960.webp', width: 960 }, { src: '/Тренинг RGGN.webp', width: 1280 }],
  },
  {
    id: 'support-groups',
    title: 'Группы поддержки',
    desc: 'Еженедельные встречи для приёмных семей.',
    detail: 'Безопасное пространство для честного разговора, поддержки родителей и занятий с детьми.',
    link: '#contact',
    linkLabel: 'Записаться',
    image: '/hero/support-groups.webp',
    mobileImage: '/hero/support-groups-720.webp',
    imageSet: [{ src: '/hero/support-groups-480.webp', width: 480 }, { src: '/hero/support-groups-960.webp', width: 960 }, { src: '/hero/support-groups.webp', width: 1600 }],
  },
  {
    id: 'cabins',
    title: 'Отдых для семей',
    desc: 'Загородные дома для восстановления сил.',
    detail: 'Возможность выдохнуть, побыть вместе и набраться сил вдали от городского ритма.',
    link: '/domiki',
    linkLabel: 'Посмотреть дома',
    image: '/cabins/family-interior.jpeg',
    mobileImage: '/cabins/family-interior-480.webp',
  },
  {
    id: 'consult',
    title: 'Консультации',
    desc: 'Индивидуальное сопровождение семей.',
    detail: 'Разбираем вопросы усыновления, опеки и приёмного родительства вместе с сертифицированными специалистами.',
    link: '#contact',
    linkLabel: 'Записаться',
    image: '/hero/consultations.webp',
    mobileImage: '/hero/consultations-720.webp',
    imageSet: [{ src: '/hero/consultations-480.webp', width: 480 }, { src: '/hero/consultations-960.webp', width: 960 }, { src: '/hero/consultations.webp', width: 1280 }],
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
  const mobileDescriptions: Record<string, string> = {
    svyaz: 'Занятия для детей и родителей.',
    training: 'Обучение помощи при травматизации.',
    'support-groups': 'Еженедельные встречи родителей.',
    cabins: 'Бесплатный отдых для приёмных семей.',
    consult: 'Индивидуальная поддержка семьи.',
  };
  return (
    <section className="chapter-projects" id="projects">
      <div className="chapter-projects__inner">
        <div className="chapter-projects__heading">
          <Reveal>
            <div className="chapter-projects__eyebrow">Глава 02</div>
          </Reveal>
          <Reveal>
            <h2>
              <span className="hero-copy--desktop">Пять направлений <em>поддержки</em> семей</span>
              <span className="hero-copy--mobile">Чем можем <em>помочь</em></span>
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Мы работаем комплексно — от еженедельных групп поддержки до индивидуального сопровождения семей.
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
                      srcSet={project.imageSet?.map(({ src, width }) => `${asset(src)} ${width}w`).join(', ')}
                      sizes="(max-width: 900px) calc(100vw - 32px), (max-width: 1300px) 45vw, 760px"
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="chapter-project__copy">
                  <h3>{project.title}</h3>
                  <p className="chapter-project__summary"><span className="hero-copy--desktop">{project.desc}</span><span className="hero-copy--mobile">{mobileDescriptions[project.id]}</span></p>
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
