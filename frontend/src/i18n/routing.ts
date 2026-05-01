import { defineRouting } from 'next-intl/routing';
import { AVAILABLE_LOCALES, FALLBACK_LOCALE } from './locales';

export const routing = defineRouting({
  locales: AVAILABLE_LOCALES as [string, ...string[]],
  defaultLocale: FALLBACK_LOCALE,
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': {
      tr: '/kurumsal',
      en: '/about',
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': {
      tr: '/iletisim',
      en: '/contact',
    },
    '/gallery': {
      tr: '/galeri',
      en: '/gallery',
    },
    '/gallery/[slug]': {
      tr: '/galeri/[slug]',
      en: '/gallery/[slug]',
    },
    '/products': {
      tr: '/urunler',
      en: '/products',
    },
    '/products/[slug]': {
      tr: '/urunler/[slug]',
      en: '/products/[slug]',
    },
    '/references': {
      tr: '/referanslar',
      en: '/references',
    },
    '/hesap-makinesi': {
      tr: '/hesap-makinesi',
      en: '/capacity-calculator',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
