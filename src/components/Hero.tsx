import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { asset } from '../utils';

const heroFacts = [
  { value: '15', label: 'лет опыта команды', mobileLabel: 'лет опыта' },
  { value: '100+', label: 'семей в программах · 2011–2025', mobileLabel: 'семей' },
  { value: '≈40', label: 'участников обучения · 2025', mobileLabel: 'участников · 2025' },
];

export function Hero() {
  const { setHeroVisible } = useUI();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '-80px 0px 0px 0px' }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [setHeroVisible]);

  return (
    <section ref={heroRef} id="hero-section" className="book-hero">
      <div className="book-hero__paper" aria-hidden="true" />
      <div className="book-hero__inner">
        <div className="book-hero__copy">
          <div className="book-hero__meta">
            <p className="book-hero__eyebrow">
              <span className="hero-copy--desktop">АНО «Мечты и судьбы» · рядом с семьями с 2011 года</span>
              <span className="hero-copy--mobile">Рядом с семьями с 2011 года</span>
            </p>
          </div>
          <h1>
            Объединяем <em>сердца</em> детей и родителей, влияя на <em>судьбы</em> поколений.
          </h1>
          <p className="book-hero__lead">
            <span className="hero-copy--desktop">
              С 2011 года команда проводит семейные программы, группы поддержки
              и обучение специалистов — чтобы рядом с ребёнком был понимающий взрослый.
            </span>
            <span className="hero-copy--mobile">
              Поддерживаем семьи и обучаем специалистов — чтобы рядом с ребёнком был понимающий взрослый.
            </span>
          </p>

          <div className="book-hero__actions">
            <Link to="/#contact" className="book-hero__primary">
              <span className="hero-copy--desktop">Получить поддержку</span>
              <span className="hero-copy--mobile">Нужна помощь</span>
            </Link>
            <Link to="/#projects" className="book-hero__secondary">
              <span className="hero-copy--desktop">Наши программы</span>
              <span className="hero-copy--mobile">Программы</span>
            </Link>
          </div>
        </div>

        <div className="book-hero__visual" aria-label="Фото сообщества Мечты и судьбы">
          <div className="book-photo-paper" aria-hidden="true">
            <span className="book-photo-tape" />
          </div>
          <figure className="book-photo book-photo--main">
            <img
              src={asset('/hero/hero-embrace.jpeg')}
              srcSet={`${asset('/hero/hero-embrace-720.jpg')} 720w, ${asset('/hero/hero-embrace.jpeg')} 1280w`}
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) 70vw, 510px"
              width="1280"
              height="768"
              alt="Мама и мальчик в тёплом объятии на встрече сообщества"
              fetchPriority="high"
            />
            <figcaption>истории, которые продолжаются</figcaption>
          </figure>
          <div className="book-note book-note--photo">история заботы</div>
          <span className="book-photo-stamp" aria-hidden="true">с любовью<br />к семьям</span>
        </div>

        <div className="book-hero__facts" aria-label="Ключевые факты">
          {heroFacts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span className="hero-copy--desktop">{fact.label}</span>
              <span className="hero-copy--mobile">{fact.mobileLabel}</span>
            </div>
          ))}
        </div>
      </div>
      <a className="book-hero__next" href="#about" aria-label="Перейти к следующей главе">
        <span>следующая глава</span>
        <ArrowDown size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
