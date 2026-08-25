import {
  ArrowRight,
  Bath,
  BedDouble,
  CookingPot,
  Flame,
  Trees,
  ToyBrick,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { asset } from '../utils';
import '../cabins-page.css';

const amenities = [
  { icon: BedDouble, title: 'Место для отдыха', text: 'Уютные спальные места, постельное бельё и спокойный интерьер' },
  { icon: CookingPot, title: 'Кухня и посуда', text: 'Всё необходимое, чтобы готовить привычную семейную еду' },
  { icon: Bath, title: 'Удобства в домике', text: 'Душ, санузел и горячая вода находятся внутри' },
  { icon: Trees, title: 'Терраса и простор', text: 'Можно завтракать на воздухе, читать или просто смотреть вдаль' },
  { icon: Flame, title: 'Вечер у огня', text: 'Отдельное место для тёплых разговоров и общего семейного вечера' },
  { icon: ToyBrick, title: 'Детям есть где играть', text: 'Свободное пространство на участке и игровая площадка рядом' },
];

const gallery = [
  { src: '/cabins/bedroom.jpeg', alt: 'Подготовленная кровать в деревянном интерьере домика', label: 'отдых' },
  { src: '/cabins/table.jpeg', alt: 'Сервированный стол на кухне домика', label: 'вместе за столом' },
  { src: '/cabins/hammock.jpeg', alt: 'Гостья отдыхает в подвесном кресле на террасе', label: 'тишина' },
  { src: '/cabins/kitchen.jpeg', alt: 'Оборудованная кухня внутри домика', label: 'как дома' },
  { src: '/cabins/fire.jpeg', alt: 'Огонь в уличной чаше рядом с домиками', label: 'вечером' },
  { src: '/cabins/playground.jpeg', alt: 'Детская площадка на зелёной территории', label: 'простор для детей' },
];

export function CabinsPage() {
  useDocumentTitle('Домики для семей');

  const bookingUrl = import.meta.env.VITE_CABIN_BOOKING_URL?.trim();
  const bookingLabel = bookingUrl ? 'Выбрать даты' : 'Уточнить свободные даты';
  const bookingLink = (className: string) => bookingUrl ? (
    <a className={className} href={bookingUrl} target="_blank" rel="noreferrer">
      <span>{bookingLabel}</span><ArrowRight size={18} aria-hidden="true" />
    </a>
  ) : (
    <Link className={className} to="/#contact">
      <span>{bookingLabel}</span><ArrowRight size={18} aria-hidden="true" />
    </Link>
  );

  return (
    <main className="cabins-page">
      <section className="cabins-hero">
        <div className="cabins-shell cabins-hero__grid">
          <div className="cabins-hero__copy">
            <Reveal>
              <span className="cabins-kicker">Отдых для приёмных семей</span>
              <h1>Место, где можно просто <em>быть вместе</em></h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="cabins-hero__lead">
                Три уютных загородных домика, где семья может сменить обстановку,
                выдохнуть и провести время друг с другом без спешки
              </p>
              <div className="cabins-hero__actions">
                {bookingLink('cabins-primary-action')}
                <a className="cabins-text-link" href="#cabins-inside">Посмотреть, что внутри</a>
              </div>
            </Reveal>
          </div>

          <Reveal type="right" delay={0.16}>
            <div className="cabins-hero__visual">
              <figure className="cabins-hero__main-photo">
                <img src={asset('/cabins/hero-exterior.jpeg')} alt="Загородные домики и просторная зелёная территория" />
                <figcaption>тишина, воздух и время друг для друга</figcaption>
              </figure>
              <figure className="cabins-hero__family-photo">
                <img src={asset('/cabins/family-rest.jpeg')} alt="Мама и сын отдыхают вместе в домике" />
              </figure>
              <span className="cabins-hand-note">семейная пауза</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cabins-names" aria-labelledby="cabins-names-title">
        <div className="cabins-shell cabins-names__inner">
          <div>
            <span className="cabins-kicker">Три домика — три имени</span>
            <h2 id="cabins-names-title">У каждого свой <em>характер</em></h2>
          </div>
          <ol className="cabins-names__list">
            <li><span>01</span><strong>Милый дом</strong></li>
            <li><span>02</span><strong>Домик Любви</strong></li>
            <li><span>03</span><strong>Домик надежды</strong></li>
          </ol>
        </div>
      </section>

      <section className="cabins-story">
        <div className="cabins-shell cabins-story__grid">
          <Reveal type="left">
            <figure className="cabins-story__photo">
              <img src={asset('/cabins/evening.jpeg')} alt="Домик на фоне спокойного вечернего неба" loading="lazy" />
              <figcaption>когда день становится тише</figcaption>
            </figure>
          </Reveal>
          <Reveal type="right" delay={0.1}>
            <div className="cabins-story__copy">
              <span className="cabins-kicker">Передышка для всей семьи</span>
              <h2>Не программа и не расписание, а <em>время для своих</em></h2>
              <p>
                Здесь не нужно никуда торопиться. Можно долго завтракать, гулять,
                играть с детьми, читать на террасе и закончить день у огня
              </p>
              <blockquote>
                <span>«</span>
                Иногда семье нужен не ещё один правильный совет, а безопасное место,
                где снова можно услышать друг друга
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cabins-inside" id="cabins-inside">
        <div className="cabins-shell">
          <Reveal>
            <header className="cabins-section-heading">
              <span className="cabins-kicker">Всё необходимое рядом</span>
              <h2>Устроено просто, <em>тепло и по-домашнему</em></h2>
              <p>Внутри есть всё для обычной семейной жизни, а за дверью — воздух, простор и тишина</p>
            </header>
          </Reveal>

          <div className="cabins-amenities">
            {amenities.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="cabins-amenity">
                    <span className="cabins-amenity__icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cabins-gallery-section">
        <div className="cabins-shell">
          <Reveal>
            <header className="cabins-gallery-heading">
              <span className="cabins-kicker">Живая книга отдыха</span>
              <h2>Несколько страниц <em>из жизни домиков</em></h2>
            </header>
          </Reveal>
          <div className="cabins-gallery" aria-label="Фотографии домиков для приёмных семей">
            {gallery.map((photo, index) => (
              <Reveal key={photo.src} delay={(index % 3) * 0.06}>
                <figure className={`cabins-gallery__item cabins-gallery__item--${index + 1}`}>
                  <img src={asset(photo.src)} alt={photo.alt} loading="lazy" />
                  <figcaption>{photo.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cabins-booking">
        <div className="cabins-shell cabins-booking__inner">
          <Reveal>
            <div className="cabins-booking__copy">
              <span className="cabins-kicker">Следующая семейная история</span>
              <h2>Запланировать <em>небольшую паузу</em></h2>
              <p>
                Напишите команде, чтобы узнать о свободных датах, условиях размещения
                и выбрать подходящий домик
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="cabins-booking__action">
              {bookingLink('cabins-primary-action cabins-primary-action--light')}
              <span>{bookingUrl ? 'Запись откроется в новом окне' : 'Ответим и расскажем всё необходимое'}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
