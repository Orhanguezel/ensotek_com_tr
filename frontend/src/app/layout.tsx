import type { Metadata } from 'next';
import { ThemeBootScript } from '@/scripts/theme-boot';
import { THEME_TEMPLATE, THEME_INTENT } from '@/theme/templates';
import { SITE_URL } from '@/lib/utils';
import '@/styles/globals.css';

const fontDisplay = { variable: 'font-display' };
const fontSerif = { variable: 'font-serif' };
const fontSans = { variable: 'font-sans' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ensotek — Endüstriyel Soğutma Kuleleri',
    template: '%s — Ensotek',
  },
  description: 'Ensotek — Counterflow, Crossflow ve Kapalı Devre Soğutma Kulesi Sistemleri.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      data-theme-mode="dark"
      data-theme-preset="default"
      data-theme-template={THEME_TEMPLATE}
      data-theme-intent={THEME_INTENT}
      className={`${fontDisplay.variable} ${fontSerif.variable} ${fontSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeBootScript />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
