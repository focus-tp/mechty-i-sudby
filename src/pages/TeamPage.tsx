import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { ButterflySVG } from "../components/Decorations";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function TeamPage() {
  useDocumentTitle('Команда');
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      style={{
        paddingTop: "80px",
        minHeight: "100vh",
        backgroundColor: "var(--cream)",
      }}
    >
      <section className="team relative" id="team">
        <ButterflySVG
          className="absolute text-gold-300/30 w-32 h-32"
          style={{ top: "20%", left: "-10%", transform: "rotate(25deg)" }}
        />

        <Reveal>
          <div className="section-label">Наша команда</div>
        </Reveal>
        <Reveal>
          <h2 className="section-title">
            Люди, которые делают это <em>возможным</em>
          </h2>
        </Reveal>

        <div className="team-grid">
          {/* 1. Евгения Ощепкова — большая карточка 2×2 */}
          <Reveal delay={0.1}>
            <div className="team-card-wrapper">
              <div
                className={`team-card-inner accent-gradient ${flippedIndex === 0 ? " is-flipped" : ""}`}
                onClick={() => toggleFlip(0)}
              >
                <div className="team-front">
                  <div className="badge">Основатель</div>
                  <img
                    src="/team/zenya.jpeg"
                    alt="Евгения Ощепкова"
                    className="team-avatar"
                  />
                  <h4>Евгения Ощепкова</h4>
                  <div className="team-role">Тренер</div>
                  <p className="team-short-phrase">
                    «Каждый ребёнок заслуживает любящую семью.»
                  </p>
                  <div className="more-icon">
                    <span className="desktop-icon">↗</span>
                    <span className="mobile-text">Подробнее</span>
                  </div>
                </div>
                <div className="team-back">
                  <h4>Евгения Ощепкова</h4>
                  <div className="team-role">Тренер</div>
                  <div className="team-back-content">
                    <p>
                      <strong>Опыт:</strong> Более 14 лет служения приёмным
                      семьям. Мама 10 детей (6 приёмных).
                    </p>
                    <p>
                      <strong>Компетенции:</strong> Психолог-педагог,
                      сертифицированный тренер КППТ и ТОВД. Автор книги «Гном с
                      человеческим сердцем».
                    </p>
                    <p>
                      <strong>Чем помогает:</strong> Ведёт терапевтические
                      группы, обучает наставников и передаёт международный опыт
                      работы с травмой.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2. Светлана Мопити — высокая карточка */}
          <Reveal delay={0.2}>
            <div className="team-card-wrapper">
              <div
                className={`team-card-inner accent-quote ${flippedIndex === 1 ? " is-flipped" : ""}`}
                onClick={() => toggleFlip(1)}
              >
                <div className="team-front">
                  <img
                    src="/team/mopiti.jpeg"
                    alt="Светлана Мопити"
                    className="team-avatar"
                  />
                  <h4>Светлана Мопити</h4>
                  <div className="team-role">Наставник</div>
                  <p className="team-short-phrase">
                    Открытое сердце для служения ближним.
                  </p>
                  <div className="more-icon">
                    <span className="desktop-icon">↗</span>
                    <span className="mobile-text">Подробнее</span>
                  </div>
                </div>
                <div className="team-back">
                  <h4>Светлана Мопити</h4>
                  <div className="team-role">Наставник</div>
                  <div className="team-back-content">
                    <p>
                      <strong>Опыт:</strong> Жила в Африке и Франции, богатый
                      опыт межкультурного взаимодействия.
                    </p>
                    <p>
                      <strong>Личная история:</strong> Всегда мечтала помогать
                      детям, нашла своё призвание в проекте.
                    </p>
                    <p>
                      <strong>Чем помогает:</strong> Становится надежным другом
                      и наставником для детей, которые потеряли доверие ко
                      взрослым.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3. Обычная */}
          <Reveal delay={0.3}>
            <div className="team-card-wrapper">
              <div
                className={`team-card-inner ${flippedIndex === 2 ? " is-flipped" : ""}`}
                onClick={() => toggleFlip(2)}
              >
                <div className="team-front">
                  <img
                    src="/team/agul.jpeg"
                    alt="Айгуль Ермакова"
                    className="team-avatar"
                  />
                  <h4>Айгуль Ермакова</h4>
                  <div className="team-role">Наставник</div>
                  <p className="team-short-phrase">
                    Находит контакт с любым ребёнком.
                  </p>
                  <div className="more-icon">
                    <span className="desktop-icon">↗</span>
                    <span className="mobile-text">Подробнее</span>
                  </div>
                </div>
                <div className="team-back">
                  <h4>Айгуль Ермакова</h4>
                  <div className="team-role">Наставник площадки</div>
                  <div className="team-back-content">
                    <p>
                      <strong>Компетенции:</strong> Практические навыки ТОВД.
                    </p>
                    <p>
                      <strong>Чем помогает:</strong> Наставник на детской
                      площадке, помогает детям мягко адаптироваться в новом
                      коллективе и развивать социальные навыки.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 4. Обычная */}
          <Reveal delay={0.4}>
            <div className="team-card-wrapper">
              <div
                className={`team-card-inner ${flippedIndex === 3 ? " is-flipped" : ""}`}
                onClick={() => toggleFlip(3)}
              >
                <div className="team-front">
                  <img
                    src="/team/shura.jpeg"
                    alt="Александра Бугаевская"
                    className="team-avatar"
                  />
                  <h4>Александра Бугаевская</h4>
                  <div className="team-role">Наставник</div>
                  <p className="team-short-phrase">
                    Понимает детей как никто другой.
                  </p>
                  <div className="more-icon">
                    <span className="desktop-icon">↗</span>
                    <span className="mobile-text">Подробнее</span>
                  </div>
                </div>
                <div className="team-back">
                  <h4>Александра Бугаевская</h4>
                  <div className="team-role">Творческий наставник</div>
                  <div className="team-back-content">
                    <p>
                      <strong>Личная история:</strong> Сама является приёмным
                      ребёнком.
                    </p>
                    <p>
                      <strong>Опыт:</strong> Обучена по системе ТОВД.
                    </p>
                    <p>
                      <strong>Чем помогает:</strong> Проводит творческие занятия
                      с детьми, помогая им раскрывать свои эмоции и залечивать
                      раны через созидание.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 5. Павел Казанцев — широкая карточка */}
          <Reveal delay={0.5}>
            <div className="team-card-wrapper">
              <div
                className={`team-card-inner accent-subtle ${flippedIndex === 4 ? " is-flipped" : ""}`}
                onClick={() => toggleFlip(4)}
              >
                <div className="team-front">
                  <img
                    src="/team/pavel.jpeg"
                    alt="Павел Казанцев"
                    className="team-avatar"
                  />
                  <h4>Павел Казанцев</h4>
                  <div className="team-role">Тренер</div>
                  <p className="team-short-phrase">
                    Креативный подход к сложным ситуациям.
                  </p>
                  <div className="more-icon">
                    <span className="desktop-icon">↗</span>
                    <span className="mobile-text">Подробнее</span>
                  </div>
                </div>
                <div className="team-back">
                  <h4>Павел Казанцев</h4>
                  <div className="team-role">Тренер</div>
                  <div className="team-back-content">
                    <p>
                      <strong>Компетенции:</strong> Профессиональный педагог,
                      тренер КППТ.
                    </p>
                    <p>
                      <strong>Чем помогает:</strong> Активно участвует в
                      тренингах, умеет разрядить обстановку, находит подход даже
                      к самым закрытым подросткам.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 6. Обычная */}
          <Reveal delay={0.6}>
            <div className="team-card-wrapper">
              <div
                className={`team-card-inner ${flippedIndex === 5 ? " is-flipped" : ""}`}
                onClick={() => toggleFlip(5)}
              >
                <div className="team-front">
                  <img
                    src="/team/luda.jpeg"
                    alt="Людмила Солодовник"
                    className="team-avatar"
                  />
                  <h4>Людмила Солодовник</h4>
                  <div className="team-role">Песочный терапевт</div>
                  <p className="team-short-phrase">
                    Специалист по песочной терапии.
                  </p>
                  <div className="more-icon">
                    <span className="desktop-icon">↗</span>
                    <span className="mobile-text">Подробнее</span>
                  </div>
                </div>
                <div className="team-back">
                  <h4>Людмила Солодовник</h4>
                  <div className="team-role">Песочный терапевт</div>
                  <div className="team-back-content">
                    <p>
                      <strong>Компетенции:</strong> Полностью обучена КППТ и
                      ТОВД. Сертифицированный песочный терапевт.
                    </p>
                    <p>
                      <strong>Чем помогает:</strong> Работает с глубокими
                      травмами через игру и песок, помогая выразить невыразимое.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 7. Обычная */}
          <Reveal delay={0.7}>
            <div className="team-card-wrapper">
              <div
                className={`team-card-inner ${flippedIndex === 6 ? " is-flipped" : ""}`}
                onClick={() => toggleFlip(6)}
              >
                <div className="team-front">
                  <img
                    src="/team/lina.jpeg"
                    alt="Эвелина Литвинова"
                    className="team-avatar"
                  />
                  <h4>Эвелина Литвинова</h4>
                  <div className="team-role">Педагог</div>
                  <p className="team-short-phrase">
                    Твёрдый характер и большое сердце.
                  </p>
                  <div className="more-icon">
                    <span className="desktop-icon">↗</span>
                    <span className="mobile-text">Подробнее</span>
                  </div>
                </div>
                <div className="team-back">
                  <h4>Эвелина Литвинова</h4>
                  <div className="team-role">Педагог</div>
                  <div className="team-back-content">
                    <p>
                      <strong>Опыт:</strong> Педагог, регулярно работает с
                      особенными детьми.
                    </p>
                    <p>
                      <strong>Чем помогает:</strong> Создаёт стабильную,
                      безопасную атмосферу, в которой дети чувствуют чёткие
                      границы и настоящую любовь.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 8. Call to action */}
          <Reveal delay={0.8}>
            <a
              href="/#contact"
              className="team-card-wrapper"
              style={{ display: "block", textDecoration: "none" }}
            >
              <div className="team-card-inner join-card">
                <div
                  className="team-front"
                  style={{ background: "transparent" }}
                >
                  <div
                    className="team-avatar"
                    style={{ background: "transparent", fontSize: "4rem" }}
                  >
                    🫶
                  </div>
                  <h4 style={{ color: "var(--purple)" }}>Стать наставником</h4>
                  <div className="team-role">Присоединяйтесь</div>
                  <p className="team-short-phrase">
                    Мы всегда рады новым людям с открытым сердцем.
                  </p>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
