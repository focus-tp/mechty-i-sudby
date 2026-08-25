import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { asset } from '../utils';

const heroFacts = [
  { value: '15+', label: 'лет рядом' },
  { value: '500+', label: 'семей получили поддержку' },
  { value: '59', label: 'стран применяют КППТ' },
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
          <div className="book-note book-note--top">живая книга поддержки</div>

          <p className="book-hero__eyebrow">АНО «Мечты и судьбы»</p>
          <h1>
            Объединяем сердца <em>детей</em> и родителей, меняя <em>судьбы</em> поколений.
          </h1>
          <p className="book-hero__lead">
            15 лет сопровождаем приёмные семьи Екатеринбурга и Свердловской области:
            консультации, группы поддержки, тренинги КППТ и тёплое сообщество рядом.
          </p>

          <div className="book-hero__actions">
            <Link to="/#contact" className="book-hero__primary">
              Получить помощь
            </Link>
            <Link to="/#donate" className="book-hero__secondary">
              Поддержать
            </Link>
          </div>

          <div className="book-hero__facts" aria-label="Ключевые факты">
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="book-hero__visual" aria-label="Фото сообщества Мечты и судьбы">
          <div className="book-photo-paper" aria-hidden="true">
            <span className="book-photo-tape" />
          </div>
          <figure className="book-photo book-photo--main">
            <img src={asset('/hero/hero-embrace.jpeg')} alt="Мама и мальчик в тёплом объятии на встрече сообщества" />
            <figcaption>истории, которые продолжаются</figcaption>
          </figure>
          <div className="book-note book-note--photo">история заботы</div>
          <span className="book-photo-stamp" aria-hidden="true">с любовью<br />к семьям</span>
        </div>
      </div>
      <a className="book-hero__next" href="#about" aria-label="Перейти к следующей главе">
        <span>следующая глава</span>
        <ArrowDown size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
