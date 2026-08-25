import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, X } from 'lucide-react';
import { Reveal } from './Reveal';
import { asset } from '../utils';

type Stream = 'upcoming' | 'past';

type Post = {
  id: string;
  title: string;
  content: string;
  stream: Stream;
  image: string;
  date: string;
};

const streamMeta: Record<Stream, { title: string; subtitle: string; note: string }> = {
  upcoming: {
    title: 'Анонсы',
    subtitle: 'Ближайшие события',
    note: 'встречаемся совсем скоро',
  },
  past: {
    title: 'Истории и события',
    subtitle: 'Архив летописи',
    note: 'сохраняем важные моменты',
  },
};

const allPosts: Post[] = [
  {
    id: 'new-support-houses',
    title: 'Новые домики психологической помощи готовятся к открытию',
    content: 'Наше волонтёрское движение готовит к открытию новые домики психологической помощи для семей в Свердловской области. Впереди важный этап: обустройство сенсорных комнат, закупка мебели и подготовка кураторов. Присоединяйтесь к благотворительной программе организации.',
    stream: 'upcoming',
    image: '/Тренинг RGGN.jpg',
    date: 'Скоро',
  },
  {
    id: 'christmas-banquet-2025',
    title: 'Ежегодный Рождественский банкет для приёмных родителей',
    content: 'Служение «Мечты и судьбы» в 12-й раз провело торжественный рождественский банкет для приёмных родителей, опекунов и всех, кто заботится об уязвимых детях. Это благотворительное событие подарило семьям атмосферу праздника, живую музыку, психологическую разгрузку и тёплое общение.',
    stream: 'past',
    image: '/рождественский банкет.jpg',
    date: '07 Янв 2025',
  },
  {
    id: 'svyaz-way-home',
    title: 'Путь к дому: площадка «Связь» приёмных семей',
    content: 'Благотворительный проект, группы поддержки, психологический тренинг КППТ и ресурсные домики помогают приёмным семьям найти силы для адаптации детей. Здесь волонтёры движения проводят еженедельные встречи, делятся опытом и поддерживают тех, кто принял ребёнка в семью.',
    stream: 'past',
    image: '/площадка связь.jpg',
    date: '12 Апр 2024',
  },
];

export function LetopisSection() {
  const [activeStream, setActiveStream] = useState<Stream | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const postsByStream = useMemo(() => ({
    upcoming: allPosts.filter((post) => post.stream === 'upcoming'),
    past: allPosts.filter((post) => post.stream === 'past'),
  }), []);

  const activePosts = activeStream ? postsByStream[activeStream] : [];
  const selectedPost = activePosts[activeIndex] ?? null;

  const openStream = (stream: Stream, postId?: string) => {
    const posts = postsByStream[stream];
    const nextIndex = postId ? Math.max(0, posts.findIndex((post) => post.id === postId)) : 0;
    setActiveStream(stream);
    setActiveIndex(nextIndex);
  };

  const closeReader = () => setActiveStream(null);
  const showPrevious = () => setActiveIndex((index) => (
    index === 0 ? activePosts.length - 1 : index - 1
  ));
  const showNext = () => setActiveIndex((index) => (
    index === activePosts.length - 1 ? 0 : index + 1
  ));

  useEffect(() => {
    if (!selectedPost) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeReader();
      if (event.key === 'ArrowLeft' && activePosts.length > 1) showPrevious();
      if (event.key === 'ArrowRight' && activePosts.length > 1) showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost, activePosts.length]);

  return (
    <section id="letopis" className="letopis-section">
      <Reveal type="up" delay={0.1}>
        <div className="letopis-heading">
          <div className="section-label">Новости НКО</div>
          <h2><em>Летопись</em> организации</h2>
          <p>Две линии одной истории: планы, к которым можно присоединиться, и события, которые уже стали частью нашей общей книги.</p>
        </div>
      </Reveal>

      <div className="letopis-streams">
        {(['upcoming', 'past'] as Stream[]).map((stream, index) => {
          const latestPost = postsByStream[stream][0];
          const meta = streamMeta[stream];

          return (
            <Reveal key={stream} type="up" delay={0.18 + index * 0.08}>
              <article className={`letopis-stream-card letopis-stream-card--${stream}`}>
                <button
                  type="button"
                  className="letopis-stream-card__media"
                  onClick={() => openStream(stream, latestPost.id)}
                  aria-label={`Открыть запись: ${latestPost.title}`}
                >
                  <img src={asset(latestPost.image)} alt={latestPost.title} loading="lazy" />
                </button>

                <div className="letopis-stream-card__body">
                  <div className="letopis-stream-card__header">
                    <div>
                      <span className="letopis-stream-card__chapter">Раздел {String(index + 1).padStart(2, '0')}</span>
                      <h3>{meta.title}</h3>
                    </div>
                    <span className="letopis-stream-card__note">{meta.note}</span>
                  </div>

                  <div className="letopis-stream-card__latest">
                    <time><CalendarDays size={15} aria-hidden="true" />{latestPost.date}</time>
                    <h4>{latestPost.title}</h4>
                    <p>{latestPost.content}</p>
                  </div>

                  <div className="letopis-stream-card__actions">
                    <button type="button" onClick={() => openStream(stream, latestPost.id)}>
                      Читать запись <BookOpen size={17} aria-hidden="true" />
                    </button>
                    <button type="button" className="letopis-stream-card__archive" onClick={() => openStream(stream)}>
                      Все записи · {postsByStream[stream].length}
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {selectedPost && activeStream && (
        <div
          className="letopis-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letopis-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeReader();
          }}
        >
          <article className="letopis-modal letopis-reader">
            <button type="button" className="letopis-modal-close" onClick={closeReader} aria-label="Закрыть летопись">
              <X size={20} aria-hidden="true" />
              <span>Закрыть</span>
            </button>

            <div className="letopis-modal-media">
              <img src={asset(selectedPost.image)} alt={selectedPost.title} />
            </div>

            <div className="letopis-modal-body">
              <div className="letopis-modal-kicker">{streamMeta[activeStream].subtitle}</div>
              <time>{selectedPost.date}</time>
              <h3 id="letopis-modal-title">{selectedPost.title}</h3>
              <div className="letopis-modal-divider" />
              <p>{selectedPost.content}</p>

              <div className="letopis-reader__footer">
                <span>{String(activeIndex + 1).padStart(2, '0')} / {String(activePosts.length).padStart(2, '0')}</span>
                {activePosts.length > 1 && (
                  <div className="letopis-reader__controls">
                    <button type="button" onClick={showPrevious} aria-label="Предыдущая запись">
                      <ArrowLeft size={19} aria-hidden="true" />
                    </button>
                    <div className="letopis-reader__dots" aria-label="Записи раздела">
                      {activePosts.map((post, index) => (
                        <button
                          key={post.id}
                          type="button"
                          className={index === activeIndex ? 'is-active' : ''}
                          onClick={() => setActiveIndex(index)}
                          aria-label={`Открыть запись ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button type="button" onClick={showNext} aria-label="Следующая запись">
                      <ArrowRight size={19} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
