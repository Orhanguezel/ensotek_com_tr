'use client';

import dynamic from 'next/dynamic';

const ScrollToTop = dynamic(() => import('./ScrollToTop').then((m) => m.ScrollToTop), { ssr: false });
const WhatsAppFloating = dynamic(
  () => import('@/components/widgets/WhatsAppFloating').then((m) => m.WhatsAppFloating),
  { ssr: false },
);

type Props = {
  whatsappNumber?: string;
  whatsappMessage?: string;
};

export function ClientShell({ whatsappNumber, whatsappMessage }: Props) {
  return (
    <>
      <WhatsAppFloating number={whatsappNumber} message={whatsappMessage} />
      <ScrollToTop />
    </>
  );
}
