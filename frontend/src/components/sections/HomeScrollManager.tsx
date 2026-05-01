'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/i18n/navigation';
import { installNavbarHeightObserver, scrollToSection } from '@/shared/scroll/scroll';

export function HomeScrollManager() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const section = searchParams.get('section');
  const didInitialScroll = useRef(false);

  useEffect(() => {
    const cleanup = installNavbarHeightObserver();
    return () => cleanup();
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.substring(1);
      const anchors: Record<string, string> = { 'about': 'about', 'how': 'how', 'types': 'types' };
      if (hash && anchors[hash]) {
        // Redirect to search param version
        const url = new URL(window.location.href);
        url.searchParams.set('section', anchors[hash]);
        url.hash = '';
        window.history.replaceState({}, '', url.toString());
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const pathMapping: Record<string, string> = {
      '/about': 'about',
      '/how-it-works': 'how',
      '/tower-types': 'types',
    };

    const targetSection = section || pathMapping[pathname];

    if (targetSection) {
      const timer = setTimeout(() => {
        scrollToSection(targetSection);
        
        if (section) {
          const cleanPath = window.location.pathname;
          window.history.replaceState({}, '', cleanPath);
        }
      }, didInitialScroll.current ? 100 : 800);
      
      didInitialScroll.current = true;
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [section, pathname]);

  return null;
}
