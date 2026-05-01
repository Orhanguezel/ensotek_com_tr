'use client';

import { useState, useEffect, type ComponentProps } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeModeSwitcher } from './ThemeModeSwitcher';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { CatalogModal } from './CatalogModal';

type NavLink = {
  key: string;
  href: ComponentProps<typeof Link>['href'];
};

const NAV_LINKS = [
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'blog', href: '/blog' },
  { key: 'gallery', href: '/gallery' },
  { key: 'references', href: '/references' },
  { key: 'contact', href: '/contact' },
] satisfies NavLink[];

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const desktopNavLinks = NAV_LINKS.filter((link) => link.key !== 'contact');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const closeMobile = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'header-shell-scrolled' : 'bg-transparent',
        )}
      >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-stretch justify-between">
          {/* Logo */}
          <Link
            href="/"
            locale={locale}
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex h-full w-[150px] shrink-0 items-center sm:w-[180px] lg:w-[250px]"
          >
            <Image
              src="/ensotek_icon_512.png"
              alt="Ensotek"
              width={381}
              height={119}
              className="h-auto w-full object-contain object-left"
              sizes="(min-width: 1024px) 250px, 210px"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden flex-1 items-center justify-center gap-6 px-6 xl:gap-8 lg:flex">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                locale={locale}
                className="text-xs tracking-wider text-(--mist) hover:text-(--cyan) transition-colors uppercase font-medium"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center">
            <div className="hidden items-center gap-4 lg:flex lg:gap-5">
              <ThemeModeSwitcher className="inline-flex" />
              <LanguageSwitcher className="flex" />
              <Link
                href="/contact"
                locale={locale}
                className="btn-fill text-xs py-2.5 px-5"
              >
                {t('contactCta')}
              </Link>
              <button
                type="button"
                onClick={() => setCatalogOpen(true)}
                className="btn-ghost text-xs py-2.5 px-5"
              >
                {t('catalogCta')}
              </button>
            </div>
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
              <Link
                key={link.key}
                href={link.href}
                locale={locale}
                onClick={closeMobile}
                className="text-sm tracking-wider text-(--mist) hover:text-(--cyan) transition-colors uppercase py-2"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-4 border-t border-(--color-border) flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ThemeModeSwitcher />
                <LanguageSwitcher />
              </div>
              <Link href="/contact" locale={locale} className="btn-fill text-xs py-2 px-4" onClick={() => setMobileOpen(false)}>
                {t('contactCta')}
              </Link>
              <button
                type="button"
                className="btn-ghost text-xs py-2 px-4"
                onClick={() => {
                  setMobileOpen(false);
                  setCatalogOpen(true);
                }}
              >
                {t('catalogCta')}
              </button>
            </div>
          </nav>
        </div>
      )}
      </header>
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} locale={locale} />
    </>
  );
}
