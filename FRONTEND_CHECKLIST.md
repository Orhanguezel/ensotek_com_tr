# Ensotek COM TR — Frontend Checklist

> Referans mimari: `kompozit/frontend` (Next.js 16, next-intl, Tailwind v4, React Query, Axios)
> Tasarım referansı: `ensotek-cooling-towers.html` (cyan/blue dark theme)
> Backend: `http://localhost:8087` (PORT=8087, prefix=`ensotek_com_tr__`)
> Diller: `tr` (default), `en`

---

## FAZA 0 — Backend Düzeltmesi

- [x] `audit_events` tablosunu `001_schema.sql`'e ekle (shared-backend bunu bekliyor)
- [x] `bun run db:seed` ile DB'yi yeniden oluştur ve test et

---

## FAZA 1 — Scaffold & Konfigürasyon

- [x] `ensotek_com_tr/frontend/` dizini oluştur
- [x] `package.json` — name: `ensotek-com-tr-frontend`, port: 3021
- [x] `tsconfig.json` — kompozit'ten kopyala (Bundler, strict, @/* alias)
- [x] `next.config.ts` — next-intl plugin, standalone output, `/uploads/*` rewrite → `http://127.0.0.1:8087`
- [x] `postcss.config.mjs` — `@tailwindcss/postcss`
- [x] `.env.local.example` — `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `BACKEND_URL`
- [x] `.env.local` — local değerler
- [x] `bunfig.toml` — `"@" = "./src"` alias
- [x] `ecosystem.config.cjs` — PM2 config (port 3021)
- [x] Root `Ensotek/package.json`'a `ensotek_com_tr/frontend` workspace ekle

---

## FAZA 2 — i18n Kurulumu

- [x] `src/i18n/routing.ts` — `locales: ['tr', 'en']`, `defaultLocale: 'tr'`
- [x] `src/i18n/request.ts` — getRequestConfig, getLocaleMessages
- [x] `src/i18n/locale-settings.ts` — backend `ensotek_com_tr__app_locales` okur
- [x] `src/i18n/navigation.ts` — Link, redirect, usePathname, useRouter
- [x] `src/i18n/server.ts` — fetchSetting, fetchMenuItems, fetchFooterSections
- [x] `src/i18n/locales/index.ts` — Locale tipi
- [x] `src/proxy.ts` (middleware) — createMiddleware(routing)
- [x] `public/locales/tr.json` — tüm namespace'ler (nav, footer, home, seo, common, errors)
- [x] `public/locales/en.json` — İngilizce çeviriler

---

## FAZA 3 — Tema & Stiller

- [x] `src/styles/globals.css` — cyan/blue dark palette (HTML referanstan renk token'ları):
  - `--void: #060a0f`, `--cyan: #00bcd4`, `--blue: #1565c0`, `--teal: #00897b`
  - Semantic tokens, light/dark mode desteği
  - `.section-py`, `.reveal`, `.btn-fill`, `.btn-ghost` utility sınıfları
- [x] `src/theme/templates.ts` — `THEME_TEMPLATE='ensotek-industrial'`
- [x] `src/lib/preferences/theme.ts` — mode/preset config
- [x] `src/scripts/theme-boot.tsx` — FOUC önleme inline script
- [x] Fontlar: **Oswald** (display), **Playfair Display** (serif), **Barlow** (sans) — Google Fonts

---

## FAZA 4 — Lib & API Katmanı

- [x] `src/lib/utils.ts` — cn, API_BASE_URL, SITE_URL, absoluteAssetUrl, resolvePublicAssetUrl
- [x] `src/lib/axios.ts` — axios instance, x-locale interceptor, hata normalize
- [x] `src/lib/api.ts` — API tip tanımları (Product, Category, Gallery, Reference, Contact vb.)
- [x] `src/lib/query-client.ts` — React Query setup + queryKeys
- [x] `src/lib/media-seo.ts` — buildMediaAlt, buildMediaCaption, buildMediaDimensions
- [x] `src/lib/contact-info.ts` — statik iletişim bilgileri

---

## FAZA 5 — Feature Services

- [x] `src/features/products/products.service.ts` — getAll, getBySlug (item_type: 'cooling_tower')
- [x] `src/features/categories/categories.service.ts` — getAll, getById
- [x] `src/features/gallery/gallery.service.ts` — getAll, getBySlug
- [x] `src/features/references/references.service.ts` — getAll
- [x] `src/features/contact/contact.service.ts` — submit form
- [x] `src/features/site-settings/home.ts` — fetchHomePageContent (hero, about, stats)
- [x] `src/features/menu-items/index.ts` — fetchMenuItems
- [x] `src/features/footer-sections/index.ts` — fetchFooterSections

---

## FAZA 6 — Ortak Bileşenler

### Layout
- [x] `src/components/layout/Header.tsx` — fixed nav, logo, menu links, dil seçici, mobil hamburger
- [x] `src/components/layout/Footer.tsx` — 4 kolon grid, linkler, sosyal, copyright
- [x] `src/components/layout/LanguageSwitcher.tsx`
- [x] `src/components/layout/ScrollToTop.tsx`
- [x] `src/components/layout/ClientShell.tsx` — ScrollToTop, Analytics, WhatsApp

### Patterns (Paylaşımlı)
- [x] `src/components/patterns/SectionHeader.tsx` — label, title, description, align
- [x] `src/components/patterns/DarkCtaPanel.tsx`
- [x] `src/components/patterns/TechnicalSpecs.tsx` — tablo komponenti

### Motion & UI
- [x] `src/components/motion/Reveal.tsx` — IntersectionObserver scroll reveal
- [x] `src/components/ui/OptimizedImage.tsx` — backend path handler

### SEO
- [x] `src/seo/helpers.ts` — buildSeoTitle, buildSeoDescription, localeAlternates, organizationJsonLd
- [x] `src/seo/jsonld.ts` — org, website, localBusiness, product şemalar
- [x] `src/seo/JsonLd.tsx` — component wrapper
- [x] `src/seo/organization-schema.ts`

---

## FAZA 7 — Sayfa Rotaları & Layout

- [x] `src/app/layout.tsx` — root layout, metadataBase
- [x] `src/app/robots.ts` — dinamik robots.txt
- [x] `src/app/sitemap.ts` — dinamik sitemap
- [x] `src/app/not-found.tsx`
- [x] `src/app/[locale]/layout.tsx` — fontlar, Header, Footer, ClientShell, ThemeBootScript
- [x] `src/app/[locale]/page.tsx` — Ana sayfa (tüm section'lar)
- [x] `src/app/[locale]/products/page.tsx` — Ürün listesi
- [x] `src/app/[locale]/products/[slug]/page.tsx` — Ürün detayı
- [x] `src/app/[locale]/gallery/page.tsx` — Galeri listesi
- [x] `src/app/[locale]/gallery/[slug]/page.tsx` — Galeri detayı
- [x] `src/app/[locale]/references/page.tsx` — Referanslar
- [x] `src/app/[locale]/contact/page.tsx` — İletişim sayfası
- [x] `src/app/[locale]/not-found.tsx`
- [x] `src/app/[locale]/error.tsx`

---

## FAZA 8 — Ana Sayfa Section Bileşenleri

HTML'den çıkarılan tüm section'lar:

- [x] `src/components/sections/HeroSection.tsx` — full-screen, stats (25+ Yıl, 3000+ Kule, 40+ Ülke), 2 CTA
- [x] `src/components/sections/MarqueeBar.tsx` — kayan ürün tipi şeridi
- [x] `src/components/sections/AboutSection.tsx` — 2-kolon şirket tanıtımı, ISO 9001 badge
- [x] `src/components/sections/HowItWorksSection.tsx` — 4 adım kart grid
- [x] `src/components/sections/TowerTypesSection.tsx` — 6 tip kart (CF/XF/ID/FD/CL/ND)
- [x] `src/components/sections/ProductsSection.tsx` — 3 ürün kart, specs grid (dinamik API)
- [x] `src/components/sections/TechnicalSpecsSection.tsx` — karşılaştırma tablosu
- [x] `src/components/sections/IndustriesSection.tsx` — 8 sektör grid
- [x] `src/components/sections/AdvantagesSection.tsx` — 6 avantaj numaralı kart
- [x] `src/components/sections/GlobalReachSection.tsx` — dünya haritası görseli, 40+ ülke
- [x] `src/components/sections/TestimonialSection.tsx` — müşteri alıntısı
- [x] `src/components/sections/CtaSection.tsx` — son çağrı bölümü
- [x] `src/components/sections/ContactSection.tsx` — form + iletişim bilgileri
- [x] `src/components/sections/FaqSection.tsx` — accordion SSS
- [x] `src/components/sections/NewsletterForm.tsx` — bülten aboneliği

---

## FAZA 9 — SEO & Metadata

- [x] Her sayfa için `generateMetadata()` — locale, pathname, title, description
- [x] `generateStaticParams()` — aktif locale'ler için
- [x] Ana sayfa JSON-LD: Organization + LocalBusiness + WebSite
- [x] Open Graph görselleri: `/app/opengraph-image.tsx`
- [x] Hreflang alternates: tr/en, x-default
- [x] Canonical URL'ler

---

## FAZA 10 — Test & Doğrulama

- [x] `bun run type-check` — TypeScript hataları sıfır
- [x] `bun run dev` — port 3021'de sorunsuz başlatma
- [x] Dil geçişi: `/tr` → `/en` çalışıyor mu
- [x] API bağlantısı: products, gallery, references verisi geliyor mu
- [x] İletişim formu gönderimi çalışıyor mu
- [x] Responsive: mobil (768px), tablet (1024px), desktop
- [x] Light/dark mode geçişi (opsiyonel)
- [x] `bun run build` — standalone build başarılı

---

## Notlar

- `item_type = 'cooling_tower'` — products API'sine filter parametresi
- Backend prefix: `ensotek_com_tr__`
- Backend port: 8087, frontend port: 3021
- Audit event tablosu şemaya eklenmeli (FAZA 0)
- Newsletter public endpoint yok — sadece admin route mevcut
