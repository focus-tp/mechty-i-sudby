import { useState } from 'react';
import { Reveal } from './Reveal';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Story {
  quote: string;
  author: string;
  role: string;
  years: string;
  color: string;
  initial: string;
}

const stories: Story[] = [
  {
    quote: 'Когда мы впервые пришли на площадку «Связь», наш сын не разговаривал с нами уже три месяца. После первого занятия он сам взял меня за руку. Это было чудо.',
    author: 'Марина',
    role: 'Приёмная мама',
    years: '4 года в семье',
    color: '#c9547a',
    initial: 'М',
  },
  {
    quote: 'Тренинг КППТ дал мне то, чего не давала ни одна книга — я наконец поняла, почему мой ребёнок так себя ведёт. Это не капризы. Это травма. И с этим можно работать.',
    author: 'Светлана',
    role: 'Опекун',
    years: 'Ребёнок в семье 2 года',
    color: '#6b3fa0',
    initial: 'С',
  },
  {
    quote: 'Евгения и команда — это люди с горящими сердцами. Они не просто обучают методикам, они сами живут тем, о чём говорят. Рядом с такими людьми хочется становиться лучше.',
    author: 'Андрей и Наталья',
    role: 'Приёмные родители',
    years: '7 лет поддержки от «Мечты и судьбы»',
    color: '#d89f5b',
    initial: 'А',
  },
  {
    quote: 'Я социальный педагог. После тренинга моя работа с детьми изменилась кардинально. Я стала видеть боль за поведением. Результаты у детей — очевидны.',
    author: 'Ирина',
    role: 'Социальный педагог',
    years: 'Специалист органов опеки',
    color: '#5b9b42',
    initial: 'И',
  },
];

export function StoriesSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? stories.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === stories.length - 1 ? 0 : c + 1));

  const story = stories[current];

  return (
    <section className="stories-section" id="stories" aria-label="Истории семей">
      {/* Декоративный фон */}
      <div className="stories-bg" aria-hidden="true" />

      <Reveal>
        <div className="section-label">Истории поддержки</div>
      </Reveal>
      <Reveal>
        <h2 className="section-title">
          Письма <em>от семей</em>
        </h2>
        <p className="stories-intro">О том, как поддержка постепенно становится доверием, близостью и новой семейной историей.</p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="stories-card stories-letter">
          <div className="stories-page-number" aria-hidden="true">
            письмо {String(current + 1).padStart(2, '0')}
          </div>
          {/* Большая кавычка */}
          <div className="stories-quote-icon">
            <Quote size={30} strokeWidth={1.2} />
          </div>

          {/* Текст цитаты */}
          <blockquote className="stories-quote" key={current}>
            {story.quote}
          </blockquote>

          {/* Автор */}
          <div className="stories-author">
            <div className="stories-author-info">
              <strong>{story.author}</strong>
              <span>{story.role}</span>
              <small>{story.years}</small>
            </div>
          </div>

          <div className="stories-signature" aria-hidden="true">
            с теплом, {story.author}
          </div>

          {/* Навигация */}
          <div className="stories-nav">
            <button
              className="stories-page-turn stories-page-turn--previous"
              onClick={prev}
              aria-label="Предыдущая история"
            >
              <ChevronLeft size={20} />
              <span>Предыдущее письмо</span>
            </button>

            {/* Точки */}
            <div className="stories-dots">
              {stories.map((_, i) => (
                <button
                  key={i}
                  className={`stories-dot ${i === current ? 'active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`История ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="stories-page-turn stories-page-turn--next"
              onClick={next}
              aria-label="Следующая история"
            >
              <span>Следующее письмо</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal delay={0.4}>
        <div className="stories-cta">
          <p>Хотите поделиться своей историей или узнать больше?</p>
          <a href="#contact" className="btn-primary">
            <span>Написать нам</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
