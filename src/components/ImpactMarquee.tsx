import React from 'react';
import { HeartHandshake, Globe, Layers, Languages } from 'lucide-react';

export function ImpactMarquee() {
  const marqueeItems = [
    { num: "15+", label: "ЛЕТ ОПЫТА", icon: HeartHandshake },
    { num: "59", label: "СТРАН", icon: Globe },
    { num: "9", label: "ТРЕНИНГОВЫХ МОДУЛЕЙ", icon: Layers },
    { num: "7", label: "ЯЗЫКОВ ПЕРЕВОДА ПРОГРАММЫ", icon: Languages },
  ];

  // Дублируем элементы, они понадобятся только для мобильной бегущей строки
  const infiniteItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="bg-[#683292] text-white border-t border-white/10 w-full relative z-30 shadow-xl overflow-hidden py-3 md:py-4">
      
      {/* Умные стили: гибридное поведение в зависимости от экрана */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes mobileMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); } 
        }
        
        .smart-marquee {
          display: flex;
          width: max-content;
          animation: mobileMarquee 20s linear infinite;
        }
        
        .smart-marquee:hover {
          animation-play-state: paused;
        }

        /* МАГИЯ АДАПТИВА: Начиная с планшетов (768px) выключаем строку и центрируем */
        @media (min-width: 768px) {
          .smart-marquee {
            width: 100%;
            animation: none;
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}} />

      {/* Контейнер сам расставит отступы (gap) между элементами в зависимости от экрана */}
      <div className="smart-marquee items-center gap-6 md:gap-12 lg:gap-16 px-4">
        {infiniteItems.map((item, i) => {
          const Icon = item.icon;
          
          // Проверяем, является ли текущий элемент оригиналом или дубликатом
          const isDuplicate = i >= marqueeItems.length;
          
          // Логика отображения декоративных точек
          let dotClass = "w-1.5 h-1.5 rounded-full bg-[#f3eee7]/30 shrink-0 ";
          if (isDuplicate || i === marqueeItems.length - 1) {
            dotClass += "block md:hidden"; // Оставляем только на мобилках
          } else {
            dotClass += "block md:hidden lg:block"; // Показываем на мобилках и больших ПК
          }

          return (
            <React.Fragment key={i}>
              {/* Сам блок информации. Класс md:hidden скроет все дубликаты на десктопе */}
              <div 
                className={`flex items-center gap-2 md:gap-3 shrink-0 cursor-default ${isDuplicate ? 'md:hidden' : ''}`}
              >
                <Icon 
                  size={20} 
                  className="text-[#f3eee7] opacity-80 md:w-6 md:h-6 transition-transform duration-300 hover:scale-110" 
                  strokeWidth={1.5} 
                  aria-hidden="true"
                />
                <strong className="text-lg md:text-2xl font-bold font-display tracking-tight drop-shadow-sm whitespace-nowrap">
                  {item.num}
                </strong>
                <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 whitespace-nowrap">
                  {item.label}
                </span>
              </div>

              {/* Точка-разделитель */}
              <div className={dotClass}></div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}