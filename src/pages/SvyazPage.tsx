import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { asset } from '../utils';

const foundations = [
  { title: 'Эмоциональная связь', text: 'Сосредоточенность на построении доверия и ощущения безопасности.' },
  { title: 'Подкрепление', text: 'Подготовка тела и окружающей среды ребёнка к успеху.' },
  { title: 'Коррекция', text: 'Бережная работа с поведением, которое сформировалось из страха.' },
];

const programTracks = [
  { title: 'Для детей', text: 'Дети учатся замечать и называть чувства, выражать потребности и использовать способы саморегуляции.' },
  { title: 'Для родителей', text: 'Родители осваивают взаимодействие с детьми, пережившими травматический опыт, и учатся видеть причины сложного поведения.' },
  { title: 'Вместе', text: 'Семьи закрепляют новые навыки в совместных занятиях, играх и повседневных ситуациях при сопровождении специалистов и волонтёров.' },
];

export function SvyazPage() {
  useDocumentTitle('Площадка «Связь»');

  return (
    <main className="svyaz-page">
      <section className="svyaz-hero">
        <div className="svyaz-shell svyaz-hero__grid">
          <div className="svyaz-hero__copy">
            <Reveal>
              <span className="svyaz-kicker">Семейная терапевтическая площадка</span>
              <h1>Площадка <em>Связь</em></h1>
              <p className="svyaz-hero__subtitle">На связи от сердца к сердцу</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="svyaz-hero__lead">Помогаем приёмным семьям и детям укреплять привязанность, учиться общению и саморегуляции после пережитых травм.</p>
              <div className="svyaz-hero__purpose">
                <span>Наша цель</span>
                <p>Создать пространство, в котором ребёнок снова может доверять взрослому, говорить о своих потребностях и раскрывать свой потенциал.</p>
              </div>
            </Reveal>
          </div>

          <Reveal type="right" delay={0.18}>
            <figure className="svyaz-hero__photo">
              <img src={asset('/svyaz/group.jpg')} alt="Участники и команда семейной площадки «Связь»" />
              <img className="svyaz-hero__project-logo" src={asset('/svyaz/logo.png')} alt="Семейная площадка «Связь»" />
              <figcaption>вместе учимся быть ближе</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="svyaz-foundations">
        <div className="svyaz-shell">
          <Reveal>
            <header className="svyaz-section-heading svyaz-foundations__heading">
              <span className="svyaz-kicker">Методика работы</span>
              <h2>Три основы <em>ТОВД</em></h2>
              <p>Терапия, основанная на взаимоотношениях доверия, начинается не с исправления поведения, а с безопасной связи.</p>
            </header>
          </Reveal>

          <div className="svyaz-foundations__list">
            {foundations.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article>
                  <span className="svyaz-foundations__number">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.18}>
            <p className="svyaz-foundations__note">Сначала контакт. Затем опора. И только после этого изменения.</p>
          </Reveal>
        </div>
      </section>

      <section className="svyaz-process">
        <div className="svyaz-shell">
          <Reveal>
            <header className="svyaz-section-heading svyaz-process__heading">
              <span className="svyaz-kicker">Как проходит площадка</span>
              <h2>Учимся слышать <em>друг друга</em></h2>
              <p>Программа работает сразу в трёх направлениях: ребёнок получает безопасный опыт, взрослый осваивает поддерживающие навыки, а семья пробует их вместе.</p>
            </header>
          </Reveal>

          <div className="svyaz-process__grid">
            <Reveal type="left">
              <figure className="svyaz-process__photo">
                <img src={asset('/svyaz/care.jpg')} alt="Специалист поддерживает ребёнка во время семейной площадки" loading="lazy" />
                <figcaption>быть рядом и замечать</figcaption>
              </figure>
            </Reveal>

            <div className="svyaz-process__tracks">
              {programTracks.map((track, index) => (
                <Reveal key={track.title} delay={index * 0.08}>
                  <article>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{track.title}</h3>
                      <p>{track.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.16}>
            <div className="svyaz-process__result">
              <span>Что остаётся с семьёй</span>
              <p>Больше эмоциональной опоры, доверия и понятных способов быть вместе в трудных ситуациях.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="svyaz-camp" id="camp">
        <div className="svyaz-camp__inner">
          <Reveal>
            <div className="svyaz-camp__heading">
              <div>
                <span className="svyaz-camp__eyebrow">Лето 2026</span>
                <h2>Лагерь <em>«Связь»</em></h2>
              </div>
              <p>Выездная программа, где терапевтическая работа соединяется с движением, игрой, отдыхом и временем семьи вместе.</p>
            </div>
          </Reveal>

          <div className="svyaz-camp__feature">
            <Reveal type="left">
              <figure className="svyaz-camp__sand-photo">
                <img src={asset('/camp/sand-therapy.jpeg')} alt="Композиция с миниатюрами во время занятия песочной терапией" loading="lazy" />
                <figcaption>бережный язык образов</figcaption>
              </figure>
            </Reveal>
            <Reveal type="right" delay={0.12}>
              <div className="svyaz-camp__sand-copy">
                <span>Одно из направлений</span>
                <h3>Песочная терапия</h3>
                <p>На занятиях дети создают истории из песка и миниатюр вместе со специалистом. Такой невербальный формат помогает им бережно выражать чувства, замечать внутренние переживания и находить новые способы взаимодействия.</p>
              </div>
            </Reveal>
          </div>

          <div className="svyaz-camp__gallery" aria-label="Фотографии лагеря «Связь» 2026">
            <Reveal delay={0.06}><figure><img src={asset('/camp/movement.jpeg')} alt="Подвижная игра в лагере «Связь»" loading="lazy" /><figcaption>движение</figcaption></figure></Reveal>
            <Reveal delay={0.12}><figure><img src={asset('/camp/family-connection.jpeg')} alt="Мама и ребёнок во время семейного занятия" loading="lazy" /><figcaption>контакт</figcaption></figure></Reveal>
            <Reveal delay={0.18}><figure><img src={asset('/camp/water-play.jpeg')} alt="Ребёнок играет с водой на свежем воздухе" loading="lazy" /><figcaption>свободная игра</figcaption></figure></Reveal>
          </div>
        </div>
      </section>

      <section className="svyaz-voice">
        <div className="svyaz-shell svyaz-voice__grid">
          <Reveal>
            <div className="svyaz-voice__copy">
              <span className="svyaz-kicker">Главная перемена</span>
              <h2>Вернуть ребёнку <em>голос</em></h2>
              <div className="svyaz-voice__definition">
                <h3>Когда голос потерян</h3>
                <p>Ребёнок перестаёт выражать чувства и потребности, не обращается за помощью к взрослому. Так могут проявляться последствия потери близкого человека, пренебрежения и других травм.</p>
              </div>
              <div className="svyaz-voice__definition">
                <h3>Когда доверие возвращается</h3>
                <p>Родители учатся создавать условия, в которых ребёнок снова может говорить о себе, просить поддержки и чувствовать: его слышат.</p>
              </div>
            </div>
          </Reveal>

          <Reveal type="right" delay={0.12}>
            <figure className="svyaz-video">
              <video controls playsInline preload="metadata" poster={asset('/svyaz/group.jpg')}>
                <source src={asset('/video/svyaz-presentation.mp4')} type="video/mp4" />
                Ваш браузер не поддерживает встроенное видео.
              </video>
              <figcaption><span>Видео о площадке</span><strong>Как семьи проживают опыт «Связи»</strong></figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="svyaz-cta">
        <div className="svyaz-shell svyaz-cta__inner">
          <Reveal><span>Продолжим историю вместе</span><h2>Помогите семьям обрести больше доверия, близости и опоры</h2></Reveal>
          <Reveal delay={0.12}><a href={asset('/#donate')}>Поддержать площадку</a></Reveal>
        </div>
      </section>
    </main>
  );
}
