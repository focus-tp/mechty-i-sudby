import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, BookOpen, CalendarDays, X } from 'lucide-react';
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
  publishedAt: string;
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
    id: 'kpt-training-2026',
    title: 'Открыта запись на трёхдневный тренинг КППТ',
    content: '24, 25 и 26 апреля 2026 года в Екатеринбурге пройдёт очный тренинг «Компетентная помощь при травматизации» для приёмных родителей, социальных работников и специалистов. В программе — 9 модулей, 24 академических часа, практика и разбор ситуаций о том, как понимать ребёнка с травматическим опытом, сохранять контакт и заботиться о себе.',
    stream: 'upcoming',
    image: '/Тренинг RGGN.jpg',
    date: '24-26 Апр 2026',
    publishedAt: '2026-04-24',
  },
  {
    id: 'christmas-banquet-2025',
    title: 'Ежегодный Рождественский банкет для приёмных родителей',
    content: 'Служение «Мечты и судьбы» в 12-й раз провело торжественный рождественский банкет для приёмных родителей, опекунов и всех, кто заботится об уязвимых детях. Это благотворительное событие подарило семьям атмосферу праздника, живую музыку, психологическую разгрузку и тёплое общение.',
    stream: 'past',
    image: '/hero/christmas-banquet.jpg',
    date: '07 Янв 2025',
    publishedAt: '2025-01-07',
  },
  {
    id: 'svyaz-way-home',
    title: 'Прошла очередная ежегодная площадка «Связь»',
    content: 'С 9 по 11 июля 2026 года прошла очередная ежегодная площадка «Связь» для приёмных семей. Это были три дня живого общения, поддержки, совместных занятий для детей и родителей, отдыха и бережной работы с семейными историями. Такие встречи помогают семьям почувствовать, что они не одни, найти новые силы и сохранить тёплую связь друг с другом.',
    stream: 'past',
    image: '/площадка связь.jpg',
    date: '9-11 Июл 2026',
    publishedAt: '2026-07-09',
  },
];

export function LetopisSection() {
  const [activeStream, setActiveStream] = useState<Stream | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageTurnKey, setPageTurnKey] = useState(0);
  const [pageTurnDirection, setPageTurnDirection] = useState<'next' | 'previous'>('next');

  const postsByStream = useMemo(() => ({
    upcoming: allPosts
      .filter((post) => post.stream === 'upcoming')
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    past: allPosts
      .filter((post) => post.stream === 'past')
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  }), []);

  const activePosts = activeStream ? postsByStream[activeStream] : [];
  const selectedPost = activePosts[activeIndex] ?? null;

  const openStream = (stream: Stream, postId?: string) => {
    const posts = postsByStream[stream];
    const nextIndex = postId ? Math.max(0, posts.findIndex((post) => post.id === postId)) : 0;
    setActiveStream(stream);
    setActiveIndex(nextIndex);
    setPageTurnDirection('next');
    setPageTurnKey((key) => key + 1);
  };

  const closeReader = () => setActiveStream(null);
  const turnToIndex = (nextIndex: number, direction: 'next' | 'previous') => {
    setPageTurnDirection(direction);
    setActiveIndex(nextIndex);
    setPageTurnKey((key) => key + 1);
  };
  const showPrevious = () => turnToIndex(
    activeIndex === 0 ? activePosts.length - 1 : activeIndex - 1,
    'previous',
  );
  const showNext = () => turnToIndex(
    activeIndex === activePosts.length - 1 ? 0 : activeIndex + 1,
    'next',
  );

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
                  <img src={asset(latestPost.image)} alt={latestPost.title} loading="eager" decoding="async" />
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

            <div
              key={pageTurnKey}
              className="letopis-reader__page"
              data-turn={pageTurnDirection}
            >
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
                        <ArrowUp size={19} aria-hidden="true" />
                      </button>
                      <div className="letopis-reader__dots" aria-label="Записи раздела">
                        {activePosts.map((post, index) => (
                          <button
                            key={post.id}
                            type="button"
                            className={index === activeIndex ? 'is-active' : ''}
                            onClick={() => turnToIndex(index, index > activeIndex ? 'next' : 'previous')}
                            aria-label={`Открыть запись ${index + 1}`}
                          />
                        ))}
                      </div>
                      <button type="button" onClick={showNext} aria-label="Следующая запись">
                        <ArrowDown size={19} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
