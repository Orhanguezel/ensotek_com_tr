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
import { API_BASE_URL } from '@/lib/utils';
import type { ContactInfo } from '@/lib/api';
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
  description: 'Açık devre, kapalı devre ve evaporatif soğutma kuleleri. ISO 9001 sertifikalı, 39+ yıl deneyim. Türkiye\'nin en büyük soğutma kulesi üretim tesisi.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/ensotek_icon_192.png', sizes: '192x192', type: 'image/png' },
      { url: '/ensotek_icon_512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon', url: '/ensotek-apple-icon-512.png' },
    ],
  },
};

async function fetchContactInfo(locale: string): Promise<ContactInfo> {
  try {
    const res = await fetch(`${API_BASE_URL}/site_settings/contact_info?locale=${locale}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return {};
    const dto = await res.json();
    const raw = dto?.value;
    return (typeof raw === 'string' ? JSON.parse(raw) : raw) ?? {};
  } catch {
    return {};
  }
}

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

  const [messages, contactInfo] = await Promise.all([
    Promise.resolve(getLocaleMessages(locale)),
    fetchContactInfo(locale),
  ]);

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
          <Footer contactInfo={contactInfo} />
          <ClientShell />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
