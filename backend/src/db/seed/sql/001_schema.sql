-- =============================================================
-- FILE: 001_schema.sql
-- Ensotek COM TR — Tam Bağımsız Şema
-- ALTER kullanılmaz. Fresh deploy: bun run db:seed
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

-- =============================================================
-- AUTH: users, refresh_tokens, profiles, user_roles
-- =============================================================

CREATE TABLE IF NOT EXISTS `users` (
  `id`                   CHAR(36)      NOT NULL,
  `email`                VARCHAR(255)  NOT NULL,
  `password_hash`        VARCHAR(255)  NOT NULL,
  `full_name`            VARCHAR(255)  DEFAULT NULL,
  `phone`                VARCHAR(50)   DEFAULT NULL,
  `is_active`            TINYINT(1)    NOT NULL DEFAULT 1,
  `email_verified`       TINYINT(1)    NOT NULL DEFAULT 0,
  `reset_token`          VARCHAR(255)  DEFAULT NULL,
  `reset_token_expires`  DATETIME(3)   DEFAULT NULL,
  `created_at`           DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`           DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `last_sign_in_at`      DATETIME(3)   DEFAULT NULL,
  `role`                 ENUM('admin','moderator','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id`          CHAR(36)      NOT NULL,
  `user_id`     CHAR(36)      NOT NULL,
  `token_hash`  VARCHAR(255)  NOT NULL,
  `created_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `expires_at`  DATETIME(3)   NOT NULL,
  `revoked_at`  DATETIME(3)   DEFAULT NULL,
  `replaced_by` CHAR(36)      DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `refresh_tokens_user_id_idx` (`user_id`),
  KEY `refresh_tokens_expires_at_idx` (`expires_at`),
  CONSTRAINT `fk_refresh_tokens_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `profiles` (
  `id`            CHAR(36)      NOT NULL,
  `full_name`     TEXT          DEFAULT NULL,
  `phone`         VARCHAR(64)   DEFAULT NULL,
  `avatar_url`    TEXT          DEFAULT NULL,
  `address_line1` VARCHAR(255)  DEFAULT NULL,
  `address_line2` VARCHAR(255)  DEFAULT NULL,
  `city`          VARCHAR(128)  DEFAULT NULL,
  `country`       VARCHAR(128)  DEFAULT NULL,
  `postal_code`   VARCHAR(32)   DEFAULT NULL,
  `created_at`    DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`    DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_profiles_id_users_id`
    FOREIGN KEY (`id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_roles` (
  `id`         CHAR(36)      NOT NULL,
  `user_id`    CHAR(36)      NOT NULL,
  `role`       ENUM('admin','moderator','user') NOT NULL DEFAULT 'user',
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_roles_user_id_role_unique` (`user_id`, `role`),
  KEY `user_roles_user_id_idx` (`user_id`),
  KEY `user_roles_role_idx` (`role`),
  CONSTRAINT `fk_user_roles_user_id_users_id`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- STORAGE
-- =============================================================

CREATE TABLE IF NOT EXISTS `storage_assets` (
  `id`                     CHAR(36)        NOT NULL,
  `user_id`                CHAR(36)        DEFAULT NULL,
  `name`                   VARCHAR(255)    NOT NULL,
  `bucket`                 VARCHAR(64)     NOT NULL,
  `path`                   VARCHAR(512)    NOT NULL,
  `folder`                 VARCHAR(255)    DEFAULT NULL,
  `mime`                   VARCHAR(127)    NOT NULL,
  `size`                   BIGINT UNSIGNED NOT NULL,
  `width`                  INT UNSIGNED    DEFAULT NULL,
  `height`                 INT UNSIGNED    DEFAULT NULL,
  `url`                    TEXT            DEFAULT NULL,
  `hash`                   VARCHAR(64)     DEFAULT NULL,
  `provider`               VARCHAR(16)     NOT NULL DEFAULT 'cloudinary',
  `provider_public_id`     VARCHAR(255)    DEFAULT NULL,
  `provider_resource_type` VARCHAR(16)     DEFAULT NULL,
  `provider_format`        VARCHAR(32)     DEFAULT NULL,
  `provider_version`       INT UNSIGNED    DEFAULT NULL,
  `etag`                   VARCHAR(64)     DEFAULT NULL,
  `metadata`               JSON            DEFAULT NULL,
  `created_at`             DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`             DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_bucket_path` (`bucket`, `path`),
  KEY `idx_storage_bucket` (`bucket`),
  KEY `idx_storage_folder` (`folder`),
  KEY `idx_storage_created` (`created_at`),
  KEY `idx_provider_pubid` (`provider_public_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- SITE SETTINGS
-- =============================================================

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id`         CHAR(36)      NOT NULL,
  `key`        VARCHAR(100)  NOT NULL,
  `locale`     VARCHAR(8)    NOT NULL,
  `value`      TEXT          NOT NULL,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_locale_uq` (`key`, `locale`),
  KEY `site_settings_key_idx` (`key`),
  KEY `site_settings_locale_idx` (`locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- CATEGORIES & SUBCATEGORIES
-- =============================================================

CREATE TABLE IF NOT EXISTS `categories` (
  `id`               CHAR(36)      NOT NULL,
  `module_key`       VARCHAR(64)   NOT NULL DEFAULT 'general',
  `image_url`        LONGTEXT      DEFAULT NULL,
  `storage_asset_id` CHAR(36)      DEFAULT NULL,
  `alt`              VARCHAR(255)  DEFAULT NULL,
  `icon`             VARCHAR(255)  DEFAULT NULL,
  `is_active`        TINYINT(1)    NOT NULL DEFAULT 1,
  `is_featured`      TINYINT(1)    NOT NULL DEFAULT 0,
  `display_order`    INT           NOT NULL DEFAULT 0,
  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `categories_module_idx` (`module_key`),
  KEY `categories_active_idx` (`is_active`),
  KEY `categories_featured_idx` (`is_featured`),
  KEY `categories_order_idx` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `category_i18n` (
  `category_id` CHAR(36)      NOT NULL,
  `locale`      VARCHAR(8)    NOT NULL DEFAULT 'tr',
  `name`        VARCHAR(255)  NOT NULL,
  `slug`        VARCHAR(255)  NOT NULL,
  `description` TEXT          DEFAULT NULL,
  `alt`         VARCHAR(255)  DEFAULT NULL,
  `i18n_data`   LONGTEXT      DEFAULT NULL,
  `created_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`category_id`, `locale`),
  UNIQUE KEY `category_i18n_locale_slug_uq` (`locale`, `slug`),
  KEY `category_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_category_i18n_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sub_categories` (
  `id`               CHAR(36)       NOT NULL,
  `category_id`      CHAR(36)       NOT NULL,
  `image_url`        VARCHAR(1024)  DEFAULT NULL,
  `storage_asset_id` CHAR(36)       DEFAULT NULL,
  `alt`              VARCHAR(255)   DEFAULT NULL,
  `icon`             VARCHAR(255)   DEFAULT NULL,
  `is_active`        TINYINT(1)     NOT NULL DEFAULT 1,
  `is_featured`      TINYINT(1)     NOT NULL DEFAULT 0,
  `display_order`    INT            NOT NULL DEFAULT 0,
  `created_at`       DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_sub_categories_category_id` (`category_id`),
  CONSTRAINT `fk_sub_categories_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sub_category_i18n` (
  `sub_category_id` CHAR(36)       NOT NULL,
  `locale`          VARCHAR(10)    NOT NULL,
  `name`            VARCHAR(255)   NOT NULL,
  `slug`            VARCHAR(255)   NOT NULL,
  `description`     TEXT           DEFAULT NULL,
  `alt`             VARCHAR(255)   DEFAULT NULL,
  `created_at`      DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`      DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`sub_category_id`, `locale`),
  UNIQUE KEY `ux_sub_category_i18n_locale_slug` (`locale`, `slug`),
  CONSTRAINT `fk_sub_category_i18n_sub_category`
    FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- PRODUCTS (sogutma kulesi urunleri)
-- =============================================================

CREATE TABLE IF NOT EXISTS `products` (
  `id`               CHAR(36)      NOT NULL,
  `item_type`        ENUM('product','sparepart','cooling_tower') NOT NULL DEFAULT 'product',
  `category_id`      CHAR(36)      NOT NULL,
  `sub_category_id`  CHAR(36)      DEFAULT NULL,
  `price`            DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `image_url`        LONGTEXT      DEFAULT NULL,
  `storage_asset_id` VARCHAR(64)   DEFAULT NULL,
  `images`           JSON          DEFAULT (JSON_ARRAY()),
  `storage_image_ids` JSON         DEFAULT (JSON_ARRAY()),
  `is_active`        TINYINT(1)    NOT NULL DEFAULT 1,
  `is_featured`      TINYINT(1)    NOT NULL DEFAULT 0,
  `order_num`        INT(11)       NOT NULL DEFAULT 0,
  `product_code`     VARCHAR(64)   DEFAULT NULL,
  `stock_quantity`   INT(11)       NOT NULL DEFAULT 0,
  `rating`           DECIMAL(3,2)  NOT NULL DEFAULT 5.00,
  `review_count`     INT(11)       NOT NULL DEFAULT 0,
  `botanical_name`   VARCHAR(255)  DEFAULT NULL,
  `planting_seasons` JSON          DEFAULT NULL,
  `harvest_days`     INT(11)       DEFAULT NULL,
  `climate_zones`    JSON          DEFAULT NULL,
  `soil_types`       JSON          DEFAULT NULL,
  `water_need`       VARCHAR(64)   DEFAULT NULL,
  `sun_exposure`     VARCHAR(64)   DEFAULT NULL,
  `min_temp`         DECIMAL(5,2)  DEFAULT NULL,
  `max_temp`         DECIMAL(5,2)  DEFAULT NULL,
  `germination_days` INT(11)       DEFAULT NULL,
  `seed_depth_cm`    DECIMAL(5,2)  DEFAULT NULL,
  `row_spacing_cm`   DECIMAL(5,2)  DEFAULT NULL,
  `plant_spacing_cm` DECIMAL(5,2)  DEFAULT NULL,
  `yield_per_sqm`    DECIMAL(8,2)  DEFAULT NULL,
  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_code_uq` (`product_code`),
  KEY `products_item_type_idx` (`item_type`),
  KEY `products_category_id_idx` (`category_id`),
  KEY `products_active_idx` (`is_active`),
  KEY `products_order_idx` (`order_num`),
  CONSTRAINT `fk_products_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_products_subcategory`
    FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_i18n` (
  `product_id`       CHAR(36)      NOT NULL,
  `locale`           VARCHAR(8)    NOT NULL DEFAULT 'tr',
  `title`            VARCHAR(255)  NOT NULL,
  `slug`             VARCHAR(255)  NOT NULL,
  `description`      TEXT          DEFAULT NULL,
  `alt`              VARCHAR(255)  DEFAULT NULL,
  `tags`             JSON          DEFAULT (JSON_ARRAY()),
  `specifications`   JSON          DEFAULT NULL,
  `meta_title`       VARCHAR(255)  DEFAULT NULL,
  `meta_description` VARCHAR(500)  DEFAULT NULL,
  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`product_id`, `locale`),
  UNIQUE KEY `product_i18n_locale_slug_uq` (`locale`, `slug`),
  KEY `product_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_product_i18n_product`
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- GALLERY
-- =============================================================

CREATE TABLE IF NOT EXISTS `galleries` (
  `id`            CHAR(36)     NOT NULL,
  `module_key`    VARCHAR(64)  NOT NULL DEFAULT 'general',
  `source_id`     CHAR(36)     DEFAULT NULL,
  `source_type`   VARCHAR(32)  DEFAULT 'standalone',
  `is_active`     TINYINT(1)   NOT NULL DEFAULT 1,
  `is_featured`   TINYINT(1)   NOT NULL DEFAULT 0,
  `display_order` INT(11)      NOT NULL DEFAULT 0,
  `created_at`    DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`    DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `galleries_module_idx` (`module_key`),
  KEY `galleries_source_idx` (`source_type`, `source_id`),
  KEY `galleries_active_idx` (`is_active`),
  KEY `galleries_order_idx` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gallery_i18n` (
  `gallery_id`       CHAR(36)      NOT NULL,
  `locale`           VARCHAR(8)    NOT NULL DEFAULT 'tr',
  `title`            VARCHAR(255)  NOT NULL,
  `slug`             VARCHAR(255)  NOT NULL,
  `description`      TEXT          DEFAULT NULL,
  `meta_title`       VARCHAR(255)  DEFAULT NULL,
  `meta_description` VARCHAR(500)  DEFAULT NULL,
  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`gallery_id`, `locale`),
  UNIQUE KEY `gallery_i18n_locale_slug_uq` (`locale`, `slug`),
  KEY `gallery_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_gallery_i18n_gallery`
    FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id`               CHAR(36)     NOT NULL,
  `gallery_id`       CHAR(36)     NOT NULL,
  `storage_asset_id` CHAR(36)     DEFAULT NULL,
  `image_url`        LONGTEXT     DEFAULT NULL,
  `display_order`    INT(11)      NOT NULL DEFAULT 0,
  `is_cover`         TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at`       DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `gallery_images_gallery_idx` (`gallery_id`),
  KEY `gallery_images_order_idx` (`gallery_id`, `display_order`),
  KEY `gallery_images_asset_idx` (`storage_asset_id`),
  CONSTRAINT `fk_gallery_images_gallery`
    FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_gallery_images_asset`
    FOREIGN KEY (`storage_asset_id`) REFERENCES `storage_assets` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gallery_image_i18n` (
  `image_id`    CHAR(36)      NOT NULL,
  `locale`      VARCHAR(8)    NOT NULL DEFAULT 'tr',
  `alt`         VARCHAR(255)  DEFAULT NULL,
  `caption`     VARCHAR(500)  DEFAULT NULL,
  `description` TEXT          DEFAULT NULL,
  `created_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`image_id`, `locale`),
  CONSTRAINT `fk_gallery_image_i18n_image`
    FOREIGN KEY (`image_id`) REFERENCES `gallery_images` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- REFERENCES (proje referanslari)
-- =============================================================

CREATE TABLE IF NOT EXISTS `references` (
  `id`                     CHAR(36)      NOT NULL,
  `is_published`           TINYINT(1)    NOT NULL DEFAULT 0,
  `is_featured`            TINYINT(1)    NOT NULL DEFAULT 0,
  `display_order`          INT(11)       NOT NULL DEFAULT 0,
  `featured_image`         VARCHAR(500)  DEFAULT NULL,
  `featured_image_asset_id` CHAR(36)     DEFAULT NULL,
  `website_url`            VARCHAR(500)  DEFAULT NULL,
  `category_id`            CHAR(36)      DEFAULT NULL,
  `created_at`             DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`             DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `references_created_idx` (`created_at`),
  KEY `references_published_idx` (`is_published`),
  KEY `references_featured_idx` (`is_featured`),
  KEY `references_order_idx` (`display_order`),
  KEY `references_category_id_idx` (`category_id`),
  CONSTRAINT `fk_references_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `references_i18n` (
  `id`                  CHAR(36)      NOT NULL,
  `reference_id`        CHAR(36)      NOT NULL,
  `locale`              VARCHAR(10)   NOT NULL,
  `title`               VARCHAR(255)  NOT NULL,
  `slug`                VARCHAR(255)  NOT NULL,
  `summary`             LONGTEXT      DEFAULT NULL,
  `content`             LONGTEXT      NOT NULL,
  `featured_image_alt`  VARCHAR(255)  DEFAULT NULL,
  `meta_title`          VARCHAR(255)  DEFAULT NULL,
  `meta_description`    VARCHAR(500)  DEFAULT NULL,
  `created_at`          DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`          DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_references_i18n_parent_locale` (`reference_id`, `locale`),
  UNIQUE KEY `ux_references_i18n_locale_slug` (`locale`, `slug`),
  KEY `references_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_references_i18n_reference`
    FOREIGN KEY (`reference_id`) REFERENCES `references` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `reference_images` (
  `id`               CHAR(36)      NOT NULL,
  `reference_id`     CHAR(36)      NOT NULL,
  `image_url`        VARCHAR(500)  DEFAULT NULL,
  `storage_asset_id` CHAR(36)      DEFAULT NULL,
  `is_featured`      TINYINT(1)    NOT NULL DEFAULT 0,
  `display_order`    INT(11)       NOT NULL DEFAULT 0,
  `is_published`     TINYINT(1)    NOT NULL DEFAULT 0,
  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `reference_images_reference_idx` (`reference_id`),
  KEY `reference_images_asset_idx` (`storage_asset_id`),
  CONSTRAINT `fk_reference_images_reference`
    FOREIGN KEY (`reference_id`) REFERENCES `references` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `reference_images_i18n` (
  `id`         CHAR(36)      NOT NULL,
  `image_id`   CHAR(36)      NOT NULL,
  `locale`     VARCHAR(10)   NOT NULL,
  `title`      VARCHAR(200)  DEFAULT NULL,
  `alt`        VARCHAR(255)  DEFAULT NULL,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_reference_images_i18n_parent_locale` (`image_id`, `locale`),
  KEY `reference_images_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_reference_images_i18n_image`
    FOREIGN KEY (`image_id`) REFERENCES `reference_images` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- LIBRARY (teknik dokumanlar, kataloglar)
-- =============================================================

CREATE TABLE IF NOT EXISTS `library` (
  `id`               CHAR(36)      NOT NULL,
  `type`             VARCHAR(32)   NOT NULL DEFAULT 'other',
  `category_id`      CHAR(36)      DEFAULT NULL,
  `sub_category_id`  CHAR(36)      DEFAULT NULL,
  `featured`         TINYINT(1)    NOT NULL DEFAULT 0,
  `is_published`     TINYINT(1)    NOT NULL DEFAULT 0,
  `is_active`        TINYINT(1)    NOT NULL DEFAULT 1,
  `display_order`    INT(11)       NOT NULL DEFAULT 0,
  `featured_image`   VARCHAR(500)  DEFAULT NULL,
  `image_url`        VARCHAR(500)  DEFAULT NULL,
  `image_asset_id`   CHAR(36)      DEFAULT NULL,
  `views`            INT(11)       NOT NULL DEFAULT 0,
  `download_count`   INT(11)       NOT NULL DEFAULT 0,
  `published_at`     DATETIME(3)   DEFAULT NULL,
  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `library_active_idx` (`is_active`),
  KEY `library_published_idx` (`is_published`),
  KEY `library_order_idx` (`display_order`),
  KEY `library_type_idx` (`type`),
  KEY `library_featured_idx` (`featured`),
  KEY `library_category_id_idx` (`category_id`),
  KEY `library_sub_category_id_idx` (`sub_category_id`),
  CONSTRAINT `fk_library_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_library_sub_category`
    FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `library_i18n` (
  `id`               CHAR(36)      NOT NULL,
  `library_id`       CHAR(36)      NOT NULL,
  `locale`           VARCHAR(10)   NOT NULL,
  `slug`             VARCHAR(255)  NOT NULL,
  `name`             VARCHAR(255)  NOT NULL,
  `description`      TEXT          DEFAULT NULL,
  `image_alt`        VARCHAR(255)  DEFAULT NULL,
  `tags`             VARCHAR(255)  DEFAULT NULL,
  `meta_title`       VARCHAR(255)  DEFAULT NULL,
  `meta_description` VARCHAR(500)  DEFAULT NULL,
  `meta_keywords`    VARCHAR(255)  DEFAULT NULL,
  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_library_i18n_unique` (`library_id`, `locale`),
  UNIQUE KEY `ux_library_locale_slug` (`locale`, `slug`),
  KEY `library_i18n_slug_idx` (`slug`),
  CONSTRAINT `fk_library_i18n_library`
    FOREIGN KEY (`library_id`) REFERENCES `library` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `library_images` (
  `id`             CHAR(36)      NOT NULL,
  `library_id`     CHAR(36)      NOT NULL,
  `image_asset_id` CHAR(36)      DEFAULT NULL,
  `image_url`      VARCHAR(500)  DEFAULT NULL,
  `is_active`      TINYINT(1)    NOT NULL DEFAULT 1,
  `display_order`  INT(11)       NOT NULL DEFAULT 0,
  `created_at`     DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`     DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `library_images_library_idx` (`library_id`),
  KEY `library_images_active_idx` (`is_active`),
  KEY `library_images_order_idx` (`display_order`),
  CONSTRAINT `fk_library_images_library`
    FOREIGN KEY (`library_id`) REFERENCES `library` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `library_images_i18n` (
  `id`         CHAR(36)      NOT NULL,
  `image_id`   CHAR(36)      NOT NULL,
  `locale`     VARCHAR(10)   NOT NULL,
  `title`      VARCHAR(255)  DEFAULT NULL,
  `alt`        VARCHAR(255)  DEFAULT NULL,
  `caption`    VARCHAR(500)  DEFAULT NULL,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_library_images_i18n_unique` (`image_id`, `locale`),
  CONSTRAINT `fk_library_images_i18n_image`
    FOREIGN KEY (`image_id`) REFERENCES `library_images` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `library_files` (
  `id`            CHAR(36)      NOT NULL,
  `library_id`    CHAR(36)      NOT NULL,
  `asset_id`      CHAR(36)      DEFAULT NULL,
  `file_url`      VARCHAR(500)  DEFAULT NULL,
  `name`          VARCHAR(255)  NOT NULL,
  `size_bytes`    INT(11)       DEFAULT NULL,
  `mime_type`     VARCHAR(255)  DEFAULT NULL,
  `tags_json`     TEXT          DEFAULT NULL,
  `display_order` INT(11)       NOT NULL DEFAULT 0,
  `is_active`     TINYINT(1)    NOT NULL DEFAULT 1,
  `created_at`    DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`    DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `library_files_library_idx` (`library_id`),
  KEY `library_files_asset_idx` (`asset_id`),
  KEY `library_files_active_idx` (`is_active`),
  CONSTRAINT `fk_library_files_library`
    FOREIGN KEY (`library_id`) REFERENCES `library` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- CUSTOM PAGES
-- =============================================================

CREATE TABLE IF NOT EXISTS `custom_pages` (
  `id`                      CHAR(36)      NOT NULL,
  `module_key`              VARCHAR(100)  NOT NULL DEFAULT '',
  `is_published`            TINYINT(1)    NOT NULL DEFAULT 0,
  `featured`                TINYINT(1)    NOT NULL DEFAULT 0,
  `display_order`           INT(11)       NOT NULL DEFAULT 0,
  `order_num`               INT(11)       NOT NULL DEFAULT 0,
  `featured_image`          VARCHAR(500)  DEFAULT NULL,
  `featured_image_asset_id` CHAR(36)      DEFAULT NULL,
  `image_url`               LONGTEXT      DEFAULT NULL,
  `storage_asset_id`        CHAR(36)      DEFAULT NULL,
  `images`                  LONGTEXT      NOT NULL DEFAULT ('[]'),
  `storage_image_ids`       LONGTEXT      NOT NULL DEFAULT ('[]'),
  `category_id`             CHAR(36)      DEFAULT NULL,
  `sub_category_id`         CHAR(36)      DEFAULT NULL,
  `created_at`              DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`              DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `custom_pages_module_key_idx` (`module_key`),
  KEY `custom_pages_is_published_idx` (`is_published`),
  CONSTRAINT `chk_custom_pages_images_json` CHECK (JSON_VALID(`images`)),
  CONSTRAINT `chk_custom_pages_storage_image_ids_json` CHECK (JSON_VALID(`storage_image_ids`)),
  CONSTRAINT `fk_custom_pages_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_custom_pages_sub_category`
    FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `custom_pages_i18n` (
  `id`                 CHAR(36)       NOT NULL,
  `page_id`            CHAR(36)       NOT NULL,
  `locale`             VARCHAR(10)    NOT NULL,
  `title`              VARCHAR(255)   NOT NULL,
  `slug`               VARCHAR(255)   NOT NULL,
  `content`            LONGTEXT       NOT NULL DEFAULT ('{}'),
  `summary`            VARCHAR(1000)  DEFAULT NULL,
  `featured_image_alt` VARCHAR(255)   DEFAULT NULL,
  `meta_title`         VARCHAR(255)   DEFAULT NULL,
  `meta_description`   VARCHAR(500)   DEFAULT NULL,
  `tags`               VARCHAR(1000)  DEFAULT NULL,
  `created_at`         DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`         DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_custom_pages_i18n_parent_locale` (`page_id`, `locale`),
  UNIQUE KEY `ux_custom_pages_i18n_locale_slug` (`locale`, `slug`),
  KEY `custom_pages_i18n_locale_idx` (`locale`),
  CONSTRAINT `chk_custom_pages_i18n_content_json` CHECK (JSON_VALID(`content`)),
  CONSTRAINT `fk_custom_pages_i18n_page`
    FOREIGN KEY (`page_id`) REFERENCES `custom_pages` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- FOOTER SECTIONS
-- =============================================================

CREATE TABLE IF NOT EXISTS `footer_sections` (
  `id`            CHAR(36)     NOT NULL,
  `site_id`       CHAR(36)     DEFAULT NULL,
  `is_active`     TINYINT(1)   NOT NULL DEFAULT 1,
  `display_order` INT(11)      NOT NULL DEFAULT 0,
  `created_at`    DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`    DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `footer_sections_site_idx` (`site_id`),
  KEY `footer_sections_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `footer_sections_i18n` (
  `id`          CHAR(36)      NOT NULL,
  `section_id`  CHAR(36)      NOT NULL,
  `locale`      VARCHAR(10)   NOT NULL,
  `title`       VARCHAR(150)  NOT NULL,
  `slug`        VARCHAR(255)  NOT NULL,
  `description` LONGTEXT      DEFAULT NULL,
  `created_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_footer_sections_i18n_section_locale` (`section_id`, `locale`),
  UNIQUE KEY `ux_footer_sections_i18n_locale_slug` (`locale`, `slug`),
  KEY `footer_sections_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_footer_sections_i18n_section`
    FOREIGN KEY (`section_id`) REFERENCES `footer_sections` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- MENU ITEMS
-- =============================================================

CREATE TABLE IF NOT EXISTS `menu_items` (
  `id`         CHAR(36)      NOT NULL,
  `parent_id`  CHAR(36)      DEFAULT NULL,
  `type`       ENUM('page','custom')   NOT NULL DEFAULT 'custom',
  `page_id`    CHAR(36)      DEFAULT NULL,
  `location`   ENUM('header','footer') NOT NULL DEFAULT 'header',
  `section_id` CHAR(36)      DEFAULT NULL,
  `icon`       VARCHAR(64)   DEFAULT NULL,
  `order_num`  INT(11)       NOT NULL DEFAULT 0,
  `is_active`  TINYINT(1)    NOT NULL DEFAULT 1,
  `site_id`    CHAR(36)      DEFAULT NULL,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `menu_items_parent_idx` (`parent_id`),
  KEY `menu_items_active_idx` (`is_active`),
  KEY `menu_items_location_idx` (`location`),
  CONSTRAINT `menu_items_parent_fk`
    FOREIGN KEY (`parent_id`) REFERENCES `menu_items` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `menu_items_i18n` (
  `id`           CHAR(36)      NOT NULL,
  `menu_item_id` CHAR(36)      NOT NULL,
  `locale`       VARCHAR(10)   NOT NULL,
  `title`        VARCHAR(100)  NOT NULL,
  `url`          VARCHAR(500)  NOT NULL,
  `created_at`   DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`   DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_menu_items_i18n_item_locale` (`menu_item_id`, `locale`),
  KEY `menu_items_i18n_locale_idx` (`locale`),
  CONSTRAINT `fk_menu_items_i18n_item`
    FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- CONTACT MESSAGES
-- =============================================================

CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id`          CHAR(36)       NOT NULL,
  `name`        VARCHAR(255)   NOT NULL,
  `email`       VARCHAR(255)   NOT NULL,
  `phone`       VARCHAR(64)    NOT NULL DEFAULT '',
  `subject`     VARCHAR(255)   NOT NULL DEFAULT '',
  `message`     TEXT           NOT NULL,
  `status`      VARCHAR(32)    NOT NULL DEFAULT 'new',
  `is_resolved` TINYINT(1)     NOT NULL DEFAULT 0,
  `admin_note`  VARCHAR(2000)  DEFAULT NULL,
  `ip`          VARCHAR(64)    DEFAULT NULL,
  `user_agent`  VARCHAR(512)   DEFAULT NULL,
  `website`     VARCHAR(255)   DEFAULT NULL,
  `created_at`  DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`  DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_contact_created_at` (`created_at`),
  KEY `idx_contact_status` (`status`),
  KEY `idx_contact_resolved` (`is_resolved`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- NEWSLETTER
-- =============================================================

CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id`               CHAR(36)      NOT NULL,
  `email`            VARCHAR(255)  NOT NULL,
  `is_verified`      TINYINT(1)    NOT NULL DEFAULT 0,
  `locale`           VARCHAR(10)   DEFAULT NULL,
  `meta`             LONGTEXT      NOT NULL DEFAULT ('{}'),
  `unsubscribed_at`  DATETIME(3)   DEFAULT NULL,
  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `newsletter_email_uq` (`email`),
  KEY `newsletter_verified_idx` (`is_verified`),
  KEY `newsletter_locale_idx` (`locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- NOTIFICATIONS
-- =============================================================

CREATE TABLE IF NOT EXISTS `notifications` (
  `id`         CHAR(36)      NOT NULL,
  `user_id`    CHAR(36)      NOT NULL,
  `title`      VARCHAR(255)  NOT NULL,
  `message`    TEXT          NOT NULL,
  `type`       VARCHAR(50)   NOT NULL,
  `is_read`    TINYINT(1)    NOT NULL DEFAULT 0,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_notifications_user_id` (`user_id`),
  KEY `idx_notifications_user_read` (`user_id`, `is_read`),
  KEY `idx_notifications_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- THEME CONFIG
-- =============================================================

CREATE TABLE IF NOT EXISTS `theme_config` (
  `id`         CHAR(36)      NOT NULL,
  `is_active`  TINYINT(1)    NOT NULL DEFAULT 1,
  `config`     MEDIUMTEXT    NOT NULL,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- TELEGRAM
-- =============================================================

CREATE TABLE IF NOT EXISTS `telegram_inbound_messages` (
  `id`              CHAR(36)      NOT NULL,
  `update_id`       INT(11)       NOT NULL,
  `message_id`      INT(11)       DEFAULT NULL,
  `chat_id`         VARCHAR(64)   NOT NULL,
  `chat_type`       VARCHAR(32)   DEFAULT NULL,
  `chat_title`      VARCHAR(255)  DEFAULT NULL,
  `chat_username`   VARCHAR(255)  DEFAULT NULL,
  `from_id`         VARCHAR(64)   DEFAULT NULL,
  `from_username`   VARCHAR(255)  DEFAULT NULL,
  `from_first_name` VARCHAR(255)  DEFAULT NULL,
  `from_last_name`  VARCHAR(255)  DEFAULT NULL,
  `from_is_bot`     INT(11)       NOT NULL DEFAULT 0,
  `text`            TEXT          DEFAULT NULL,
  `raw`             TEXT          DEFAULT NULL,
  `telegram_date`   INT(11)       DEFAULT NULL,
  `created_at`      DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tg_inbound_update_message` (`update_id`, `message_id`),
  KEY `idx_tg_inbound_chat_id` (`chat_id`),
  KEY `idx_tg_inbound_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- AUDIT LOGS
-- =============================================================

CREATE TABLE IF NOT EXISTS `audit_request_logs` (
  `id`               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `req_id`           VARCHAR(64)  NOT NULL,
  `method`           VARCHAR(16)  NOT NULL,
  `url`              LONGTEXT     NOT NULL,
  `path`             VARCHAR(255) NOT NULL,
  `status_code`      INT(11)      NOT NULL,
  `response_time_ms` INT(11)      NOT NULL DEFAULT 0,
  `ip`               VARCHAR(64)  NOT NULL,
  `user_agent`       LONGTEXT     DEFAULT NULL,
  `referer`          LONGTEXT     DEFAULT NULL,
  `user_id`          VARCHAR(64)  DEFAULT NULL,
  `is_admin`         INT(11)      NOT NULL DEFAULT 0,
  `country`          VARCHAR(8)   DEFAULT NULL,
  `city`             VARCHAR(64)  DEFAULT NULL,
  `error_message`    VARCHAR(512) DEFAULT NULL,
  `error_code`       VARCHAR(64)  DEFAULT NULL,
  `request_body`     LONGTEXT     DEFAULT NULL,
  `created_at`       DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `audit_request_logs_created_idx` (`created_at`),
  KEY `audit_request_logs_user_idx` (`user_id`),
  KEY `audit_request_logs_path_idx` (`path`),
  KEY `audit_request_logs_ip_idx` (`ip`),
  KEY `audit_request_logs_status_idx` (`status_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `audit_auth_events` (
  `id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `event`      VARCHAR(32)  NOT NULL,
  `user_id`    VARCHAR(64)  DEFAULT NULL,
  `email`      VARCHAR(255) DEFAULT NULL,
  `ip`         VARCHAR(64)  NOT NULL,
  `user_agent` LONGTEXT     DEFAULT NULL,
  `country`    VARCHAR(8)   DEFAULT NULL,
  `city`       VARCHAR(64)  DEFAULT NULL,
  `created_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `audit_auth_events_created_idx` (`created_at`),
  KEY `audit_auth_events_event_idx` (`event`),
  KEY `audit_auth_events_user_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `audit_events` (
  `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ts`            DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `level`         VARCHAR(16)     NOT NULL,
  `topic`         VARCHAR(128)    NOT NULL,
  `message`       LONGTEXT,
  `actor_user_id` VARCHAR(64)     DEFAULT NULL,
  `ip`            VARCHAR(64)     DEFAULT NULL,
  `entity_type`   VARCHAR(64)     DEFAULT NULL,
  `entity_id`     VARCHAR(64)     DEFAULT NULL,
  `meta_json`     LONGTEXT,
  PRIMARY KEY (`id`),
  KEY `audit_events_ts_idx`        (`ts`),
  KEY `audit_events_topic_ts_idx`  (`topic`, `ts`),
  KEY `audit_events_level_ts_idx`  (`level`, `ts`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
