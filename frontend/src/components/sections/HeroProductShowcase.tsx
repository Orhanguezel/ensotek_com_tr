import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { publicUrl } from '@/lib/public-seo';
import { SITE_URL, resolvePublicAssetUrl } from '@/lib/utils';
import type { Product } from '@/features/products/products.service';
import styles from './hero-showcase.module.css';

/**
 * Hero'nun sag tarafinda gercek urunlerden mozaik (1 buyuk + 2 kart) ve urun grubu cipleri.
 * Sunucu bileseni; ilk gorsel LCP adayi olarak oncelikli. Urun/marka adi koddan gelmez.
 */

function stripHtmlToText(value?: string | null): string {
  return String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim();
}

type CategoryLike = { name?: string | null; slug?: string | null } | string | null | undefined;
export type ShowcaseProduct = Product & { category?: CategoryLike; alt?: string | null; is_featured?: number | boolean | null };
export type ShowcaseChip = { label: string; href: string };

function categoryName(c: CategoryLike): string {
  if (!c) return '';
  return typeof c === 'string' ? c.trim() : String(c.name ?? '').trim();
}

/** Farkli kategorilerden, one cikanlar once, en fazla `max` urun. */
export function pickShowcaseProducts(products: ShowcaseProduct[], max = 3): ShowcaseProduct[] {
  const usable = products.filter((p) => p && p.title && p.slug && p.image_url);
  const ordered = [
    ...usable.filter((p) => Number(p.is_featured ?? 0) === 1),
    ...usable.filter((p) => Number(p.is_featured ?? 0) !== 1),
  ];
  const picked: ShowcaseProduct[] = [];
  const seen = new Set<string>();
  for (const p of ordered) {
    const key = categoryName(p.category).toLowerCase() || `__${p.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(p);
    if (picked.length >= max) break;
  }
  for (const p of ordered) {
    if (picked.length >= max) break;
    if (!picked.includes(p)) picked.push(p);
  }
  return picked;
}

export function collectCategoryNames(products: ShowcaseProduct[], max = 4): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const p of products) {
    const name = categoryName(p.category);
    if (!name || seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    out.push(name);
    if (out.length >= max) break;
  }
  return out;
}

/** next/image yalnizca yapilandirilmis uzak hostlari optimize eder; digerleri oldugu gibi servis edilir. */
function isOptimizable(src: string): boolean {
  if (src.startsWith('/')) return true;
  try {
    const host = new URL(src).hostname;
    return host === 'res.cloudinary.com' || host === new URL(SITE_URL).hostname || host === new URL(SITE_URL).hostname.replace(/^www\./, '');
  } catch {
    return false;
  }
}

export function localizedPath(locale: string, path: string): string {
  return publicUrl(locale, path).replace(SITE_URL, '') || '/';
}

export function HeroProductShowcase({
  locale,
  products,
  chips,
  labels,
}: {
  locale: string;
  products: ShowcaseProduct[];
  chips: ShowcaseChip[];
  labels: { heading: string; viewAll: string; chips: string };
}) {
  const productsPath = localizedPath(locale, '/products');

  return (
    <aside className={styles.showcase} aria-labelledby="hero-showcase-heading">
      <div className={styles.head}>
        <p id="hero-showcase-heading" className={styles.label}>
          {labels.heading}
        </p>
        <Link href={productsPath} className={styles.all}>
          {labels.viewAll}
          <ArrowRight className={styles.allIcon} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.mosaic}>
        {products.map((p, index) => {
          const src = resolvePublicAssetUrl(p.image_url) ?? '/media/product-placeholder.svg';
          const title = stripHtmlToText(p.title);
          const cat = categoryName(p.category);
          const large = index === 0;
          return (
            <Link
              key={p.id ?? p.slug}
              href={localizedPath(locale, `/products/${p.slug}`)}
              className={large ? styles.tileLarge : styles.tile}
              title={title}
            >
              <Image
                src={src}
                alt={stripHtmlToText(p.alt) || title}
                fill
                priority={large}
                fetchPriority={large ? 'high' : 'auto'}
                unoptimized={!isOptimizable(src)}
                sizes={
                  large
                    ? '(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 60vw, 30vw'
                    : '(max-width: 767px) calc(50vw - 30px), (max-width: 1023px) 40vw, 18vw'
                }
                className={styles.tileImage}
              />
              <span className={styles.tileShade} aria-hidden="true" />
              <span className={styles.tileIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.tileBody}>
                {cat ? <span className={styles.tileCategory}>{cat}</span> : null}
                <span className={styles.tileTitle}>{title}</span>
                <ArrowRight className={styles.tileArrow} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>

      {chips.length > 0 ? (
        <ul className={styles.chips} aria-label={labels.chips}>
          {chips.map((c) => (
            <li key={c.href + c.label}>
              <Link href={c.href}>{c.label}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
