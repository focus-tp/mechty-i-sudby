import React from 'react';
import { HeartHandshake, Globe, Users, GraduationCap } from 'lucide-react';
import { Reveal } from './Reveal';

const facts = [
  { icon: HeartHandshake, num: '15+', label: 'лет рядом с семьями', color: '#c9547a' },
  { icon: Users,          num: '500+', label: 'семей прошли через помощь', color: '#9b6bc0' },
  { icon: Globe,          num: '59',   label: 'стран применяют КППТ', color: '#d89f5b' },
  { icon: GraduationCap,  num: '3',    label: 'города присутствия', color: '#6b3fa0' },
];

export function MissionStrip() {
  return (
    <section className="mission-strip" aria-label="Наши ключевые показатели">
      <div className="mission-strip-inner">
        {facts.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={i} delay={i * 0.07}>
              <div className="mission-fact" style={{ '--fact-color': f.color } as React.CSSProperties}>
                <div className="mission-fact-icon">
                  <Icon size={20} strokeWidth={1.5} style={{ color: f.color }} />
                </div>
                <div className="mission-fact-text">
                  <strong>{f.num}</strong>
                  <span>{f.label}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
