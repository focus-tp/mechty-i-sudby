import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useCompactLayout } from '../hooks/useCompactLayout';

export function ResponsiveDetails({ title, children }: { title: string; children: ReactNode }) {
  const compact = useCompactLayout();
  return compact ? <MobileDisclosure title={title}>{children}</MobileDisclosure> : <>{children}</>;
}

export function MobileDisclosure({ title, hint, anchor, children }: {
  title: string; hint?: string; anchor?: string; children: ReactNode;
}) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const revealTarget = () => {
      if (anchor && window.location.hash === `#${anchor}`) setOpen(true);
    };
    revealTarget();
    window.addEventListener('hashchange', revealTarget);
    return () => window.removeEventListener('hashchange', revealTarget);
  }, [anchor, location.hash]);
  return (
    <details className="mobile-disclosure" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary><span><strong>{title}</strong>{hint && <small>{hint}</small>}</span><span className="mobile-disclosure__sign" aria-hidden="true">+</span></summary>
      <div className="mobile-disclosure__body">{children}</div>
    </details>
  );
}
