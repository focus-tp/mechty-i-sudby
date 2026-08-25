/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
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
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <LetopisSection />
      <StoriesSection />
      <DonateSection />
      <ContactSection />
    </>
  );
}

export default function App() {
  return (
    <UIProvider>
      <a className="skip-link" href="#main-content">Перейти к основному содержанию</a>
      <SmoothScroll />
      <CustomCursor />
      <ScrollToHash />
      <Navbar />
      <main id="main-content" className="relative">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/svyaz" element={<SvyazPage />} />
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
