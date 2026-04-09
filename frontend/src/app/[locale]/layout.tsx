import type { Metadata } from 'next';
import { Oswald, Playfair_Display, Barlow } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getLocaleMessages, hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { ThemeBootScript } from '@/scripts/theme-boot';
import { THEME_TEMPLATE, THEME_INTENT } from '@/theme/templates';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientShell } from '@/components/layout/ClientShell';
import '@/styles/globals.css';

const fontDisplay = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const fontSerif = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const fontSans = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'Ensotek — Endüstriyel Soğutma Kulesi Sistemleri',
    template: '%s | Ensotek',
  },
  description: 'Counterflow, Crossflow ve Kapalı Devre soğutma kuleleri. ISO 9001 sertifikalı, 25+ yıl deneyim.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  setRequestLocale(locale);

  const messages = getLocaleMessages(locale);

  return (
    <html
      lang={locale}
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
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <ClientShell />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
