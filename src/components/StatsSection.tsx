import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';


interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
}

const stats: StatItem[] = [
  { value: 15,  suffix: '+', label: 'лет',          sublabel: 'рядом с семьями',          color: 'var(--purple)' },
  { value: 500, suffix: '+', label: 'семей',         sublabel: 'прошли через нашу помощь',  color: 'var(--pink-deep)' },
  { value: 59,  suffix: '',  label: 'стран',         sublabel: 'применяют программу КППТ',  color: 'var(--gold)' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="stats-section" aria-label="Наши результаты в цифрах">
      <Reveal>
        <div className="section-label">Наш след</div>
      </Reveal>
      <Reveal>
        <h2 className="section-title">
          15 лет в цифрах — <em>реальный</em> результат
        </h2>
      </Reveal>

      <div className="stats-editorial-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 w-full">
        {stats.map((stat, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="stats-editorial-item relative p-2 flex flex-col items-center text-center transition-all duration-500 group">
              <div className="relative z-10 flex flex-col items-center w-full">
                <div 
                  className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium italic tracking-tight mb-2 group-hover:scale-105 transform origin-center transition-transform duration-500 pb-2"
                  style={{ color: stat.color }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xl md:text-2xl font-bold text-[var(--text)] mb-1">{stat.label}</div>
                <div className="text-sm text-[var(--text-muted)] leading-relaxed">{stat.sublabel}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
