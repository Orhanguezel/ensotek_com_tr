'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';

const LOCALES = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ slug?: string | string[] }>();

  function switchLocale(newLocale: Locale) {
    if (newLocale === locale) return;

    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    switch (pathname) {
      case '/blog/[slug]':
        if (!slug) return;
        router.push({ pathname, params: { slug } }, { locale: newLocale });
        return;
      case '/gallery/[slug]':
        if (!slug) return;
        router.push({ pathname, params: { slug } }, { locale: newLocale });
        return;
      case '/products/[slug]':
        if (!slug) return;
        router.push({ pathname, params: { slug } }, { locale: newLocale });
        return;
      default:
        router.push(pathname, { locale: newLocale });
    }
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {LOCALES.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1">
          {i > 0 && <span className="text-(--color-border-strong)">|</span>}
          <button
            onClick={() => switchLocale(l.code)}
            className={cn(
              'text-xs font-medium tracking-wider transition-colors duration-200 uppercase',
              locale === l.code
                ? 'text-(--cyan) font-semibold'
                : 'text-(--mist) hover:text-(--cyan)',
            )}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
