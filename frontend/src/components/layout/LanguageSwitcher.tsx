'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const LOCALES = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.push(pathname, { locale: newLocale });
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
