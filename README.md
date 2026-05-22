# Ensotek com.tr

Ensotek soğutma kulesi çözümleri için **B2B platform** — Türkiye pazar sitesi. Katalog, kütüphane (doküman) yönetimi ve çok dilli içerik içerir.

🌐 Domain: ensotek.com.tr

## Yapı

| Klasör | Açıklama | Stack |
|--------|----------|-------|
| `frontend/` | Genel kullanıcı sitesi | Next.js 16, React 19, next-intl, React Query, Tailwind v4 |
| `backend/` | REST API | Fastify 5, Drizzle ORM, MySQL, Zod |
| `admin_panel/` | Yönetim paneli | Next.js 16, Redux Toolkit, Tailwind v4 |

Bu projenin **kendi veritabanı** vardır.

## Kurulum & Çalıştırma

```bash
# frontend
cd frontend && bun install && bun run dev

# backend
cd backend && bun install && bun run dev      # bun run db:seed ile şema/seed

# admin_panel
cd admin_panel && bun install && bun run dev
```

## Ortam Değişkenleri

`.env` dosyaları repoya **dahil değildir** (`.gitignore`). Üretim ortamı kendi `.env` dosyalarını sağlar.

## Deploy

- **VPS:** `ssh vps-Ensotek` (Hostinger, Ubuntu)
- Standalone build sonrası static dosyaların kopyalanması gerekir.

> Şema değişikliği: `ALTER TABLE` kullanılmaz. İlgili `src/db/seed/sql/0XX_*_schema.sql` güncellenir, `db:seed:*:fresh` ile DB sıfırdan kurulur.

## Ortak Paketler

`backend/` ve `frontend/`, `Ensotek/packages/` altındaki ortak paketleri (`shared-backend` vb.) root `bun` workspace üzerinden kullanır.
