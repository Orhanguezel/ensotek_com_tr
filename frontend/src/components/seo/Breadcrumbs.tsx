import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { SITE_URL } from '@/lib/utils';

type BreadcrumbItem = {
  label: string;
  href?: ComponentProps<typeof Link>['href'];
};

function toAbsoluteUrl(href: NonNullable<BreadcrumbItem['href']>): string {
  if (typeof href === 'string') {
    if (/^https?:\/\//i.test(href)) return href;
    return `${SITE_URL}${href.startsWith('/') ? '' : '/'}${href}`;
  }

  const pathname = href.pathname;
  const slug = 'params' in href && href.params && 'slug' in href.params ? href.params.slug : undefined;

  switch (pathname) {
    case '/':
    case '/blog':
    case '/contact':
    case '/gallery':
    case '/products':
    case '/references':
    case '/hesap-makinesi':
      return `${SITE_URL}${pathname === '/' ? '' : pathname}`;
    case '/blog/[slug]':
    case '/gallery/[slug]':
    case '/products/[slug]':
      return slug ? `${SITE_URL}${pathname.replace('[slug]', String(slug))}` : SITE_URL;
    default:
      return SITE_URL;
  }
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? toAbsoluteUrl(item.href) : SITE_URL,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.2em] text-(--silver)">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-(--cyan) transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-(--white)' : ''}>{item.label}</span>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
