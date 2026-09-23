import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Reveal } from './Reveal';
import { asset } from '../utils';

type Post = {
  id: string;
  title: string;
  content: string;
  image: string;
  imagePosition?: string;
  date: string;
  publishedAt: string;
};

const allPosts: Post[] = [
  {
    id: 'kpt-training-2026',
    title: 'Открыта запись на трёхдневный тренинг КППТ',
    content: '24, 25 и 26 апреля 2026 года в Екатеринбурге пройдёт очный тренинг «Компетентная помощь при травматизации» для приёмных родителей, социальных работников и специалистов. В программе — 9 модулей, 24 академических часа, практика и разбор ситуаций о том, как понимать ребёнка с травматическим опытом, сохранять контакт и заботиться о себе.',
    image: '/Тренинг RGGN.jpg',
    date: '24-26 Апр 2026',
    publishedAt: '2026-04-24',
  },
  {
    id: 'christmas-banquet-2025',
    title: 'Ежегодный Рождественский банкет для приёмных родителей',
    content: 'Служение «Мечты и судьбы» в 12-й раз провело торжественный рождественский банкет для приёмных родителей, опекунов и всех, кто заботится об уязвимых детях. Это благотворительное событие подарило семьям атмосферу праздника, живую музыку, психологическую разгрузку и тёплое общение.',
    image: '/hero/christmas-banquet.jpg',
    date: '07 Янв 2025',
    publishedAt: '2025-01-07',
  },
  {
    id: 'svyaz-way-home',
    title: 'Прошла очередная ежегодная площадка «Связь»',
    content: 'С 9 по 11 июля 2026 года прошла очередная ежегодная площадка «Связь» для приёмных семей. Это были три дня живого общения, поддержки, совместных занятий для детей и родителей, отдыха и бережной работы с семейными историями. Такие встречи помогают семьям почувствовать, что они не одни, найти новые силы и сохранить тёплую связь друг с другом.',
    image: '/площадка связь.jpg',
    imagePosition: 'center 24%',
    date: '9-11 Июл 2026',
    publishedAt: '2026-07-09',
  },
];

export function LetopisSection() {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [spreadKey, setSpreadKey] = useState(0);
  const [turnDirection, setTurnDirection] = useState<'next' | 'previous'>('next');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [readerKey, setReaderKey] = useState(0);
  const [readerDirection, setReaderDirection] = useState<'next' | 'previous'>('next');
  const [pagesPerSpread, setPagesPerSpread] = useState(() => (
    window.matchMedia('(max-width: 767px)').matches ? 1 : 2
  ));

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const updatePagesPerSpread = () => {
      setPagesPerSpread(media.matches ? 1 : 2);
      setSpreadIndex(0);
      setSpreadKey((key) => key + 1);
    };
    media.addEventListener('change', updatePagesPerSpread);
    return () => media.removeEventListener('change', updatePagesPerSpread);
  }, []);

  const posts = useMemo(
    () => [...allPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [],
  );
  const contentSpreads = useMemo(
    () => Array.from(
      { length: Math.ceil(posts.length / pagesPerSpread) },
      (_, index) => posts.slice(index * pagesPerSpread, index * pagesPerSpread + pagesPerSpread),
    ),
    [pagesPerSpread, posts],
  );
  const hasStandaloneContents = posts.length % pagesPerSpread === 0;
  const totalSpreads = contentSpreads.length + (hasStandaloneContents ? 1 : 0);
  const currentSpread = contentSpreads[spreadIndex] ?? [];
  const showContents = spreadIndex === totalSpreads - 1
    && (currentSpread.length < pagesPerSpread || currentSpread.length === 0);
  const selectedPost = selectedIndex === null ? null : posts[selectedIndex];

  const turnSpread = (nextIndex: number, direction: 'next' | 'previous') => {
    if (nextIndex < 0 || nextIndex >= totalSpreads || nextIndex === spreadIndex) return;
    setTurnDirection(direction);
    setSpreadIndex(nextIndex);
    setSpreadKey((key) => key + 1);
  };

  const openPost = (postId: string) => {
    const index = posts.findIndex((post) => post.id === postId);
    if (index < 0) return;
    setSelectedIndex(index);
    setReaderDirection('next');
    setReaderKey((key) => key + 1);
  };

  const closeReader = () => setSelectedIndex(null);
  const turnReader = (nextIndex: number, direction: 'next' | 'previous') => {
    setReaderDirection(direction);
    setSelectedIndex(nextIndex);
    setReaderKey((key) => key + 1);
  };
  const showPrevious = () => {
    if (selectedIndex === null) return;
    turnReader(selectedIndex === 0 ? posts.length - 1 : selectedIndex - 1, 'previous');
  };
  const showNext = () => {
    if (selectedIndex === null) return;
    turnReader(selectedIndex === posts.length - 1 ? 0 : selectedIndex + 1, 'next');
  };

  useEffect(() => {
    if (!selectedPost) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeReader();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost, selectedIndex]);

  return (
    <section id="letopis" className="letopis-section">
      <Reveal type="up" delay={0.1}>
        <div className="letopis-heading">
          <div className="section-label">Новости НКО</div>
          <h2><em>Летопись</em> организации</h2>
          <p>Новости, встречи и важные события организации — от самых свежих страниц к архивным.</p>
        </div>
      </Reveal>

      <div className="letopis-reading-room">
        <div className="letopis-bookmarks" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="letopis-toolbar" aria-label="Навигация по летописи">
          <span className="letopis-toolbar__issue"><i aria-hidden="true" /> Летопись НКО</span>
          <span className="letopis-toolbar__volume">
            Разворот {spreadIndex + 1} из {totalSpreads}
          </span>
        </div>

        <div className="letopis-book-stage">
          <div className="letopis-book-cover">
            <div className="letopis-page-block">
              <div className="letopis-book-paper">
                <div className="letopis-book-spine" aria-hidden="true">
                  <i /><i /><i />
                </div>

                <div key={spreadKey} className="letopis-streams letopis-spread" data-turn={turnDirection}>
                  {currentSpread.map((post, pageIndex) => {
                    const absoluteIndex = spreadIndex * pagesPerSpread + pageIndex;
                    return (
                      <article key={post.id} className="letopis-stream-card letopis-page">
                        <button
                          type="button"
                          className="letopis-stream-card__media"
                          onClick={() => openPost(post.id)}
                          aria-label={`Открыть запись: ${post.title}`}
                        >
                          <img
                            src={asset(post.image)}
                            alt={post.title}
                            loading="eager"
                            decoding="async"
                            style={{ objectPosition: post.imagePosition }}
                          />
                        </button>

                        <div className="letopis-stream-card__body">
                          <div className="letopis-page__folio">
                            <span>Летопись · {String(absoluteIndex + 1).padStart(2, '0')}</span>
                            <time>{post.date}</time>
                          </div>

                          <div className="letopis-stream-card__latest">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                          </div>

                          <div className={`letopis-stream-card__actions ${pageIndex === 0 ? 'letopis-stream-card__actions--left-turn' : ''}`}>
                            <button type="button" onClick={() => openPost(post.id)}>
                              Читать запись <BookOpen size={17} aria-hidden="true" />
                            </button>
                            <div className="letopis-page__turns">
                              {pageIndex === 0 && spreadIndex > 0 && (
                                <button
                                  type="button"
                                  className="letopis-inline-turn"
                                  onClick={() => turnSpread(spreadIndex - 1, 'previous')}
                                  aria-label="Предыдущий разворот"
                                >
                                  <ChevronLeft size={21} aria-hidden="true" />
                                </button>
                              )}
                              <span className="letopis-page__number" aria-hidden="true">{absoluteIndex + 1}</span>
                              {pageIndex === currentSpread.length - 1 && spreadIndex < totalSpreads - 1 && (
                                <button
                                  type="button"
                                  className="letopis-inline-turn"
                                  onClick={() => turnSpread(spreadIndex + 1, 'next')}
                                  aria-label="Следующий разворот"
                                >
                                  <ChevronRight size={21} aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}

                  {showContents && (
                    <aside className={`letopis-toc-page ${currentSpread.length === 0 ? 'letopis-toc-page--full' : ''}`}>
                      <div className="letopis-toc-page__heading">
                        <CalendarDays size={24} strokeWidth={1.3} aria-hidden="true" />
                        <div>
                          <span>Последние страницы</span>
                          <h3>Оглавление</h3>
                        </div>
                      </div>

                      <ol>
                        {posts.map((post, index) => (
                          <li key={post.id}>
                            <button type="button" onClick={() => openPost(post.id)}>
                              <span>{String(index + 1).padStart(2, '0')}</span>
                              <span>{post.title}<small>{post.date}</small></span>
                            </button>
                          </li>
                        ))}
                      </ol>

                      <button
                        type="button"
                        className="letopis-toc-page__return"
                        onClick={() => turnSpread(0, 'previous')}
                      >
                        <ChevronLeft size={17} aria-hidden="true" />
                        Вернуться к первой странице
                      </button>
                    </aside>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="letopis-pagination" aria-label="Страницы летописи">
          {Array.from({ length: totalSpreads }, (_, index) => (
            <button
              key={index}
              type="button"
              className={index === spreadIndex ? 'is-active' : ''}
              onClick={() => turnSpread(index, index > spreadIndex ? 'next' : 'previous')}
              aria-label={`Открыть разворот ${index + 1}`}
              aria-current={index === spreadIndex ? 'page' : undefined}
            />
          ))}
        </div>
      </div>

      {selectedPost && selectedIndex !== null && (
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

            <div key={readerKey} className="letopis-reader__page" data-turn={readerDirection}>
              <div className="letopis-modal-media">
                <img
                  src={asset(selectedPost.image)}
                  alt={selectedPost.title}
                  style={{ objectPosition: selectedPost.imagePosition }}
                />
              </div>

              <div className="letopis-modal-body">
                <div className="letopis-modal-kicker">Запись летописи</div>
                <time>{selectedPost.date}</time>
                <h3 id="letopis-modal-title">{selectedPost.title}</h3>
                <div className="letopis-modal-divider" />
                <p>{selectedPost.content}</p>

                <div className="letopis-reader__footer">
                  <span>{String(selectedIndex + 1).padStart(2, '0')} / {String(posts.length).padStart(2, '0')}</span>
                  <div className="letopis-reader__controls">
                    <button type="button" onClick={showPrevious} aria-label="Предыдущая запись">
                      <ChevronLeft size={19} aria-hidden="true" />
                    </button>
                    <div className="letopis-reader__dots" aria-label="Записи летописи">
                      {posts.map((post, index) => (
                        <button
                          key={post.id}
                          type="button"
                          className={index === selectedIndex ? 'is-active' : ''}
                          onClick={() => turnReader(index, index > selectedIndex ? 'next' : 'previous')}
                          aria-label={`Открыть запись ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button type="button" onClick={showNext} aria-label="Следующая запись">
                      <ChevronRight size={19} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
