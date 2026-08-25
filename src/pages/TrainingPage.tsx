import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { asset } from '../utils';

const audience = [
  { title: 'Приёмные родители и опекуны', text: 'Для взрослых, которые растят ребёнка с опытом утраты, пренебрежения или разрыва привязанности.' },
  { title: 'Педагоги', text: 'Для учителей, воспитателей и школьных психологов, работающих с детьми из уязвимых семей.' },
  { title: 'Социальные специалисты', text: 'Для сотрудников органов опеки, НКО, семейных и кризисных центров.' },
  { title: 'Психологи и волонтёры', text: 'Для тех, кто профессионально или добровольно сопровождает детей и семьи.' },
];

const trainingDays = [
  {
    day: 'День 01',
    title: 'Понять опыт ребёнка',
    modules: [
      ['01', 'Принципы благополучия детей', 'Потребности ребёнка, его права и ответственность взрослых.'],
      ['02', 'Детская травма', 'Как травматический опыт влияет на мозг, развитие и поведение.'],
      ['03', 'Привязанность', 'Как формируются безопасные и нарушенные модели привязанности.'],
    ],
  },
  {
    day: 'День 02',
    title: 'Увидеть причину поведения',
    modules: [
      ['04', 'Защитные реакции', 'Борьба, бегство, замирание и диссоциация в ответ на стресс.'],
      ['05', 'Навыки поддерживающего ухода', 'Как реагировать, когда помогать и когда давать пространство.'],
      ['06', 'Язык детских реакций', 'Что может стоять за агрессией, уходом, зависимостью и ложью.'],
    ],
  },
  {
    day: 'День 03',
    title: 'Стать устойчивой опорой',
    modules: [
      ['07', 'Факторы восстановления', 'Значимый взрослый, предсказуемость, ритуалы и устойчивость.'],
      ['08', 'Сложное поведение', 'Деэскалация, ясные границы и последовательные действия.'],
      ['09', 'Забота о себе', 'Ресурсы взрослого и профилактика эмоционального выгорания.'],
    ],
  },
];

const outcomes = [
  'Распознавать, что стоит за сложным поведением ребёнка',
  'Создавать больше безопасности и предсказуемости',
  'Поддерживать ребёнка во время сильных эмоций',
  'Выстраивать границы без разрушения контакта',
  'Замечать собственное истощение и вовремя восстанавливаться',
];

export function TrainingPage() {
  useDocumentTitle('Тренинг КППТ');

  return (
    <main className="kpt-page">
      <section className="kpt-hero">
        <div className="kpt-shell kpt-hero__grid">
          <div className="kpt-hero__copy">
            <Reveal>
              <span className="kpt-kicker">Международная обучающая программа</span>
              <h1>Тренинг <em>КППТ</em></h1>
              <p className="kpt-hero__name">Компетентная помощь при травматизации</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="kpt-hero__lead">
                Трёхдневное обучение о том, как понимать ребёнка с травматическим опытом, сохранять контакт в сложных ситуациях и становиться для него устойчивой опорой.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="kpt-facts">
                <div><dt>3</dt><dd>учебных дня</dd></div>
                <div><dt>9</dt><dd>последовательных модулей</dd></div>
                <div><dt>24</dt><dd>академических часа</dd></div>
                <div><dt>59</dt><dd>стран применяют программу</dd></div>
              </dl>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="kpt-hero__actions">
                <a className="kpt-primary-link" href={asset('/#contact')}>
                  Узнать о следующем тренинге
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <span>Новый набор готовится</span>
              </div>
            </Reveal>
          </div>

          <Reveal type="right" delay={0.16}>
            <figure className="kpt-hero__photo">
              <img src={asset('/training/group.jpg')} alt="Участники тренинга КППТ с преподавателями" />
              <figcaption>знания, которые помогают быть рядом</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="kpt-audience">
        <div className="kpt-shell">
          <Reveal>
            <header className="kpt-heading">
              <span className="kpt-kicker">Для кого</span>
              <h2>Для тех, кто становится <em>опорой</em></h2>
              <p>Программа соединяет родителей и специалистов вокруг общего языка: не оценивать поведение, а видеть за ним опыт и потребность ребёнка.</p>
            </header>
          </Reveal>

          <div className="kpt-audience__list">
            {audience.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="kpt-outcomes">
        <div className="kpt-shell kpt-outcomes__grid">
          <Reveal type="left">
            <div className="kpt-experience">
              <figure>
                <img src={asset('/training/session.jpg')} alt="Практическая работа участников во время тренинга КППТ" loading="lazy" />
                <figcaption>обсуждаем реальные ситуации</figcaption>
              </figure>
              <div className="kpt-quote">
                <blockquote>
                  «Я наконец поняла, почему мой ребёнок так себя ведёт. Это не капризы. Это травма, и с этим можно работать»
                </blockquote>
                <p>Из отзыва участницы КППТ</p>
              </div>
            </div>
          </Reveal>

          <Reveal type="right" delay={0.1}>
            <div className="kpt-outcomes__content">
              <span className="kpt-kicker">Практический результат</span>
              <h2>Не только понять, но и знать, <em>что делать</em></h2>
              <ul>
                {outcomes.map((outcome, index) => (
                  <li key={outcome}><span>0{index + 1}</span>{outcome}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="kpt-program">
        <div className="kpt-shell">
          <Reveal>
            <header className="kpt-heading kpt-program__heading">
              <span className="kpt-kicker">Программа</span>
              <h2>Три дня последовательного <em>погружения</em></h2>
              <p>Каждый день продолжает предыдущий: теория сразу связывается с разбором ситуаций и практическими инструментами.</p>
            </header>
          </Reveal>

          <div className="kpt-program__days">
            {trainingDays.map((day, index) => (
              <Reveal key={day.day} delay={index * 0.08}>
                <article className="kpt-day">
                  <span className="kpt-day__label">{day.day}</span>
                  <h3>{day.title}</h3>
                  <ol>
                    {day.modules.map(([num, title, text]) => (
                      <li key={num}>
                        <span>{num}</span>
                        <div><h4>{title}</h4><p>{text}</p></div>
                      </li>
                    ))}
                  </ol>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="kpt-program__note">
              <span>Важно</span>
              <p>Для получения целостной методики необходимо участие во всех трёх учебных днях.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="kpt-cta">
        <div className="kpt-shell kpt-cta__grid">
          <Reveal>
            <span>Следующий набор</span>
            <h2>Дата, место и стоимость будут объявлены после формирования новой группы</h2>
            <p>Оставьте сообщение с темой «Тренинг КППТ», и команда свяжется с вами, когда откроется регистрация.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="kpt-cta__actions">
              <a href={asset('/#contact')}>
                Оставить заявку
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="tel:+79321275011">+7 932 127-50-11</a>
            </div>
          </Reveal>
        </div>
        <div className="kpt-shell kpt-cta__partner">Программа проводится в партнёрстве с «Мир без травмы»</div>
      </section>
    </main>
  );
}
