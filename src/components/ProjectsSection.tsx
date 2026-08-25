import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

interface Project {
  id: string;
  title: string;
  desc: string;
  detail: string;
  link: string;
  linkLabel: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'svyaz',
    title: 'Площадка «Связь»',
    desc: 'Семейная терапевтическая площадка для детей и родителей.',
    detail: 'Занятия помогают детям обрести навыки саморегуляции, а родителям - почувствовать опору рядом.',
    link: '/svyaz',
    linkLabel: 'О площадке',
    image: '/hero/svyaz-project.jpeg',
  },
  {
    id: 'training',
    title: 'Тренинг КППТ',
    desc: 'Международная программа помощи при травматизации.',
    detail: 'Три дня практики, девять модулей и опыт, который помогает специалистам бережно работать с семьями.',
    link: '/training',
    linkLabel: 'О тренинге',
    image: '/Тренинг RGGN.jpg',
  },
  {
    id: 'support-groups',
    title: 'Группы поддержки',
    desc: 'Еженедельные встречи для приёмных семей.',
    detail: 'Безопасное пространство для честного разговора, поддержки родителей и занятий с детьми.',
    link: '#contact',
    linkLabel: 'Записаться',
    image: '/hero/support-groups.jpg',
  },
  {
    id: 'cabins',
    title: 'Отдых для семей',
    desc: 'Загородные домики для восстановления сил.',
    detail: 'Возможность выдохнуть, побыть вместе и набраться сил вдали от городского ритма.',
    link: '/cabins',
    linkLabel: 'Посмотреть домики',
    image: '/загородные домики.jpg',
  },
  {
    id: 'consult',
    title: 'Консультации',
    desc: 'Индивидуальное сопровождение семей.',
    detail: 'Разбираем вопросы усыновления, опеки и приёмного родительства вместе с сертифицированными специалистами.',
    link: '#contact',
    linkLabel: 'Записаться',
    image: '/hero/consultations.jpeg',
  },
  {
    id: 'world',
    title: 'Международное обучение',
    desc: 'Опыт и знания, которые выходят за границы одного города.',
    detail: 'Наши тренеры обучают специалистов из России, Турции, Ганы и Кении помогать детям и семьям.',
    link: '#contact',
    linkLabel: 'Стать партнёром',
    image: '/hero/international-training.jpg',
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
              Шесть способов <em>помочь</em> семьям
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
            <Reveal key={project.id} delay={Math.min(index * 0.05, 0.25)}>
              <article className="chapter-project">
                <span className="chapter-project__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div className="chapter-project__photo">
                  <img src={project.image} alt={project.title} loading="lazy" />
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
