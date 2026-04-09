'use client';

import dynamic from 'next/dynamic';

const ScrollToTop = dynamic(() => import('./ScrollToTop').then((m) => m.ScrollToTop), { ssr: false });

export function ClientShell() {
  return (
    <>
      <ScrollToTop />
    </>
  );
}
