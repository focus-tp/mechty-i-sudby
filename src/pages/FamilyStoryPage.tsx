import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Bookmark } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { asset } from '../utils';
import storyText from '../content/rozhdennye-serdtsem.txt?raw';

const chapterStarts = [
  'Наши любимые высказывания о семье и детях',
  'Как мы пришли к тому, что в нашем доме',
  'Первенец (',
  'Второй (',
  'Третий ребенок (',
  'Четвертый ребенок (',
  'Хватит ли у нас любви на всех?',
  'Где брать силы радоваться жизни',
  'Наши пожелания тем, кто живет рядом',
  'Благодарности.',
];

const chapterLabels = [
  'О семье и детях',
  'Как всё началось',
  'Первенец',
  'Второй ребёнок',
  'Третий ребёнок',
  'Четвёртый ребёнок',
  'Хватит ли любви?',
  'Где брать силы?',
  'Тем, кто рядом',
  'Благодарности',
];

const storyBlocks = storyText
  .split(/\r?\n/)
  .map((line) => line.replace(/\s+/g, ' ').trim())
  .filter(Boolean)
  .slice(1)
  .flatMap((text) => {
    if (text.startsWith('Как мы пришли к тому, что в нашем доме')) {
      const splitAt = text.indexOf(' Каждый ребенок —');
      if (splitAt !== -1) {
        return [text.slice(0, splitAt), text.slice(splitAt + 1)];
      }
    }
    return [text];
  });

const chapters = storyBlocks.flatMap((text, index) => {
  const chapterIndex = chapterStarts.findIndex((start) => text.startsWith(start));
  return chapterIndex === -1 ? [] : [{ index, title: text, label: chapterLabels[chapterIndex] }];
});

const bookmarkKey = 'mechty-i-sudby:rozhdennye-serdtsem:bookmark';

function readBookmark() {
  try {
    const index = Number(window.localStorage.getItem(bookmarkKey));
    return Number.isInteger(index) && index >= 1 && index < storyBlocks.length ? index : null;
  } catch {
    return null;
  }
}

const drawings = {
  shoes: {
    source: '/stories/rozhdennye-serdtsem-pencil-shoes.jpg',
    alt: 'Детская и взрослая обувь у двери, нарисованные цветными карандашами',
  },
  braids: {
    source: '/stories/rozhdennye-serdtsem-pencil-braids.jpg',
    alt: 'Две детские косички с ленточками и гребень, нарисованные цветными карандашами',
  },
  mittens: {
    source: '/stories/rozhdennye-serdtsem-pencil-mittens.jpg',
    alt: 'Две детские варежки, соединённые нитью, нарисованные цветными карандашами',
  },
  phone: {
    source: '/stories/rozhdennye-serdtsem-pencil-phone.jpg',
    alt: 'Телефонная трубка рядом с листком бумаги, нарисованные цветными карандашами',
  },
  cups: {
    source: '/stories/rozhdennye-serdtsem-pencil-cups.jpg',
    alt: 'Чашки, собранные в круг, нарисованные цветными карандашами',
  },
  table: {
    source: '/stories/rozhdennye-serdtsem-pencil-table.jpg',
    alt: 'Семейный стол с четырьмя детскими стульями, нарисованный цветными карандашами',
  },
} as const;

const illustratedParagraphs: { startsWith: string; kind: keyof typeof drawings }[] = [
  { startsWith: 'Приняв слово от Господа', kind: 'shoes' },
  { startsWith: 'Вернувшись в более-менее привычный уклад', kind: 'braids' },
  { startsWith: 'Сроки действительности всех наших документов', kind: 'phone' },
  { startsWith: 'Ну все, полна горница!', kind: 'mittens' },
  { startsWith: 'Так мы с Колей начали учиться.', kind: 'cups' },
  { startsWith: 'Однажды автослесарь в разговоре', kind: 'table' },
];

function MarginDrawing({ kind }: { kind: keyof typeof drawings }) {
  const { source, alt } = drawings[kind];

  return <figure className={`family-story-margin-drawing family-story-margin-drawing--${kind}`}><img src={asset(source)} alt={alt} loading="lazy" /></figure>;
}

function ChapterNavigation({ activeChapter }: { activeChapter: number | null }) {
  return (
    <div role="navigation" aria-label="Главы истории">
      <span className="family-story-chapters__title">Главы истории</span>
      <ol className="family-story-chapters__list">
        {chapters.map(({ index, title, label }, position) => (
          <li key={index}>
            <a
              href={`#story-part-${index}`}
              aria-label={title}
              aria-current={activeChapter === index ? 'location' : undefined}
              onClick={(event) => {
                const menu = event.currentTarget.closest('details');
                if (menu) menu.open = false;
              }}
            >
              <span className="family-story-chapters__number">{String(position + 1).padStart(2, '0')}</span>
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FamilyStoryPage() {
  useDocumentTitle('Рождённые сердцем');
  const [resumeIndex, setResumeIndex] = useState(readBookmark);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [showRail, setShowRail] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastSaved = readBookmark();

    const savePosition = () => {
      frame = 0;
      const bodyRect = document.querySelector('.family-story-body')?.getBoundingClientRect();
      setShowRail(Boolean(bodyRect && bodyRect.top <= 140 && bodyRect.bottom > 500));
      const blocks = document.querySelectorAll<HTMLElement>('[data-story-index]');
      let currentIndex = 0;
      for (const block of blocks) {
        if (block.getBoundingClientRect().top > 150) break;
        currentIndex = Number(block.dataset.storyIndex);
      }

      let currentChapter: number | null = null;
      for (const chapter of chapters) {
        if (chapter.index > currentIndex) break;
        currentChapter = chapter.index;
      }
      setActiveChapter(currentChapter);

      if (currentIndex < 1 || currentIndex === lastSaved) return;
      try {
        window.localStorage.setItem(bookmarkKey, String(currentIndex));
        lastSaved = currentIndex;
        setResumeIndex(currentIndex);
      } catch {
        // Reading remains available when browser storage is disabled.
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(savePosition);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    savePosition();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="family-story-page">
      <section className="family-story-hero">
        <div className="family-story-shell">
          <div className="family-story-topline">
            <Link className="family-story-back" to="/#stories">
              <ArrowLeft size={18} aria-hidden="true" />
              Все истории
            </Link>
            <div className="family-story-bookmark-area">
              {resumeIndex !== null && (
                <a className="family-story-bookmark" href={`#story-part-${resumeIndex}`}>
                  <Bookmark size={17} aria-hidden="true" />
                  Вернуться к месту чтения
                </a>
              )}
              <span className="family-story-bookmark-note">Место чтения сохраняется автоматически на этом устройстве</span>
            </div>
          </div>

          <Reveal>
            <span className="family-story-kicker">История семьи</span>
            <h1>Рождённые <em>сердцем</em></h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="family-story-cover-bottom">
              <blockquote className="family-story-pullquote">
                «Каждый ребёнок ищет того, кто ищет его».
              </blockquote>
              <figure className="family-story-cover-doodle">
                <img src={asset('/stories/rozhdennye-serdtsem-pencil-home.jpg')} alt="Детская зарисовка цветными карандашами: дом с открытой дверью" />
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="family-story-body">
        <div className={`family-story-reading-bar${showRail ? ' is-visible' : ''}`}>
          <span className="family-story-reading-bar__title">Рождённые сердцем</span>
          <span className="family-story-reading-bar__chapter">{chapters.find(({ index }) => index === activeChapter)?.label ?? 'История семьи'}</span>
          <details className="family-story-chapter-menu">
            <summary><BookOpen size={17} aria-hidden="true" />Главы</summary>
            <ChapterNavigation activeChapter={activeChapter} />
          </details>
        </div>
        <div className="family-story-shell">
          <aside className={`family-story-rail${showRail ? ' is-visible' : ''}`}>
            <ChapterNavigation activeChapter={activeChapter} />
          </aside>
          <article className="family-story-prose" aria-label="Полный текст истории">
            {storyBlocks.map((text, index) => {
              const isChapter = chapterStarts.some((start) => text.startsWith(start));
              if (isChapter) {
                return <h2 className="family-story-prose__chapter" id={`story-part-${index}`} data-story-index={index} key={index}>{text}</h2>;
              }

              const drawing = illustratedParagraphs.find(({ startsWith }) => text.startsWith(startsWith))?.kind;

              if (drawing) {
                return <div className="family-story-prose__illustrated" id={`story-part-${index}`} data-story-index={index} key={index}>
                  <MarginDrawing kind={drawing} />
                  <p>{text}</p>
                </div>;
              }

              return <p id={`story-part-${index}`} data-story-index={index} key={index}>{text}</p>;
            })}
          </article>
          <div className="family-story-ending">
            <span className="family-story-ending__rule" aria-hidden="true" />
            <Link to="/#stories"><ArrowLeft size={17} aria-hidden="true" /> Ко всем историям</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
