-- Admin panelinde ve ERP web koprusunde kayitli /admin/services yuzeyinin
-- eksik fiziksel semasi. Yalniz CREATE setidir; canlida ALTER calistirilmaz.

CREATE TABLE IF NOT EXISTS `services` (
  `id` CHAR(36) NOT NULL,
  `module_key` VARCHAR(50) NOT NULL DEFAULT 'services',
  `category_id` CHAR(36) DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `image_url` LONGTEXT DEFAULT NULL,
  `storage_asset_id` CHAR(36) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `services_module_key_idx` (`module_key`),
  KEY `services_active_idx` (`is_active`),
  KEY `services_featured_idx` (`is_featured`),
  KEY `services_order_idx` (`display_order`),
  KEY `services_category_idx` (`category_id`),
  KEY `services_asset_idx` (`storage_asset_id`),
  CONSTRAINT `fk_services_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_services_asset` FOREIGN KEY (`storage_asset_id`) REFERENCES `storage_assets` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `services_i18n` (
  `service_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(8) NOT NULL DEFAULT 'tr',
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `tags` JSON DEFAULT (JSON_ARRAY()),
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`service_id`, `locale`),
  UNIQUE KEY `services_i18n_locale_slug_uq` (`locale`, `slug`),
  KEY `services_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_services_i18n_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `service_images` (
  `id` CHAR(36) NOT NULL,
  `service_id` CHAR(36) NOT NULL,
  `storage_asset_id` CHAR(36) DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `service_images_service_id_idx` (`service_id`),
  KEY `service_images_order_idx` (`service_id`, `display_order`),
  KEY `service_images_asset_idx` (`storage_asset_id`),
  CONSTRAINT `fk_service_images_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_service_images_asset` FOREIGN KEY (`storage_asset_id`) REFERENCES `storage_assets` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `service_images_i18n` (
  `id` CHAR(36) NOT NULL,
  `image_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(8) NOT NULL DEFAULT 'tr',
  `title` VARCHAR(255) DEFAULT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `caption` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_images_i18n_image_locale_uq` (`image_id`, `locale`),
  KEY `service_images_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_service_images_i18n_image` FOREIGN KEY (`image_id`) REFERENCES `service_images` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
