import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import type { ContactInfo } from '@/lib/api';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ensotek-su-so-utma-kuleleri-ltd-ti-/',
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@ensotek' },
  { label: 'Instagram', href: 'https://www.instagram.com/ensotek/' },
  { label: 'Facebook', href: 'https://www.facebook.com/ensotek' },
];

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
            <div className="mb-4">
              <Link href="/" locale={locale} className="flex w-[210px] items-center lg:w-[250px]">
                <Image
                  src="/ensotek_icon_512.png"
                  alt="Ensotek"
                  width={381}
                  height={119}
                  className="h-auto w-full object-contain object-left"
                  sizes="(min-width: 1024px) 250px, 210px"
                />
              </Link>
            </div>
            <p className="text-sm text-(--color-text-secondary) leading-relaxed max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-(--color-text-primary) mb-4 font-[family-name:var(--font-display)]">{t('products')}</h3>
            <ul className="space-y-2">
              {['counterflow', 'crossflow', 'closedCircuit', 'industrialFan'].map((item) => (
                <li key={item}>
                  <Link href="/products" locale={locale} className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors">
                    {t(`product.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-(--color-text-primary) mb-4 font-[family-name:var(--font-display)]">{t('company')}</h3>
            <ul className="space-y-2">
              <li><Link href="/gallery" locale={locale} className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors">{t('gallery')}</Link></li>
              <li><Link href="/references" locale={locale} className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors">{t('references')}</Link></li>
              <li><Link href="/blog" locale={locale} className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors">{t('blog')}</Link></li>
              <li><Link href="/contact" locale={locale} className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors">{t('contact')}</Link></li>
              <li>
                <a
                  href="https://www.karbonkompozit.com.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
                >
                  {t('groupCompanies')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-(--color-text-primary) mb-4 font-[family-name:var(--font-display)]">{t('contactTitle')}</h3>
            <ul className="space-y-3 text-sm text-(--silver)">
              <li>{address}</li>
              <li>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-(--color-accent) transition-colors">{phone}</a>
                {phone2 && (
                  <> / <a href={`tel:${phone2.replace(/\s/g, '')}`} className="hover:text-(--color-accent) transition-colors">{phone2}</a></>
                )}
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-(--color-accent) transition-colors">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-et">
          <p className="text-xs text-(--silver)">
            © {year} Ensotek. {t('rights')}
          </p>
          <div className="footer-socials-et" aria-label="Ensotek sosyal medya bağlantıları">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ensotek ${social.label}`}
              >
                {social.label}
              </a>
            ))}
          </div>
          <a
            href="https://guezelwebdesign.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-(--color-text-muted) hover:text-(--color-accent) transition-colors"
          >
            GWD | guezelwebdesign.com
          </a>
        </div>
      </div>
    </footer>
  );
}
