'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-8 right-8 z-50 size-10 border border-(--cyan) bg-(--deep)',
        'flex items-center justify-center text-(--cyan) hover:bg-(--cyan) hover:text-(--void)',
        'transition-all duration-300',
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp size={18} />
    </button>
  );
}
