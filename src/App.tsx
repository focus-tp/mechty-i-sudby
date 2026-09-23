/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense, useState } from 'react';
import Lenis from 'lenis';
import { UIProvider } from './context/UIContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LetopisSection } from './components/LetopisSection';
import { ProjectsSection } from './components/ProjectsSection';
import { DonateSection } from './components/DonateSection';
import { Footer, ModalsAndToasts } from './components/FooterAndModals';
import { CustomCursor } from './components/CustomCursor';
import { useDocumentTitle } from './hooks/useDocumentTitle';

import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ImpactSection } from './components/ImpactSection';
import { StoriesSection } from './components/StoriesSection';
import { LegalPage } from './pages/LegalPage';

// Ленивая загрузка — страницы загружаются только при переходе на них
// Уменьшает инициальный JS-бандл и ускоряет первую загрузку
const SvyazPage = lazy(() => import('./pages/SvyazPage').then(m => ({ default: m.SvyazPage })));
const CabinsPage = lazy(() => import('./pages/CabinsPage').then(m => ({ default: m.CabinsPage })));
const TrainingPage = lazy(() => import('./pages/TrainingPage').then(m => ({ default: m.TrainingPage })));
const TeamPage = lazy(() => import('./pages/TeamPage').then(m => ({ default: m.TeamPage })));

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return null;
}

/** Заглушка пока lazy-страницы подгружаются */
function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: 40, height: 40, border: '3px solid var(--purple)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}

function HomePage() {
  useDocumentTitle(); // устанавливает title для главной страницы
  return (
    <div className="warm-editorial-home">
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <LetopisSection />
      <StoriesSection />
      <ImpactSection />
      <DonateSection />
      <ContactSection />
    </div>
  );
}

function ChapterRail() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids = ['about', 'projects', 'letopis', 'stories', 'donate', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-38% 0px -50% 0px', threshold: [0, 0.1, 0.35] });
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  if (location.pathname !== '/') return null;
  const links = [
    ['about', 'О служении'], ['projects', 'Помощь семьям'], ['letopis', 'Летопись'],
    ['stories', 'Истории'], ['donate', 'Поддержать'], ['contact', 'Контакты'],
  ];
  return (
    <nav className="chapter-rail" aria-label="Разделы страницы">
      {links.map(([id, label], index) => (
        <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : ''} aria-current={activeSection === id ? 'location' : undefined}>
          {String(index + 1).padStart(2, '0')} <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function MobileHelpCta() {
  const location = useLocation();
  if (location.pathname !== '/') return null;
  return <a className="mobile-help-cta" href="#contact">Получить поддержку</a>;
}

export default function App() {
  return (
    <UIProvider>
      <a className="skip-link" href="#main-content">Перейти к основному содержанию</a>
      <SmoothScroll />
      <CustomCursor />
      <ScrollToHash />
      <Navbar />
      <ChapterRail />
      <MobileHelpCta />
      <main id="main-content" className="relative">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/svyaz" element={<SvyazPage />} />
            <Route path="/domiki" element={<CabinsPage />} />
            <Route path="/cabins" element={<CabinsPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="/consent" element={<LegalPage kind="consent" />} />
            <Route path="/offer" element={<LegalPage kind="offer" />} />
            <Route path="/recurring" element={<LegalPage kind="recurring" />} />
            <Route path="/legal" element={<LegalPage kind="legal" />} />
            <Route path="/reports" element={<LegalPage kind="reports" />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ModalsAndToasts />
    </UIProvider>
  );
}
