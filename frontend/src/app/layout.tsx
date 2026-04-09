import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ensotek — Endüstriyel Soğutma Kuleleri',
    template: '%s | Ensotek',
  },
  description: 'Ensotek — Counterflow, Crossflow ve Kapalı Devre Soğutma Kulesi Sistemleri.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
