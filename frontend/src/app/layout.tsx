import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { AVAILABLE_LOCALES, FALLBACK_LOCALE } from '@/i18n/locales';
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // next-intl proxy'si istek basligina cozumlenen dili yazar; <html lang> SSR'da dogru dille basilir.
  const requested = (await headers()).get('x-next-intl-locale') ?? '';
  const lang = AVAILABLE_LOCALES.includes(requested) ? requested : FALLBACK_LOCALE;
  return (
    <html
      lang={lang}
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
