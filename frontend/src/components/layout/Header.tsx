'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { key: 'about', href: '#about' },
  { key: 'howItWorks', href: '#how' },
  { key: 'types', href: '#types' },
  { key: 'products', href: '/products' },
  { key: 'gallery', href: '/gallery' },
  { key: 'references', href: '/references' },
  { key: 'contact', href: '/contact' },
];

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'header-shell-scrolled' : 'bg-transparent',
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" locale={locale} className="flex items-center gap-3 group">
            <div className="relative size-9 border border-(--cyan) flex items-center justify-center">
              <span
                className="absolute inset-1 bg-(--cyan) opacity-20 group-hover:opacity-30 transition-opacity"
                aria-hidden="true"
              />
              <span className="text-(--cyan) font-bold text-sm font-[family-name:var(--font-display)]">E</span>
            </div>
            <div className="leading-none">
              <span className="block text-sm font-bold tracking-[3px] text-(--white) uppercase font-[family-name:var(--font-display)]">
                ENSOTEK
              </span>
              <span className="block text-xs tracking-[2px] text-(--cyan) uppercase font-[family-name:var(--font-display)]">
                Cooling
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-xs tracking-wider text-(--mist) hover:text-(--cyan) transition-colors uppercase font-medium"
                >
                  {t(link.key)}
                </a>
              ) : (
                <Link
                  key={link.key}
                  href={link.href}
                  locale={locale}
                  className="text-xs tracking-wider text-(--mist) hover:text-(--cyan) transition-colors uppercase font-medium"
                >
                  {t(link.key)}
                </Link>
              )
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher className="hidden lg:flex" />
            <Link
              href="/contact"
              locale={locale}
              className="hidden lg:inline-flex btn-fill text-xs py-2.5 px-5"
            >
              {t('contactCta')}
            </Link>
            <button
              className="lg:hidden p-2 text-(--mist) hover:text-(--cyan) transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-(--deep) border-t border-(--color-border)">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-wider text-(--mist) hover:text-(--cyan) transition-colors uppercase py-2"
                >
                  {t(link.key)}
                </a>
              ) : (
                <Link
                  key={link.key}
                  href={link.href}
                  locale={locale}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-wider text-(--mist) hover:text-(--cyan) transition-colors uppercase py-2"
                >
                  {t(link.key)}
                </Link>
              )
            ))}
            <div className="pt-4 border-t border-(--color-border) flex items-center justify-between">
              <LanguageSwitcher />
              <Link href="/contact" locale={locale} className="btn-fill text-xs py-2 px-4" onClick={() => setMobileOpen(false)}>
                {t('contactCta')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
