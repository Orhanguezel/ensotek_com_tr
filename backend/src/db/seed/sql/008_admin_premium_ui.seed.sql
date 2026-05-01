-- =============================================================
-- FILE: 008_admin_premium_ui.seed.sql
-- Premium Admin Panel için gerekli ayarlar
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Premium UI Config
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`) VALUES
(UUID(), 'ui_admin_config', '*', JSON_OBJECT(
  'theme', JSON_OBJECT(
    'mode', 'dark',
    'preset', 'premium',
    'font', 'outfit'
  ),
  'layout', JSON_OBJECT(
    'sidebar_variant', 'inset',
    'sidebar_collapsible', 'icon',
    'navbar_style', 'sticky',
    'content_layout', 'full-width'
  ),
  'branding', JSON_OBJECT(
    'name', 'Ensotek',
    'logo_url', '/media/logo.png',
    'favicon_url', '/favicon.ico'
  ),
  'default_locale', 'tr'
), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- 2. Premium UI Page Meta
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`) VALUES
(UUID(), 'ui_admin_pages', 'tr', JSON_OBJECT(
  'dashboard', JSON_OBJECT(
    'title', 'Yönetim Paneli',
    'description', 'Ensotek dijital varlıklarınızı buradan yönetebilirsiniz.',
    'metrics', JSON_ARRAY('Aktif Ürünler', 'Yeni Mesajlar', 'Bülten Aboneleri')
  ),
  'products', JSON_OBJECT(
    'title', 'Ürün Yönetimi',
    'description', 'Soğutma kuleleri ve ekipmanları listesini düzenleyin.'
  ),
  'categories', JSON_OBJECT(
    'title', 'Kategoriler',
    'description', 'Ürün kategorilerini ve hiyerarşisini yönetin.'
  ),
  'site-settings', JSON_OBJECT(
    'title', 'Site Ayarları',
    'description', 'Global ayarlar, iletişim bilgileri ve SEO yapılandırması.'
  )
), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- 3. Footer Sections Tablosu (Eğer yoksa)
CREATE TABLE IF NOT EXISTS `footer_sections` (
  `id` char(36) NOT NULL,
  `site_id` char(36) DEFAULT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `footer_sections_active_idx` (`is_active`),
  KEY `footer_sections_order_idx` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `footer_sections_i18n` (
  `id` char(36) NOT NULL,
  `section_id` char(36) NOT NULL,
  `locale` varchar(10) NOT NULL,
  `title` varchar(150) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` longtext,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_footer_sections_i18n_section_locale` (`section_id`,`locale`),
  UNIQUE KEY `ux_footer_sections_i18n_locale_slug` (`locale`,`slug`),
  CONSTRAINT `footer_sections_i18n_section_id_fk` FOREIGN KEY (`section_id`) REFERENCES `footer_sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `faqs` (
  `id` char(36) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `display_order` int NOT NULL DEFAULT '0',
  `category_id` char(36) DEFAULT NULL,
  `sub_category_id` char(36) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `faqs_active_idx` (`is_active`),
  KEY `faqs_order_idx` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `faqs_i18n` (
  `id` char(36) NOT NULL,
  `faq_id` char(36) NOT NULL,
  `locale` varchar(10) NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` longtext NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_faqs_i18n_parent_locale` (`faq_id`,`locale`),
  UNIQUE KEY `ux_faqs_i18n_locale_slug` (`locale`,`slug`),
  CONSTRAINT `faqs_i18n_faq_id_fk` FOREIGN KEY (`faq_id`) REFERENCES `faqs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
