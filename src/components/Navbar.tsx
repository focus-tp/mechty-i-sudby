import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import { asset } from '../utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const { isHeroVisible } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрываем меню при переходе по роутам
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['about', 'projects', 'letopis', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const getHref = (hash: string) => {
    if (location.pathname === '/' && hash.startsWith('#')) return hash;
    if (hash.startsWith('#')) return `/${hash}`;
    return hash;
  };

  // Тёмный режим: Hero видим + находимся на главной
  const isDark = isHeroVisible && location.pathname === '/';

  const isActive = (path: string) => location.pathname === path;

  const sectionLinkProps = (section: string) => ({
    className: activeSection === section ? 'nav-active' : '',
    'aria-current': activeSection === section ? ('location' as const) : undefined,
  });

  const navClass = [
    scrolled ? 'scrolled' : '',
    'fixed top-0 left-0 right-0 z-50 flex items-center justify-between',
  ].filter(Boolean).join(' ');

  return (
    <nav
      id="mainNav"
      className={navClass}
      role="navigation"
      aria-label="Основная навигация"
    >
      <Link className="nav-logo" to="/" onClick={handleNavClick} aria-label="На главную">
        <img src={asset('/logo.png')} alt="Мечты и судьбы" className="logo-img" />
      </Link>
      
      <ul className={`nav-links ${menuOpen ? 'open' : ''} md:absolute md:left-1/2 md:-translate-x-1/2`}>
        <li><Link to={getHref('#about')} {...sectionLinkProps('about')} onClick={handleNavClick}>О нас</Link></li>
        <li><Link to={getHref('#projects')} {...sectionLinkProps('projects')} onClick={handleNavClick}>Проекты</Link></li>
        <li><Link to={getHref('#letopis')} {...sectionLinkProps('letopis')} onClick={handleNavClick}>Летопись</Link></li>
        <li><Link to="/training" className={isActive('/training') ? 'nav-active' : ''} onClick={handleNavClick}>Тренинг КППТ</Link></li>
        <li><Link to="/svyaz" className={isActive('/svyaz') ? 'nav-active' : ''} onClick={handleNavClick}>Площадка «Связь»</Link></li>
        <li><Link to="/team" className={isActive('/team') ? 'nav-active' : ''} onClick={handleNavClick}>Команда</Link></li>
        <li><Link to={getHref('#contact')} {...sectionLinkProps('contact')} onClick={handleNavClick}>Контакты</Link></li>
        <li className="md:hidden mt-2"><Link to={getHref('#donate')} className="btn-primary w-full justify-center" onClick={handleNavClick}>Поддержать</Link></li>
      </ul>

      <div className="hidden md:flex ml-auto md:ml-0">
        <Link to={getHref('#donate')} className="btn-primary" onClick={handleNavClick}>Поддержать</Link>
      </div>

      <button
        className="mobile-menu-btn md:hidden ml-auto"
        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={menuOpen}
        aria-controls="mainNav"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} color="var(--purple)" /> : <Menu size={28} color="var(--purple)" />}
      </button>
    </nav>
  );
}
