import { Reveal } from '../components/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Play } from 'lucide-react';

export function SvyazPage() {
  useDocumentTitle('Площадка «Связь»');
  return (
    <div className="pt-24 min-h-screen bg-[var(--bg)]">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 md:px-[5%] py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <img src="/icons/svyaz.png" alt="Связь" className="w-16 h-16 mix-blend-multiply" />
                <h1 className="text-4xl md:text-6xl font-display font-bold text-[var(--text)] uppercase tracking-tight">СВЯЗЬ</h1>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl md:text-4xl font-serif italic text-[var(--purple)] mb-8 font-medium">
                На связи от сердца к сердцу
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-[var(--mist)] p-12 rounded-xl border-l-4 border-[var(--pink-deep)] shadow-sm">
                <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-[var(--text)]">Наша цель</h3>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                  Помочь детям-сиротам осуществить <strong>Божественный план</strong> в их судьбе. Наша площадка помогает приемным семьям и детям обрести навыки общения и саморегуляции после пережитых травм.
                </p>
              </div>
            </Reveal>
          </div>
          
          <Reveal type="right" delay={0.3}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
              <img src="/площадка связь.jpg" alt="Команда площадки Связь" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. ТРИ ОСНОВЫ ТОВД (ПИРАМИДА) */}
      <section className="bg-white py-24 px-4 md:px-[5%] border-y border-[var(--mist)] w-full">
        <div className="w-full">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--text)]">Три основы ТОВД</h2>
              <p className="text-[var(--text-muted)] mt-4 text-xl font-serif italic">Терапия, основанная на взаимоотношениях доверия</p>
            </div>
          </Reveal>

          <div className="flex flex-col-reverse md:flex-row gap-16 items-center justify-center">
            {/* Текстовое описание */}
            <div className="flex-1 space-y-12 max-w-xl">
              <Reveal delay={0.1} type="left">
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-[#c6d7b9] shadow-sm flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">1</div>
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-widest mb-3 text-[#7c9769]">Эмоциональная связь</h3>
                    <p className="text-[var(--text-muted)] text-lg leading-relaxed font-serif">Сосредоточенность на построении доверия и ощущения безопасности.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} type="left">
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-[#e8a885] shadow-sm flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">2</div>
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-widest mb-3 text-[#c77242]">Подкрепление</h3>
                    <p className="text-[var(--text-muted)] text-lg leading-relaxed font-serif">Подготовка тела и окружающей среды ребенка к успеху.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3} type="left">
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-[#9d9cb3] shadow-sm flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">3</div>
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-widest mb-3 text-[#686782]">Коррекция</h3>
                    <p className="text-[var(--text-muted)] text-lg leading-relaxed font-serif">Устранение поведения, основанного на страхе.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Визуальная пирамида */}
            <Reveal type="right" delay={0.4} className="flex-1 w-full flex justify-center py-10">
               <div className="relative w-full max-w-[400px] aspect-square flex flex-col justify-end items-center gap-1">
                  {/* Top Triangle */}
                  <div 
                    className="w-[60%] h-[35%] bg-[#9d9cb3] flex items-end justify-center pb-4 transition-transform hover:-translate-y-2 cursor-pointer shadow-sm"
                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                  >
                    <span className="text-white font-bold tracking-widest uppercase text-sm sm:text-base drop-shadow-md">Коррекция</span>
                  </div>
                  {/* Middle Trapezoid */}
                  <div 
                    className="w-[80%] h-[25%] bg-[#e8a885] flex items-center justify-center transition-transform hover:-translate-y-1 hover:scale-105 cursor-pointer shadow-sm"
                    style={{ clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)' }}
                  >
                    <span className="text-white font-bold tracking-widest uppercase text-base sm:text-lg drop-shadow-md">Подкрепление</span>
                  </div>
                  {/* Bottom Trapezoid */}
                  <div 
                    className="w-full h-[25%] bg-[#c6d7b9] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                    style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }}
                  >
                    <span className="text-[#3a502a] font-bold tracking-widest uppercase text-lg sm:text-xl drop-shadow-sm">Эмоциональная связь</span>
                  </div>
               </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. ВЕРНУТЬ ГОЛОС */}
      <section className="bg-[#b4e6e6] py-24 px-4 md:px-[5%] overflow-hidden relative w-full">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20" style={{ backgroundImage: 'radial-gradient(#1b4b6b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1">
             <Reveal>
               <h2 className="text-5xl md:text-7xl font-display font-bold text-[#0c3c3c] mb-12 uppercase tracking-tighter">Вернуть голос</h2>
             </Reveal>
             <Reveal delay={0.1}>
               <div className="bg-[#1b4b6b] text-white px-8 py-5 rounded-xl mb-8 shadow-lg inline-block transform -rotate-1">
                 <h3 className="text-xl font-bold font-display uppercase tracking-wider">Что такое потеря голоса?</h3>
               </div>
               <p className="text-xl text-[#113a3a] mb-16 pl-8 border-l-4 border-[#1b4b6b] leading-relaxed font-serif">
                 Это состояние, когда ребенок перестает выражать свои чувства и потребности, не обращается за помощью к взрослому. Травмы детства, такие как потеря взрослого и пренебрежение, приводят к этому.
               </p>
             </Reveal>
             
             <Reveal delay={0.2}>
               <div className="bg-[#1b4b6b] text-white px-8 py-5 rounded-xl mb-8 shadow-lg inline-block transform rotate-1">
                 <h3 className="text-xl font-bold font-display uppercase tracking-wider">Восстановление голоса</h3>
               </div>
               <p className="text-xl text-[#113a3a] pl-8 border-l-4 border-[#1b4b6b] leading-relaxed font-serif">
                 Обучение на площадке помогает детям вернуть голос. Родители учатся создавать условия, где ребенок заново обретает доверие и уверенность.
               </p>
             </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal type="right">
              {/* VIDEO PLACEHOLDER */}
              <div className="relative w-full aspect-video bg-[#0c3c3c] rounded-xl overflow-hidden shadow-2xl group cursor-pointer border-[6px] border-white/40 hover:border-white transition-all duration-500">
                <img src="/загородные домики.jpg" alt="Video placeholder" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[var(--pink)] group-hover:scale-110 transition-all duration-300 shadow-xl border border-white/30">
                    <Play size={48} className="text-white fill-white ml-2" />
                  </div>
                  <div className="mt-6 text-white text-2xl font-bold drop-shadow-md">Смотреть презентацию</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. РАБОТА СО СТРАХАМИ И ДОВЕРИЕМ */}
      <section className="py-24 px-4 md:px-[5%] bg-gradient-to-b from-[var(--bg)] to-white w-full">
        <div className="w-full">
          <Reveal>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-20 text-[var(--text)]">
               Влияние площадки <em>«СВЯЗЬ»</em>
             </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <Reveal type="left">
              <div className="bg-[#fde2db] p-16 rounded-xl h-full shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold uppercase mb-8 text-[#8b3d2b] flex items-center gap-4 tracking-wider">
                  <span className="w-12 h-12 rounded-lg bg-[#8b3d2b] text-white flex items-center justify-center text-xl shrink-0">❤</span>
                  Эмоциональная поддержка
                </h3>
                <p className="text-xl text-[#5a2417] leading-relaxed font-serif">
                  На площадке создается атмосфера, где дети чувствуют себя в безопасности. Это важно для развития эмоционального интеллекта и укрепления привязанностей.
                </p>
              </div>
            </Reveal>
            <Reveal type="right">
              <div className="bg-[#f8e5d3] p-16 rounded-xl h-full shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold uppercase mb-8 text-[#925f38] flex items-center gap-4 tracking-wider">
                  <span className="w-12 h-12 rounded-lg bg-[#925f38] text-white flex items-center justify-center text-xl shrink-0">🤝</span>
                  Развитие доверия
                </h3>
                <p className="text-xl text-[#613e22] leading-relaxed font-serif">
                  Доверие между родителями и детьми усиливается через совместные мероприятия. Тренеры и волонтеры помогают в выстраивании прочных и теплых отношений.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="bg-[var(--mist)] p-16 md:p-24 rounded-xl border-2 border-[var(--brand-green-l)] relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-green-l)] opacity-20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--gold-l)] opacity-20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
              
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-16 relative z-10 text-[var(--text)]">Преодоление поведения, основанного на страхе</h3>
              
              <div className="space-y-16 relative z-10">
                <div className="flex gap-8 items-start group">
                  <div className="w-16 h-16 rounded-xl bg-[var(--brand-green)] text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">1</div>
                  <div>
                    <h4 className="text-3xl font-display font-bold mb-4 text-[var(--text)] uppercase tracking-wider">Идентификация страхов</h4>
                    <p className="text-[var(--text-muted)] text-xl leading-relaxed font-serif">На первой стадии определяются основные страхи, которые мешают ребенку развивать доверительные отношения.</p>
                  </div>
                </div>
                
                <div className="flex gap-8 items-start group">
                  <div className="w-16 h-16 rounded-xl bg-[var(--gold)] text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">2</div>
                  <div>
                    <h4 className="text-3xl font-display font-bold mb-4 text-[var(--text)] uppercase tracking-wider">Предоставление инструментов</h4>
                    <p className="text-[var(--text-muted)] text-xl leading-relaxed font-serif">Детям предлагаются методики саморегуляции и эмоционального контроля, чтобы бороться с препятствиями страха.</p>
                  </div>
                </div>

                <div className="flex gap-8 items-start group">
                  <div className="w-16 h-16 rounded-xl bg-[var(--pink-deep)] text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">3</div>
                  <div>
                    <h4 className="text-3xl font-display font-bold mb-4 text-[var(--text)] uppercase tracking-wider">Закрепление навыков</h4>
                    <p className="text-[var(--text-muted)] text-xl leading-relaxed font-serif">Заключительный этап предусматривает интеграцию новых навыков в повседневную жизнь, стимулируя личностное развитие.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. ПОДДЕРЖКА */}
      <section className="bg-[var(--purple)] text-white py-24 px-4 md:px-[5%] text-center relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <Reveal>
            <p className="text-2xl md:text-4xl font-serif italic font-medium mb-12 opacity-90 leading-relaxed text-balance">
              «Истинная духовность, чистая в глазах нашего Бога заключается в том, чтобы изменить жизнь сирот и вдов в их бедах и отказаться от развращения мирскими ценностями».
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="/#donate" className="inline-block bg-white text-[var(--purple)] font-bold uppercase tracking-widest px-12 py-6 rounded-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Поддержать площадку
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
