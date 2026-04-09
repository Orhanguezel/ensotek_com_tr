-- =============================================================
-- FILE: 002_seed.sql
-- Ensotek COM TR — Başlangıç seed verisi
-- Admin kullanıcısı + temel site ayarları
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

-- =============================================================
-- ADMIN USER
-- =============================================================

INSERT INTO `users` (
  `id`, `email`, `password_hash`, `full_name`, `phone`,
  `is_active`, `email_verified`, `role`,
  `created_at`, `updated_at`
) VALUES (
  @ADMIN_ID,
  @ADMIN_EMAIL,
  @ADMIN_PASSWORD_HASH,
  'Admin',
  '+905551112233',
  1, 1, 'admin',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  `password_hash`  = VALUES(`password_hash`),
  `is_active`      = 1,
  `email_verified` = 1,
  `updated_at`     = CURRENT_TIMESTAMP(3);

INSERT INTO `profiles` (`id`, `full_name`, `phone`, `created_at`, `updated_at`)
VALUES (@ADMIN_ID, 'Admin', '+905551112233', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `user_roles` (`id`, `user_id`, `role`, `created_at`)
VALUES (UUID(), @ADMIN_ID, 'admin', CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `role` = VALUES(`role`);

-- =============================================================
-- THEME CONFIG (varsayılan)
-- =============================================================

INSERT INTO `theme_config` (`id`, `is_active`, `config`, `created_at`, `updated_at`)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  1,
  '{"primaryColor":"#1a56db","secondaryColor":"#e1effe","fontFamily":"Inter"}',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- SITE SETTINGS (temel)
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`) VALUES
  (UUID(), 'app_locales',     '*',  '["tr","en","de"]', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'default_locale',  '*',  'tr',               CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_name',       'tr', 'Ensotek',          CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_name',       'en', 'Ensotek',          CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_name',       'de', 'Ensotek',          CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_description','tr', 'Soğutma Kulesi Çözümleri', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_description','en', 'Cooling Tower Solutions',  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_description','de', 'Kühltürm-Lösungen',       CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_email',   '*',  'info@ensotek.com.tr',      CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_phone',   '*',  '+90 000 000 00 00',        CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_address', 'tr', 'Türkiye',                  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'storage_driver',  '*',  'cloudinary',               CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = CURRENT_TIMESTAMP(3);

SET FOREIGN_KEY_CHECKS = 1;
