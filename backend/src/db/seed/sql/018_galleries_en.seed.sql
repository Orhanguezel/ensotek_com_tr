-- =============================================================
-- FILE: 018_galleries_en.seed.sql
-- Galeri kayitlarinin EN cevirileri (4 galeri); TR kaynak 007_galleries.seed.sql
-- Idempotent: (gallery_id, locale) birincil anahtari uzerinden gunceller
-- =============================================================
SET NAMES utf8mb4;
SET time_zone = '+00:00';
START TRANSACTION;

-- open-circuit-cooling-towers
INSERT INTO `gallery_i18n` (`gallery_id`,`locale`,`title`,`slug`,`description`,`meta_title`,`meta_description`,`created_at`,`updated_at`) VALUES
('7c1c3001-0001-4222-8222-300100000001', 'en', 'Open-Circuit Cooling Towers', 'open-circuit-cooling-towers', 'Examples from our CTP, DCTP and TCTP series open-circuit cooling towers.', 'Open-Circuit Cooling Towers Gallery | Ensotek', 'Site and workshop images of CTP, DCTP and TCTP series open-circuit water cooling towers.', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `slug`=VALUES(`slug`), `description`=VALUES(`description`), `meta_title`=VALUES(`meta_title`), `meta_description`=VALUES(`meta_description`), `updated_at`=NOW(3);

-- closed-circuit-cooling-towers
INSERT INTO `gallery_i18n` (`gallery_id`,`locale`,`title`,`slug`,`description`,`meta_title`,`meta_description`,`created_at`,`updated_at`) VALUES
('7c1c3002-0001-4222-8222-300200000001', 'en', 'Closed-Circuit Cooling Towers', 'closed-circuit-cooling-towers', 'Our coil-type (closed-circuit) towers preferred in sensitive processes.', 'Closed-Circuit Cooling Towers Gallery | Ensotek', 'Images of closed-circuit water cooling towers.', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `slug`=VALUES(`slug`), `description`=VALUES(`description`), `meta_title`=VALUES(`meta_title`), `meta_description`=VALUES(`meta_description`), `updated_at`=NOW(3);

-- field-installations
INSERT INTO `gallery_i18n` (`gallery_id`,`locale`,`title`,`slug`,`description`,`meta_title`,`meta_description`,`created_at`,`updated_at`) VALUES
('7c1c3003-0001-4222-8222-300300000001', 'en', 'Field Installations', 'field-installations', 'Our completed cooling tower installations across Turkey and worldwide.', 'Field Installations | Ensotek', 'Examples of Ensotek cooling tower installations at industrial facilities.', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `slug`=VALUES(`slug`), `description`=VALUES(`description`), `meta_title`=VALUES(`meta_title`), `meta_description`=VALUES(`meta_description`), `updated_at`=NOW(3);

-- spare-parts-and-components
INSERT INTO `gallery_i18n` (`gallery_id`,`locale`,`title`,`slug`,`description`,`meta_title`,`meta_description`,`created_at`,`updated_at`) VALUES
('7c1c3004-0001-4222-8222-300400000001', 'en', 'Spare Parts and Components', 'spare-parts-and-components', 'Fans, motors, fill, water distribution systems and other main components.', 'Spare Parts and Components | Ensotek', 'Cooling tower spare part and component images: fan, motor, fill, water distribution, air louvres.', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `slug`=VALUES(`slug`), `description`=VALUES(`description`), `meta_title`=VALUES(`meta_title`), `meta_description`=VALUES(`meta_description`), `updated_at`=NOW(3);

COMMIT;
