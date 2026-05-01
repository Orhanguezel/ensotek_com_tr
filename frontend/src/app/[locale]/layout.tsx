import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AVAILABLE_LOCALES, FALLBACK_LOCALE, getLocaleMessages, hasLocale } from '@/i18n/locales';
import { fetchActiveLocales } from '@/i18n/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientShell } from '@/components/layout/ClientShell';
import { API_BASE_URL, SITE_URL } from '@/lib/utils';
import type { ContactInfo } from '@/lib/api';

export async function generateStaticParams() {
  const locales = await fetchActiveLocales();
  return locales.map((locale) => ({ locale }));
}

function buildLanguageAlternates(pathname: string): Record<string, string> {
  const path = pathname === '/' ? '' : pathname;
  const map: Record<string, string> = {};
  for (const locale of AVAILABLE_LOCALES) {
    map[locale] = `${SITE_URL}/${locale}${path}`;
  }
  map['x-default'] = `${SITE_URL}/${FALLBACK_LOCALE}${path}`;
  return map;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(locale) ? locale : FALLBACK_LOCALE;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Ensotek — Endüstriyel Soğutma Kulesi Sistemleri',
      template: '%s — Ensotek',
    },
    description: 'Açık devre, kapalı devre ve evaporatif soğutma kuleleri. ISO 9001 sertifikalı, 40+ yıl deneyim. Türkiye\'nin en büyük soğutma kulesi üretim tesisi.',
    alternates: {
      canonical: `${SITE_URL}/${safeLocale}`,
      languages: buildLanguageAlternates('/'),
    },
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
}

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
  const orgSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#org`,
        name: 'Ensotek',
        legalName: 'ENSOTEK Su Soğutma Kuleleri ve Teknolojileri Mühendislik San. Tic. Ltd. Şti.',
        url: SITE_URL,
        logo: `${SITE_URL}/ensotek_icon_512.png`,
        description:
          'Endüstriyel soğutma kuleleri, CTP/FRP kule üretimi, mühendislik, montaj, bakım ve modernizasyon hizmetleri.',
        foundingDate: '1985',
        telephone: contactInfo.phone || '+90 212 613 33 01',
        email: contactInfo.email || 'ensotek@ensotek.com.tr',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            contactInfo.address || 'Oruçreis Mah. Tekstilkent Sit. A17 Blok No:41',
          addressLocality: contactInfo.city || 'Esenler / İstanbul',
          addressCountry: contactInfo.country || 'TR',
        },
        numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50, maxValue: 200 },
        sameAs: [
          'https://www.linkedin.com/company/ensotek-su-so-utma-kuleleri-ltd-ti-/',
          'https://www.youtube.com/@ensotek',
          'https://www.instagram.com/ensotek/',
          'https://www.facebook.com/ensotek',
        ],
        knowsAbout: [
          'Soğutma kulesi',
          'CTP soğutma kulesi',
          'FRP cooling tower',
          'Kapalı devre soğutma',
          'Endüstriyel proses soğutma',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Ensotek Türkiye',
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#org` },
        inLanguage: ['tr', 'en'],
      },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('lang', ${JSON.stringify(locale)});`,
        }}
      />
      <script
        id="jsonld-org-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema).replace(/</g, '\\u003c') }}
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main>{children}</main>
        <Footer contactInfo={contactInfo} />
        <ClientShell
          whatsappNumber={contactInfo.phone_2 || contactInfo.phone}
          whatsappMessage="Merhaba, Ensotek soğutma kulesi çözümleri hakkında bilgi almak istiyorum."
        />
      </NextIntlClientProvider>
    </>
  );
}
