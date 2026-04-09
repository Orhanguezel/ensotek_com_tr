import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="footer-et">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="footer-top-et">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-9 border border-(--cyan) flex items-center justify-center">
                <span className="text-(--cyan) font-bold text-sm font-[family-name:var(--font-display)]">E</span>
              </div>
              <div className="leading-none">
                <span className="block text-sm font-bold tracking-[3px] text-(--white) uppercase font-[family-name:var(--font-display)]">ENSOTEK</span>
                <span className="block text-xs tracking-[2px] text-(--cyan) uppercase font-[family-name:var(--font-display)]">Cooling Systems</span>
              </div>
            </div>
            <p className="text-sm text-(--mist) leading-relaxed max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-(--cyan) mb-4 font-[family-name:var(--font-display)]">{t('products')}</h3>
            <ul className="space-y-2">
              {['counterflow', 'crossflow', 'closedCircuit', 'industrialFan'].map((item) => (
                <li key={item}>
                  <Link href="/products" locale={locale} className="text-sm text-(--silver) hover:text-(--cyan) transition-colors">
                    {t(`product.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-(--cyan) mb-4 font-[family-name:var(--font-display)]">{t('company')}</h3>
            <ul className="space-y-2">
              <li><Link href="/gallery" locale={locale} className="text-sm text-(--silver) hover:text-(--cyan) transition-colors">{t('gallery')}</Link></li>
              <li><Link href="/references" locale={locale} className="text-sm text-(--silver) hover:text-(--cyan) transition-colors">{t('references')}</Link></li>
              <li><Link href="/contact" locale={locale} className="text-sm text-(--silver) hover:text-(--cyan) transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-(--cyan) mb-4 font-[family-name:var(--font-display)]">{t('contactTitle')}</h3>
            <ul className="space-y-3 text-sm text-(--silver)">
              <li>{t('address')}</li>
              <li>
                <a href={`tel:${t('phone')}`} className="hover:text-(--cyan) transition-colors">{t('phone')}</a>
              </li>
              <li>
                <a href={`mailto:${t('email')}`} className="hover:text-(--cyan) transition-colors">{t('email')}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-et">
          <p className="text-xs text-(--silver)">
            © {year} Ensotek. {t('rights')}
          </p>
          <p className="text-xs text-(--silver)">{t('certification')}</p>
        </div>
      </div>
    </footer>
  );
}
