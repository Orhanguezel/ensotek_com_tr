import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import type { ContactInfo } from '@/lib/api';

interface Props {
  contactInfo?: ContactInfo;
}

export function Footer({ contactInfo }: Props) {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const address = contactInfo?.address ?? t('address');
  const phone   = contactInfo?.phone   ?? t('phone');
  const phone2  = contactInfo?.phone_2;
  const email   = contactInfo?.email   ?? t('email');

  return (
    <footer className="footer-et">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="footer-top-et">
          {/* Brand column */}
          <div>
            <div className="mb-6">
              <Link href="/" locale={locale}>
                <Image
                  src="/logo.png"
                  alt="Ensotek"
                  width={160}
                  height={46}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </Link>
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
              <li>{address}</li>
              <li>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-(--cyan) transition-colors">{phone}</a>
                {phone2 && (
                  <> / <a href={`tel:${phone2.replace(/\s/g, '')}`} className="hover:text-(--cyan) transition-colors">{phone2}</a></>
                )}
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-(--cyan) transition-colors">{email}</a>
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
