# Ensotek COM TR — Frontend Checklist

> Referans mimari: `kompozit/frontend` (Next.js 16, next-intl, Tailwind v4, React Query, Axios)
> Tasarım referansı: `ensotek-cooling-towers.html` (cyan/blue dark theme)
> Backend: `http://localhost:8088` (PORT=8088, prefix=`ensotek_com_tr__`)
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
- [x] `next.config.ts` — next-intl plugin, standalone output, `/uploads/*` rewrite → `http://127.0.0.1:8088`
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
- Backend port: 8088, frontend port: 3021
- Audit event tablosu şemaya eklenmeli (FAZA 0)
- Newsletter public endpoint yok — sadece admin route mevcut

---

## FAZA 11 — Pending Fixes (2026-05-23) — Claude Code + Codex müşterek

> **Koordinasyon:** Claude Code mimari/karar verir, Codex implement eder. Aynı dosya üzerinde aynı anda iki araç çalıştırılmaz. Her tamamlanan madde için kutucuğu işaretle.

### 1. Footer — "Group Companies: MOE Kompozit" kaldırılacak

- [x] `frontend/public/locales/tr.json` satır 22: `"groupCompanies": "Grup Şirketleri: MOE Kompozit"` sil
- [x] `frontend/public/locales/en.json` satır 22: `"groupCompanies": "Group Companies: MOE Kompozit"` sil
- [x] `frontend/src/components/layout/Footer.tsx` içinde `groupCompanies` kullanan satırı kaldır
- [x] `bun run type-check` ile doğrula

### 2. İngilizce sayfalardaki Türkçe noktalı `İ` karakteri

> Sorun: EN locale içerikte Türkçe büyük `İ` (U+0130) yerine ASCII `I` (U+0049) kullanılmalı.

Aşağıdaki dosyalarda `İ` taranıp **yalnız EN bağlamında** `I` ile değiştirilecek (TR aynen kalır):

- [x] `frontend/src/components/layout/CatalogModal.tsx` — EN metinleri kontrol
- [x] `frontend/src/components/products/DatasheetRequestButton.tsx`
- [x] `frontend/src/app/[locale]/layout.tsx`
- [x] `frontend/src/data/blog-posts.ts` — EN alanlarındaki `İ` → `I`
- [x] `frontend/src/data/reference-placeholders.ts` — EN alanlarındaki `İ` → `I`
- [x] Tüm `*.tsx` / `*.ts` dosyalarında `grep -P "[İıĞğŞşÇçÖöÜü]"` ile EN string'lerde Türkçe karakter kontrolü
- [x] `public/locales/en.json` içinde Türkçe diacritic taraması (sıfır olmalı)

### 3. Header menüsünde "İletişim / Contact" linki

> Şu an `Header.tsx:34` desktop nav'dan `contact` linkini filter ile gizliyor (sadece sağ üstte "Get a Quote" CTA var). Menüde de görünmesi gerekiyor.

- [x] `frontend/src/components/layout/Header.tsx:34` — `desktopNavLinks` filter'ından `link.key !== 'contact'` koşulunu kaldır
- [x] CTA butonu ("Get a Quote" / "Teklif Al") ile çift link çakışmasını UX olarak doğrula — gerekirse CTA'yı "Catalog" yanına taşı
- [x] Mobil menüde zaten var — sırayı kontrol et

### 4. Offer (Teklif) modülü — ensotek_de'den birebir port

> Referans: `Ensotek/ensotek_de/` içindeki offer modülü (backend + frontend + admin_panel). Admin_panel'de zaten var, **backend ve frontend tarafı eksik**.

#### 4.1 Backend port

- [x] `ensotek_de/backend/src/modules/offer/` → `ensotek_com_tr/backend/src/modules/offer/` (schema, repository, service, controller, router, admin.controller, admin.routes, validation, pdfTemplate)
- [x] `ensotek_com_tr/backend/src/db/seed/sql/` altında offer şema dosyası oluştur (`ALTER` yasak — `CREATE TABLE` ile fresh seed)
- [x] Route kayıt dosyalarına offer router ekle (app.ts / routes.ts)
- [x] Backend prefix `ensotek_com_tr__` ile table isimlerini güncelle
- [ ] `bun run build && bun run db:seed:*:fresh` ile DB'yi yeniden kur
- [x] `backend/uploads/offers/` dizinini oluştur

#### 4.2 Frontend port

- [x] `ensotek_de/frontend/src/features/offer/` → `ensotek_com_tr/frontend/src/features/offer/`
- [x] `ensotek_de/frontend/src/components/containers/offer/` → aynı yola
- [x] `ensotek_de/frontend/src/app/[locale]/offer/page.tsx` → aynı yola
- [x] i18n çevirileri: `public/locales/{tr,en}.json` içine `offer` namespace
- [x] Header menüye "Teklif Al / Get a Quote" linki (eğer CTA değiştirilmediyse)

#### 4.3 Admin panel kontrolü

- [x] `admin_panel/src/app/(main)/admin/(admin)/offer/` zaten var — backend bağlantısını doğrula
- [ ] Admin panelde teklif listesi + detay + PDF indirme çalışıyor mu test et

### 5. Admin Login & Seed Hesap

- [x] Admin URL: `https://www.ensotek.com.tr/admin/auth/login` çalışıyor mu doğrula
- [x] Seed admin user oluştur: **email** `orhanguzell@gmail.com`, **password** `admin123` (diğer projelerle standart)
- [x] `backend/src/db/seed/` içinde admin user seed dosyasını güncelle / oluştur
- [ ] `bun run db:seed` sonrası login testi
- [x] Production VPS deploy notu: seed canlıda bir kez çalıştırılacak

### 6. Codex koordinasyonu

- [x] `Ensotek/ensotek_com_tr/AGENTS.md` dosyasına bu fazı referans olarak ekle
- [x] Codex'e iş paylaşımı: 4.1 + 4.2 implement, Claude Code review eder
- [x] Her PR/commit sonrası bu checklist güncellenir

#### Codex Notu (2026-05-23)

- `bun run build` backend ve frontend için başarılı.
- `bun run type-check` frontend için başarılı.
- `bun src/db/seed/index.ts --no-drop --only=013` denendi ancak lokal MySQL `127.0.0.1:3306` kapalı olduğu için `ECONNREFUSED` ile doğrulama yapılamadı.
- Canlı admin login URL'i `https://www.ensotek.com.tr/admin/auth/login` HTTP 200 dönüyor.
