-- =============================================================
-- FILE: 007_galleries.seed.sql
-- Galeri kayıtları + her galeri için resimler
-- Görseller Cloudinary + ensotek.de uploads
-- 4 galeri, TR locale
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- =============================================================
-- 1) AÇIK DEVRE SOĞUTMA KULELERİ
-- =============================================================
SET @G1 := '7c1c3001-0001-4222-8222-300100000001';

INSERT INTO `galleries`
  (`id`, `module_key`, `source_id`, `source_type`, `is_active`, `is_featured`, `display_order`, `created_at`, `updated_at`)
VALUES
  (@G1, 'general', NULL, 'standalone', 1, 1, 10, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `is_active` = VALUES(`is_active`),
  `is_featured` = VALUES(`is_featured`),
  `display_order` = VALUES(`display_order`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `gallery_i18n`
  (`gallery_id`, `locale`, `title`, `slug`, `description`, `meta_title`, `meta_description`, `created_at`, `updated_at`)
VALUES
  (@G1, 'tr',
   'Açık Devre Soğutma Kuleleri',
   'acik-devre-sogutma-kuleleri',
   'CTP, DCTP ve TCTP serisi açık devre soğutma kulelerimizden örnekler.',
   'Açık Devre Soğutma Kuleleri Galerisi | Ensotek',
   'CTP, DCTP, TCTP serisi açık devre su soğutma kulelerinin saha ve atölye görüntüleri.',
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `description` = VALUES(`description`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `gallery_images`
  (`id`, `gallery_id`, `storage_asset_id`, `image_url`, `display_order`, `is_cover`, `created_at`)
VALUES
  ('7c1c3001-0001-4111-8111-310100000001', @G1, NULL,
   'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321557/products/cover/open-circuit-ctp-single-1-250x250-1.png',
   10, 1, NOW(3)),
  ('7c1c3001-0001-4111-8111-310100000002', @G1, NULL,
   'https://www.ensotek.de/uploads/material/open-circuit-ctp-single-2-250x250-1.jpg',
   20, 0, NOW(3)),
  ('7c1c3001-0001-4111-8111-310100000003', @G1, NULL,
   'https://www.ensotek.de/uploads/material/open-circuit-ctp-single-3-250x250-1.jpg',
   30, 0, NOW(3)),
  ('7c1c3001-0001-4111-8111-310100000004', @G1, NULL,
   'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321522/products/cover/open-circuit-dctp-double-1-250x250-1.png',
   40, 0, NOW(3)),
  ('7c1c3001-0001-4111-8111-310100000005', @G1, NULL,
   'https://www.ensotek.de/uploads/material/open-circuit-dctp-double-2-250x250-1.jpg',
   50, 0, NOW(3)),
  ('7c1c3001-0001-4111-8111-310100000006', @G1, NULL,
   'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321488/products/cover/open-circuit-tctp-triple-1-250x250-1.png',
   60, 0, NOW(3))
ON DUPLICATE KEY UPDATE
  `image_url` = VALUES(`image_url`),
  `display_order` = VALUES(`display_order`),
  `is_cover` = VALUES(`is_cover`);

-- =============================================================
-- 2) KAPALI DEVRE SOĞUTMA KULELERİ
-- =============================================================
SET @G2 := '7c1c3002-0001-4222-8222-300200000001';

INSERT INTO `galleries`
  (`id`, `module_key`, `source_id`, `source_type`, `is_active`, `is_featured`, `display_order`, `created_at`, `updated_at`)
VALUES
  (@G2, 'general', NULL, 'standalone', 1, 1, 20, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `is_active` = VALUES(`is_active`),
  `is_featured` = VALUES(`is_featured`),
  `display_order` = VALUES(`display_order`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `gallery_i18n`
  (`gallery_id`, `locale`, `title`, `slug`, `description`, `meta_title`, `meta_description`, `created_at`, `updated_at`)
VALUES
  (@G2, 'tr',
   'Kapalı Devre Soğutma Kuleleri',
   'kapali-devre-sogutma-kuleleri',
   'Hassas proseslerde tercih edilen serpantinli (kapalı çevrim) kulelerimiz.',
   'Kapalı Devre Soğutma Kuleleri Galerisi | Ensotek',
   'Kapalı devre (closed circuit) su soğutma kuleleri görüntüleri.',
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `description` = VALUES(`description`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `gallery_images`
  (`id`, `gallery_id`, `storage_asset_id`, `image_url`, `display_order`, `is_cover`, `created_at`)
VALUES
  ('7c1c3002-0001-4111-8111-320200000001', @G2, NULL,
   'https://res.cloudinary.com/dbozv7wqd/image/upload/v1752786288/uploads/metahub/about-images/closed-circuit-water-cooling-towers1-1752786287184-840184158.webp',
   10, 1, NOW(3)),
  ('7c1c3002-0001-4111-8111-320200000002', @G2, NULL,
   'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-1-250x250-1.jpg',
   20, 0, NOW(3)),
  ('7c1c3002-0001-4111-8111-320200000003', @G2, NULL,
   'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-2-250x250-1.jpg',
   30, 0, NOW(3)),
  ('7c1c3002-0001-4111-8111-320200000004', @G2, NULL,
   'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-3-250x250-1.jpg',
   40, 0, NOW(3)),
  ('7c1c3002-0001-4111-8111-320200000005', @G2, NULL,
   'https://www.ensotek.de/uploads/library/how-is-closed-circuit-water-cooling-tower-operation.png',
   50, 0, NOW(3))
ON DUPLICATE KEY UPDATE
  `image_url` = VALUES(`image_url`),
  `display_order` = VALUES(`display_order`),
  `is_cover` = VALUES(`is_cover`);

-- =============================================================
-- 3) SAHA UYGULAMALARI
-- =============================================================
SET @G3 := '7c1c3003-0001-4222-8222-300300000001';

INSERT INTO `galleries`
  (`id`, `module_key`, `source_id`, `source_type`, `is_active`, `is_featured`, `display_order`, `created_at`, `updated_at`)
VALUES
  (@G3, 'general', NULL, 'standalone', 1, 0, 30, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `is_active` = VALUES(`is_active`),
  `is_featured` = VALUES(`is_featured`),
  `display_order` = VALUES(`display_order`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `gallery_i18n`
  (`gallery_id`, `locale`, `title`, `slug`, `description`, `meta_title`, `meta_description`, `created_at`, `updated_at`)
VALUES
  (@G3, 'tr',
   'Saha Uygulamaları',
   'saha-uygulamalari',
   'Türkiye ve dünya genelinde tamamlanmış soğutma kulesi kurulumlarımız.',
   'Saha Uygulamaları | Ensotek',
   'Endüstriyel tesislerdeki Ensotek soğutma kulesi kurulumlarından örnekler.',
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `description` = VALUES(`description`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `gallery_images`
  (`id`, `gallery_id`, `storage_asset_id`, `image_url`, `display_order`, `is_cover`, `created_at`)
VALUES
  ('7c1c3003-0001-4111-8111-330300000001', @G3, NULL,
   'https://res.cloudinary.com/dbozv7wqd/image/upload/v1757875082/uploads/ensotek/about-images/russia-cooling-tower-1757875080869-645546842.webp',
   10, 1, NOW(3)),
  ('7c1c3003-0001-4111-8111-330300000002', @G3, NULL,
   'https://www.ensotek.de/uploads/material/open-circuit-tctp-triple-2-250x250-1.jpg',
   20, 0, NOW(3)),
  ('7c1c3003-0001-4111-8111-330300000003', @G3, NULL,
   'https://www.ensotek.de/uploads/material/open-circuit-tctp-triple-3-250x250-1.jpg',
   30, 0, NOW(3)),
  ('7c1c3003-0001-4111-8111-330300000004', @G3, NULL,
   'https://www.ensotek.de/uploads/library/su-sogutma-kulesi-ozellikleri-1.jpg',
   40, 0, NOW(3))
ON DUPLICATE KEY UPDATE
  `image_url` = VALUES(`image_url`),
  `display_order` = VALUES(`display_order`),
  `is_cover` = VALUES(`is_cover`);

-- =============================================================
-- 4) YEDEK PARÇALAR
-- =============================================================
SET @G4 := '7c1c3004-0001-4222-8222-300400000001';

INSERT INTO `galleries`
  (`id`, `module_key`, `source_id`, `source_type`, `is_active`, `is_featured`, `display_order`, `created_at`, `updated_at`)
VALUES
  (@G4, 'general', NULL, 'standalone', 1, 0, 40, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `is_active` = VALUES(`is_active`),
  `is_featured` = VALUES(`is_featured`),
  `display_order` = VALUES(`display_order`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `gallery_i18n`
  (`gallery_id`, `locale`, `title`, `slug`, `description`, `meta_title`, `meta_description`, `created_at`, `updated_at`)
VALUES
  (@G4, 'tr',
   'Yedek Parça ve Bileşenler',
   'yedek-parca-ve-bilesenler',
   'Fan, motor, dolgu, su dağıtım sistemi ve diğer ana bileşenler.',
   'Yedek Parça ve Bileşenler | Ensotek',
   'Soğutma kulesi yedek parça ve bileşen görüntüleri: fan, motor, dolgu, su dağıtım, hava panjuru.',
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `description` = VALUES(`description`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `gallery_images`
  (`id`, `gallery_id`, `storage_asset_id`, `image_url`, `display_order`, `is_cover`, `created_at`)
VALUES
  ('7c1c3004-0001-4111-8111-340400000001', @G4, NULL,
   'https://www.ensotek.de/uploads/material/ensotek-sogutma-kulesi-motor-fan-grubu-mekanik-250x250-1.jpg',
   10, 1, NOW(3)),
  ('7c1c3004-0001-4111-8111-340400000002', @G4, NULL,
   'https://www.ensotek.de/uploads/material/fan-1220-250x250-1.jpg',
   20, 0, NOW(3)),
  ('7c1c3004-0001-4111-8111-340400000003', @G4, NULL,
   'https://www.ensotek.de/uploads/material/su-dagitim-sistemi-250x250-1.jpg',
   30, 0, NOW(3)),
  ('7c1c3004-0001-4111-8111-340400000004', @G4, NULL,
   'https://www.ensotek.de/uploads/material/pvc-cf-12-petek-dolgu_1-250x250-1.jpg',
   40, 0, NOW(3)),
  ('7c1c3004-0001-4111-8111-340400000005', @G4, NULL,
   'https://www.ensotek.de/uploads/material/hava-giris-panjuru2-250x250-1.jpg',
   50, 0, NOW(3))
ON DUPLICATE KEY UPDATE
  `image_url` = VALUES(`image_url`),
  `display_order` = VALUES(`display_order`),
  `is_cover` = VALUES(`is_cover`);

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
