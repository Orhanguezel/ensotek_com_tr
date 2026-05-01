-- =============================================================
-- FILE: 010_storage_assets.seed.sql
-- Yerel uploads/ klasöründeki dosyaları storage_assets'e index eder
-- /admin/storage sayfasında listelensin
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

INSERT INTO `storage_assets`
  (`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`,
   `url`, `provider`, `provider_resource_type`, `provider_format`, `metadata`,
   `created_at`, `updated_at`)
VALUES
  -- Mevcut about görseli (zaten DB'de var, idempotent)
  ('c9d7df58-8aa5-4f1f-9e3f-2ebea7ac1001', NULL, 'kap.jpg', 'uploads', 'kap.jpg', 'about',
   'image/jpeg', 9094, 270, 300,
   '/uploads/kap.jpg', 'local', 'image', 'jpg',
   JSON_OBJECT('section', 'about'),
   NOW(3), NOW(3)),

  -- Logo (header/footer)
  ('a1a1a101-0001-4111-8111-aaaaaaaa0101', NULL, 'logo.png', 'uploads', 'media/logo.png', 'media',
   'image/png', 5651, 352, 134,
   '/uploads/media/logo.png', 'local', 'image', 'png',
   JSON_OBJECT('role', 'logo'),
   NOW(3), NOW(3)),

  -- Logo büyük varyant
  ('a1a1a101-0002-4111-8111-aaaaaaaa0102', NULL, 'ensotek_icon_512.png', 'uploads', 'media/ensotek_icon_512.png', 'media',
   'image/png', 35616, 381, 119,
   '/uploads/media/ensotek_icon_512.png', 'local', 'image', 'png',
   JSON_OBJECT('role', 'logo_wide'),
   NOW(3), NOW(3)),

  -- Apple touch icon (favicon iOS)
  ('a1a1a101-0003-4111-8111-aaaaaaaa0103', NULL, 'apple-touch-icon.png', 'uploads', 'media/apple-touch-icon.png', 'media',
   'image/png', 9152, 180, 180,
   '/uploads/media/apple-touch-icon.png', 'local', 'image', 'png',
   JSON_OBJECT('role', 'apple_touch_icon'),
   NOW(3), NOW(3)),

  -- 192x192 favicon (PWA)
  ('a1a1a101-0004-4111-8111-aaaaaaaa0104', NULL, 'ensotek_icon_192.png', 'uploads', 'media/ensotek_icon_192.png', 'media',
   'image/png', 8311, 192, 192,
   '/uploads/media/ensotek_icon_192.png', 'local', 'image', 'png',
   JSON_OBJECT('role', 'favicon_192'),
   NOW(3), NOW(3)),

  -- 512x512 PWA icon
  ('a1a1a101-0005-4111-8111-aaaaaaaa0105', NULL, 'ensotek-apple-icon-512.png', 'uploads', 'media/ensotek-apple-icon-512.png', 'media',
   'image/png', 30226, 512, 512,
   '/uploads/media/ensotek-apple-icon-512.png', 'local', 'image', 'png',
   JSON_OBJECT('role', 'pwa_icon_512'),
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `name`     = VALUES(`name`),
  `path`     = VALUES(`path`),
  `folder`   = VALUES(`folder`),
  `mime`     = VALUES(`mime`),
  `size`     = VALUES(`size`),
  `width`    = VALUES(`width`),
  `height`   = VALUES(`height`),
  `url`      = VALUES(`url`),
  `provider` = VALUES(`provider`),
  `metadata` = VALUES(`metadata`),
  `updated_at` = VALUES(`updated_at`);

COMMIT;
