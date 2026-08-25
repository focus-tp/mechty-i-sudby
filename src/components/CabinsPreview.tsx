import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { ButterflySVG } from './Decorations';

export function CabinsPreview() {
  return (
    <section className="cabins-preview relative" style={{ backgroundColor: 'var(--cream)', padding: '80px 5%', overflow: 'hidden' }}>
      <ButterflySVG className="absolute text-purple-300/20 w-40 h-40" style={{ top: '5%', right: '-5%', transform: 'rotate(-45deg)' }} />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <Reveal type="left" className="flex-1">
          <div className="section-label">Отдых и восстановление</div>
          <h2 className="section-title text-left">Домики для<br/><em>приёмных семей</em></h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Три уютных скандинавских домика со всеми удобствами — место, где можно отдохнуть, зарядиться и побыть собой в тишине на природе.
          </p>
          <Link to="/domiki" className="btn-primary inline-flex">
            <span>Подробнее о домиках &rarr;</span>
          </Link>
        </Reveal>

        <Reveal type="right" className="flex-1 w-full">
          <div className="torn-edge relative aspect-[4/3] overflow-hidden shadow-2xl bg-gray-200">
            {/* Placeholder for photo */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
              Место для фото
            </div>
            {/* Optional decorative element */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/50 to-pink-100/50 mix-blend-overlay"></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
