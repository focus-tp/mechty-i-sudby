import {
  ArrowRight,
  Bath,
  BedDouble,
  CookingPot,
  Flame,
  Sun,
  ThermometerSun,
  Trees,
  ToyBrick,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { asset } from '../utils';

const amenities = [
  { icon: BedDouble, title: 'Место для отдыха', text: 'Уютные спальные места, постельное бельё и спокойный интерьер' },
  { icon: CookingPot, title: 'Кухня и посуда', text: 'Всё необходимое, чтобы готовить привычную семейную еду' },
  { icon: Bath, title: 'Удобства в доме', text: 'Душ, санузел и горячая вода находятся внутри' },
  { icon: Trees, title: 'Терраса и простор', text: 'Можно завтракать на воздухе, читать или просто смотреть вдаль' },
  { icon: Flame, title: 'Вечер у огня', text: 'Отдельное место для тёплых разговоров и общего семейного вечера' },
  { icon: ToyBrick, title: 'Детям есть где играть', text: 'Свободное пространство на участке и игровая площадка рядом' },
  { icon: ThermometerSun, title: 'Финская сауна', text: 'Можно хорошо прогреться, расслабиться и восстановить силы' },
  { icon: Sun, title: 'Большая веранда', text: 'Просторная общая веранда с большими столами для семейных встреч' },
];

const gallery = [
  { src: '/cabins/bedroom.jpeg', alt: 'Подготовленная кровать в деревянном интерьере дома', label: 'отдых' },
  { src: '/cabins/table.jpeg', alt: 'Сервированный стол на кухне дома', label: 'вместе за столом' },
  { src: '/cabins/hammock.jpeg', alt: 'Гостья отдыхает в подвесном кресле на террасе', label: 'тишина' },
  { src: '/cabins/kitchen.jpeg', alt: 'Оборудованная кухня внутри дома', label: 'как дома' },
  { src: '/cabins/fire.jpeg', alt: 'Огонь в уличной чаше рядом с домами', label: 'вечером' },
  { src: '/cabins/playground.jpeg', alt: 'Детская площадка на зелёной территории', label: 'простор для детей' },
];

export function CabinsPage() {
  useDocumentTitle('Дома для семей');

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
              <span className="project-chapter">Программа 03</span>
              <h1>Место, где можно просто <em>быть вместе</em></h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="cabins-hero__lead">
                Три уютных загородных дома, где семья может сменить обстановку,
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
                <img
                  src={asset('/cabins/domiki-evening-exterior.jpeg')}
                  srcSet={`${asset('/cabins/domiki-evening-exterior-720.jpg')} 720w, ${asset('/cabins/domiki-evening-exterior.jpeg')} 2400w`}
                  sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1100px) 80vw, 620px"
                  width="2400"
                  height="1800"
                  alt="Уютный загородный дом с освещённой террасой вечером"
                  fetchPriority="high"
                />
                <figcaption>тишина, воздух и время друг для друга</figcaption>
              </figure>
              <figure className="cabins-hero__family-photo">
                <img src={asset('/cabins/family-rest.jpeg')} alt="Мама и сын отдыхают вместе в доме" />
              </figure>
              <span className="cabins-hand-note">семейная пауза</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cabins-names" aria-labelledby="cabins-names-title">
        <div className="cabins-shell cabins-names__inner">
          <div>
            <span className="cabins-kicker">Три дома — три имени</span>
            <h2 id="cabins-names-title">У каждого свой <em>характер</em></h2>
          </div>
          <ol className="cabins-names__list">
            <li><span>01</span><strong>Милый дом</strong></li>
            <li><span>02</span><strong>Дом Любви</strong></li>
            <li><span>03</span><strong>Дом надежды</strong></li>
          </ol>
        </div>
      </section>

      <section className="cabins-story">
        <div className="cabins-shell cabins-story__grid">
          <Reveal type="left">
            <figure className="cabins-story__photo">
              <img
                src={asset('/cabins/family-time.jpeg')}
                alt="Уютный интерьер дома с цветами и семейным посланием на деревянной стене"
                loading="lazy"
              />
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

      <section className="cabins-practical" aria-labelledby="cabins-practical-title">
        <div className="cabins-shell">
          <Reveal>
            <header className="cabins-practical__heading">
              <span className="cabins-kicker">Перед поездкой</span>
              <h2 id="cabins-practical-title">Всё, что важно <em>знать заранее</em></h2>
              <p>Дома находятся в черте Екатеринбурга — можно выбраться из города, не тратя много времени на дорогу.</p>
            </header>
          </Reveal>

          <div className="cabins-practical__grid">
            <article><span>Место</span><strong>Горный Щит, Екатеринбург</strong><p>ДНП «Аэродром», ул. Туманная, 3.</p></article>
            <article><span>Вместимость</span><strong>До 5 гостей</strong><p>Подходит для спокойного семейного отдыха.</p></article>
            <article><span>Условия</span><strong>Бесплатно для приёмных семей</strong><p>Перед поездкой команда уточнит детали размещения.</p></article>
            <article><span>Бронирование</span><strong>Через команду</strong><p>Напишите нам, чтобы узнать о свободных датах и выбрать дом.</p></article>
          </div>

          <Reveal delay={0.12}>
            <div className="cabins-practical__action">
              {bookingLink('cabins-primary-action')}
              <span>Онлайн-запись появится здесь позже.</span>
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
            {amenities.map((item) => {
              const Icon = item.icon;
              return (
                <article className="cabins-amenity" key={item.title}>
                  <span className="cabins-amenity__icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
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
              <h2>Несколько страниц <em>из жизни домов</em></h2>
            </header>
          </Reveal>
          <div className="cabins-gallery" aria-label="Фотографии домов для приёмных семей">
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
                и выбрать подходящий дом
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
