import { CabinsSection } from '../components/CabinsSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function CabinsPage() {
  useDocumentTitle('Домики для семей');
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--cream)' }}>
      <CabinsSection />
    </div>
  );
}
