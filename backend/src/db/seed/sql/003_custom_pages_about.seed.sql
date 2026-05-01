-- =============================================================
-- FILE: 003_custom_pages_about.seed.sql
-- Ensotek Kurumsal Sayfaları – Hakkımızda + Misyon + Vizyon + Kalite
-- module_key: 'about' | 'mission' | 'vision' | 'quality'
-- TR / EN / DE i18n
-- category_id / sub_category_id NULL bırakıldı (FK dependency yok)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- -------------------------------------------------------------
-- SABIT SAYFA ID'LERI
-- -------------------------------------------------------------
SET @PAGE_ABOUT   := '11111111-2222-3333-4444-555555555573';
SET @PAGE_MISSION := '11111111-2222-3333-4444-555555555571';
SET @PAGE_VISION  := '11111111-2222-3333-4444-555555555572';
SET @PAGE_QUALITY := '11111111-2222-3333-4444-555555555574';

-- -------------------------------------------------------------
-- GÖRSELLER
-- -------------------------------------------------------------
SET @IMG_ABOUT_MAIN :=
  'https://res.cloudinary.com/dbozv7wqd/image/upload/v1752786288/uploads/metahub/about-images/closed-circuit-water-cooling-towers1-1752786287184-840184158.webp';
SET @IMG_ABOUT_2 :=
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
SET @IMG_ABOUT_3 :=
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80';

SET @IMG_MISSION_MAIN :=
  'https://res.cloudinary.com/dbozv7wqd/image/upload/v1757875082/uploads/ensotek/about-images/russia-cooling-tower-1757875080869-645546842.webp';

SET @IMG_QUALITY_MAIN := @IMG_MISSION_MAIN;

-- Sertifika görselleri
SET @IMG_CERT_1 := 'https://www.ensotek.de/uploads/zertifika/iso-9001.jpg';
SET @IMG_CERT_2 := 'https://www.ensotek.de/uploads/zertifika/14001_1.jpg';
SET @IMG_CERT_3 := 'https://www.ensotek.de/uploads/zertifika/45001_1.jpg';
SET @IMG_CERT_4 := 'https://www.ensotek.de/uploads/zertifika/ce-belgesi-ce-declaration.jpg';
SET @IMG_CERT_5 := 'https://www.ensotek.de/uploads/zertifika/eac-ensotek.jpg';
SET @IMG_CERT_6 := 'https://www.ensotek.de/uploads/zertifika/iso-10002.jpg';

-- =============================================================
-- 1) HAKKIMIZDA (about)
-- =============================================================
INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `featured_image_asset_id`, `image_url`, `storage_asset_id`,
   `images`, `storage_image_ids`, `category_id`, `sub_category_id`,
   `created_at`, `updated_at`)
VALUES
  (@PAGE_ABOUT, 'about', 1, 0, 10, 10,
   @IMG_ABOUT_MAIN, NULL, @IMG_ABOUT_MAIN, NULL,
   CAST(JSON_ARRAY(@IMG_ABOUT_MAIN, @IMG_ABOUT_2, @IMG_ABOUT_3) AS CHAR),
   CAST(JSON_ARRAY() AS CHAR),
   NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key`     = VALUES(`module_key`),
  `is_published`   = VALUES(`is_published`),
  `display_order`  = VALUES(`display_order`),
  `order_num`      = VALUES(`order_num`),
  `updated_at`     = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @PAGE_ABOUT, 'tr',
 'Ensotek Su Soğutma Kuleleri',
 'ensotek-su-sogutma-kuleleri',
 JSON_OBJECT('html', CONCAT(
   '<p>Ensotek, 40 yıllık deneyimiyle İstanbul Merkez Ofis ve Ankara Fabrikası''nda uzman kadrosu ile su soğutma kuleleri alanında hizmet vermektedir. ',
   'Firmamız, Türkiye''nin en büyük su soğutma kulesi üretim tesisine sahiptir.</p>',
   '<p>Cam elyaf takviyeli polyester (FRP) malzemeden, korozyona dayanıklı, boyasız, uzun ömürlü, bakımı kolay ve düşük yatırım/işletme maliyetli açık ve kapalı devre su soğutma kuleleri üretmekteyiz.</p>',
   '<p>Hem yurt içinde hem de yurt dışında binlerce projede başarılı çözümler ürettik. En iyi reklamın ürünün kendisi olduğu prensibiyle, müşterilerimizin tekrar tekrar bizi tercih etmesini ve her seferinde memnun kalmasını hedefliyoruz.</p>',
   '<p>Ar-Ge faaliyetlerimiz ve müşteri geri bildirimleriyle ürünlerimizi sürekli geliştiriyor, Türkiye içinde ve dışında örnek bir firma konumunda yer alıyoruz. ',
   'Ensotek, CTI (Cooling Technology Institute) ve SOSIAD üyesidir; üretim sistemimiz ISO-9001:2015 ile belgelenmiştir ve ürünlerimiz CE belgelidir.</p>'
 )),
 'Ensotek''in 40 yıllık deneyimi, FRP su soğutma kuleleri üretimi ve ulusal/uluslararası projelerdeki lider konumu.',
 'Ensotek su soğutma kuleleri üretim tesisi',
 'Ensotek Su Soğutma Kuleleri | 40 Yıllık Deneyim',
 'Ensotek, 40 yıllık deneyimi ve Türkiye''nin en büyük su soğutma kulesi üretim tesisiyle FRP açık ve kapalı devre soğutma kuleleri sunan sektör lideridir.',
 'ensotek,hakkimizda,frp,su sogutma kuleleri,uretim tesisi',
 NOW(3), NOW(3)),
(UUID(), @PAGE_ABOUT, 'en',
 'Ensotek Water Cooling Towers',
 'ensotek-water-cooling-towers',
 JSON_OBJECT('html', CONCAT(
   '<p>Ensotek serves its customers from its Istanbul Headquarters and Ankara Factory with an expert team and over 40 years of experience in water cooling towers. ',
   'Our company owns the largest water cooling tower production facility in Turkey.</p>',
   '<p>Ensotek manufactures open and closed circuit water cooling towers made from Fiberglass Reinforced Polyester (FRP), which are corrosion resistant, long-lasting, easy to maintain and offer low investment and operating costs.</p>',
   '<p>We have delivered successful solutions in thousands of projects both in Turkey and abroad. ',
   'With the principle that the best advertisement is the product itself, we aim for our customers to work with us repeatedly and be satisfied every time.</p>',
   '<p>Through continuous R&amp;D activities and customer feedback, we keep improving our products and have become an exemplary company in Turkey and worldwide. ',
   'Ensotek is a member of CTI (Cooling Technology Institute) and SOSIAD; our production system is certified with ISO-9001:2015 and our products are CE marked.</p>'
 )),
 '40+ years of experience, FRP cooling tower manufacturing, leadership in domestic and international projects.',
 'Ensotek water cooling tower production facility',
 'Ensotek Water Cooling Towers | 40+ Years of Experience',
 'Ensotek is the sector leader with Turkey''s largest water cooling tower production facility, delivering FRP open and closed circuit cooling towers worldwide.',
 'ensotek,about us,frp,water cooling towers,production facility',
 NOW(3), NOW(3)),
(UUID(), @PAGE_ABOUT, 'de',
 'Ensotek Wasserkühltürme',
 'ensotek-wasserkuehltuerme',
 JSON_OBJECT('html', CONCAT(
   '<p>Ensotek betreut seine Kunden mit über 40 Jahren Erfahrung und einem Expertenteam vom Hauptsitz in Istanbul sowie dem Werk in Ankara. ',
   'Unser Unternehmen verfügt über die größte Produktionsanlage für Wasserkühltürme in der Türkei.</p>',
   '<p>Wir fertigen offene und geschlossene Wasserkühltürme aus glasfaserverstärktem Polyester (GFK/FRP) – korrosionsbeständig, unlackiert, langlebig, wartungsfreundlich.</p>',
   '<p>Wir haben in tausenden Projekten erfolgreiche Lösungen umgesetzt. Nach dem Prinzip, dass das beste Marketing das Produkt selbst ist.</p>',
   '<p>Durch kontinuierliche F&amp;E-Aktivitäten verbessern wir unsere Produkte fortlaufend. ',
   'Ensotek ist Mitglied des CTI und der SOSIAD; ISO-9001:2015 zertifiziert, CE-gekennzeichnet.</p>'
 )),
 'Über 40 Jahre Erfahrung, FRP/GFK-Produktion, führende Rolle in nationalen und internationalen Projekten.',
 'Produktionsanlage für Ensotek Wasserkühltürme',
 'Ensotek Wasserkühltürme | Über 40 Jahre Erfahrung',
 'Ensotek ist Branchenführer mit der größten Produktionsanlage für Wasserkühltürme in der Türkei.',
 'ensotek,über uns,gfk,frp,wasserkühltürme',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `slug`             = VALUES(`slug`),
  `content`          = VALUES(`content`),
  `summary`          = VALUES(`summary`),
  `featured_image_alt` = VALUES(`featured_image_alt`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `tags`             = VALUES(`tags`),
  `updated_at`       = VALUES(`updated_at`);

-- =============================================================
-- 2) MISYON (mission)
-- =============================================================
INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `featured_image_asset_id`, `image_url`, `storage_asset_id`,
   `images`, `storage_image_ids`, `category_id`, `sub_category_id`,
   `created_at`, `updated_at`)
VALUES
  (@PAGE_MISSION, 'mission', 1, 0, 20, 20,
   @IMG_MISSION_MAIN, NULL, @IMG_MISSION_MAIN, NULL,
   CAST(JSON_ARRAY(@IMG_MISSION_MAIN) AS CHAR),
   CAST(JSON_ARRAY() AS CHAR),
   NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key`     = VALUES(`module_key`),
  `is_published`   = VALUES(`is_published`),
  `display_order`  = VALUES(`display_order`),
  `order_num`      = VALUES(`order_num`),
  `updated_at`     = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @PAGE_MISSION, 'tr',
 'Misyonumuz', 'misyonumuz',
 JSON_OBJECT('html', CONCAT(
   '<p>Sektördeki yenilikleri ve gelişmeleri yakından takip ederek, müşterilerimizin beklentilerine ve ihtiyaçlarına en uygun, verimli ve ekonomik çözümleri sunmayı amaçlıyoruz.</p>',
   '<p>Hem Türkiye''de hem de dünyada, su soğutma kuleleri denince akla gelen lider firmalardan biri olmayı hedefliyoruz.</p>'
 )),
 'Ensotek''in sektörde yenilikçi, verimli ve ekonomik su soğutma kuleleri çözümleri sunma hedefi.',
 NULL,
 'Misyonumuz | Ensotek',
 'Sektördeki yenilikleri takip ederek su soğutma kulelerinde en iyi çözümleri sunmayı hedefleyen Ensotek''in misyonu.',
 'ensotek,misyon,su sogutma kuleleri',
 NOW(3), NOW(3)),
(UUID(), @PAGE_MISSION, 'en',
 'Our Mission', 'our-mission',
 JSON_OBJECT('html', CONCAT(
   '<p>Our mission is to closely follow innovations and developments in the sector, providing our customers with efficient and economical solutions that best suit their needs and expectations.</p>',
   '<p>We aim to be one of the leading companies in Turkey and worldwide when it comes to water cooling towers.</p>'
 )),
 'Ensotek''s mission to provide efficient and economical cooling tower solutions worldwide.',
 NULL,
 'Our Mission | Ensotek',
 'Ensotek''s mission is to follow innovations and provide efficient cooling tower solutions tailored to customer needs.',
 'ensotek,mission,water cooling towers',
 NOW(3), NOW(3)),
(UUID(), @PAGE_MISSION, 'de',
 'Unsere Mission', 'unsere-mission',
 JSON_OBJECT('html', CONCAT(
   '<p>Unsere Mission ist es, Innovationen in der Branche zu verfolgen und unseren Kunden effiziente und wirtschaftliche Lösungen anzubieten.</p>',
   '<p>Wir möchten in der Türkei und international zu den führenden Unternehmen für Wasserkühltürme gehören.</p>'
 )),
 'Ensoteks Mission, effiziente Kühlturm-Lösungen anzubieten und führend zu sein.',
 NULL,
 'Unsere Mission | Ensotek',
 'Ensoteks Mission: Innovationen verfolgen und kundenorientierte Wasserkühlturm-Lösungen liefern.',
 'ensotek,mission,wasserkühltürme',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `slug`             = VALUES(`slug`),
  `content`          = VALUES(`content`),
  `summary`          = VALUES(`summary`),
  `featured_image_alt` = VALUES(`featured_image_alt`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `tags`             = VALUES(`tags`),
  `updated_at`       = VALUES(`updated_at`);

-- =============================================================
-- 3) VIZYON (vision)
-- =============================================================
INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `featured_image_asset_id`, `image_url`, `storage_asset_id`,
   `images`, `storage_image_ids`, `category_id`, `sub_category_id`,
   `created_at`, `updated_at`)
VALUES
  (@PAGE_VISION, 'vision', 1, 0, 30, 30,
   NULL, NULL, NULL, NULL,
   CAST(JSON_ARRAY() AS CHAR),
   CAST(JSON_ARRAY() AS CHAR),
   NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key`     = VALUES(`module_key`),
  `is_published`   = VALUES(`is_published`),
  `display_order`  = VALUES(`display_order`),
  `order_num`      = VALUES(`order_num`),
  `updated_at`     = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @PAGE_VISION, 'tr',
 'Vizyonumuz', 'vizyonumuz',
 JSON_OBJECT('html', CONCAT(
   '<p>Vizyonumuz; müşteri memnuniyetini merkeze alarak, kaliteli, verimli ve sürdürülebilir çözümler sunmak; ',
   'ulusal ve uluslararası pazarda tercih edilen, güvenilir ve öncü bir marka olmaktır.</p>'
 )),
 'Ensotek vizyonu: sürdürülebilir kalite ve güvenilir marka.',
 NULL,
 'Vizyonumuz | Ensotek',
 'Müşteri memnuniyetini merkeze alan, sürdürülebilir kalite anlayışıyla hareket eden Ensotek vizyonu.',
 'ensotek,vizyon,surdurulebilir,kalite',
 NOW(3), NOW(3)),
(UUID(), @PAGE_VISION, 'en',
 'Our Vision', 'our-vision',
 JSON_OBJECT('html', CONCAT(
   '<p>Our vision is to prioritize customer satisfaction by delivering high-quality, efficient and sustainable solutions; ',
   'and to become a trusted and leading brand in national and international markets.</p>'
 )),
 'Ensotek vision: sustainable quality and trusted brand approach.',
 NULL,
 'Our Vision | Ensotek',
 'Ensotek''s vision: customer-first approach with sustainable quality.',
 'ensotek,vision,sustainable,quality',
 NOW(3), NOW(3)),
(UUID(), @PAGE_VISION, 'de',
 'Unsere Vision', 'unsere-vision',
 JSON_OBJECT('html', CONCAT(
   '<p>Unsere Vision ist es, die Kundenzufriedenheit in den Mittelpunkt zu stellen, hochwertige, effiziente und nachhaltige Lösungen zu liefern ',
   'und eine bevorzugte, verlässliche und führende Marke auf nationalen und internationalen Märkten zu werden.</p>'
 )),
 'Ensotek Vision: nachhaltige Qualität und verlässlicher Markenansatz.',
 NULL,
 'Unsere Vision | Ensotek',
 'Ensoteks Vision: kundenorientiert, nachhaltig und führend.',
 'ensotek,vision,nachhaltig,qualität',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `slug`             = VALUES(`slug`),
  `content`          = VALUES(`content`),
  `summary`          = VALUES(`summary`),
  `featured_image_alt` = VALUES(`featured_image_alt`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `tags`             = VALUES(`tags`),
  `updated_at`       = VALUES(`updated_at`);

-- =============================================================
-- 4) KALITE BELGELERIMIZ (quality)
-- =============================================================
INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `featured_image_asset_id`, `image_url`, `storage_asset_id`,
   `images`, `storage_image_ids`, `category_id`, `sub_category_id`,
   `created_at`, `updated_at`)
VALUES
  (@PAGE_QUALITY, 'quality', 1, 0, 40, 40,
   @IMG_QUALITY_MAIN, NULL, @IMG_QUALITY_MAIN, NULL,
   CAST(JSON_ARRAY(@IMG_QUALITY_MAIN, @IMG_CERT_1, @IMG_CERT_2, @IMG_CERT_3, @IMG_CERT_4, @IMG_CERT_5, @IMG_CERT_6) AS CHAR),
   CAST(JSON_ARRAY() AS CHAR),
   NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key`     = VALUES(`module_key`),
  `is_published`   = VALUES(`is_published`),
  `display_order`  = VALUES(`display_order`),
  `order_num`      = VALUES(`order_num`),
  `updated_at`     = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @PAGE_QUALITY, 'tr',
 'Kalite Belgelerimiz & Kalite Standartlarımız',
 'kalite-belgelerimiz-kalite-standartlarimiz',
 JSON_OBJECT('html', CONCAT(
   '<p>Ensotek''in üretim ve hizmet süreçleri ulusal ve uluslararası kalite standartlarıyla belgelenmiştir. ',
   'Aşağıdaki sertifikalar, müşterilerimize sunduğumuz ürün ve hizmetlerin uluslararası kabul gören kalite seviyesinde olduğunu gösterir.</p>',
   '<ul>',
   '<li><strong>ISO 9001:2015</strong> – Kalite Yönetim Sistemi</li>',
   '<li><strong>ISO 14001</strong> – Çevre Yönetim Sistemi</li>',
   '<li><strong>ISO 45001</strong> – İş Sağlığı ve Güvenliği</li>',
   '<li><strong>ISO 10002</strong> – Müşteri Memnuniyeti Yönetim Sistemi</li>',
   '<li><strong>CE</strong> – Avrupa Uygunluk Beyanı</li>',
   '<li><strong>EAC</strong> – Avrasya Uygunluk Belgesi</li>',
   '</ul>'
 )),
 'Ensotek kalite belgeleri: ISO 9001, ISO 14001, ISO 45001, CE, EAC ve daha fazlası.',
 'Ensotek kalite belgeleri – sertifikalar',
 'Kalite Belgelerimiz | Ensotek',
 'Ensotek kalite belgeleri ve standartları: ISO 9001, ISO 14001, ISO 45001, CE, EAC. Sertifikaları detaylı olarak inceleyin.',
 'ensotek,kalite,sertifika,iso 9001,iso 14001,iso 45001,ce,eac',
 NOW(3), NOW(3)),
(UUID(), @PAGE_QUALITY, 'en',
 'Quality Certificates & Standards',
 'quality-certificates-standards',
 JSON_OBJECT('html', CONCAT(
   '<p>Ensotek''s production and service processes are certified by national and international quality standards. ',
   'The certificates below confirm that our products and services meet internationally accepted quality levels.</p>',
   '<ul>',
   '<li><strong>ISO 9001:2015</strong> – Quality Management System</li>',
   '<li><strong>ISO 14001</strong> – Environmental Management System</li>',
   '<li><strong>ISO 45001</strong> – Occupational Health & Safety</li>',
   '<li><strong>ISO 10002</strong> – Customer Satisfaction Management</li>',
   '<li><strong>CE</strong> – European Conformity</li>',
   '<li><strong>EAC</strong> – Eurasian Conformity</li>',
   '</ul>'
 )),
 'Ensotek quality certificates: ISO 9001, ISO 14001, ISO 45001, CE, EAC and more.',
 'Ensotek quality certificates',
 'Quality Certificates | Ensotek',
 'Ensotek quality certificates and standards: ISO 9001, ISO 14001, ISO 45001, CE, EAC.',
 'ensotek,quality,certificate,iso 9001,iso 14001,ce,eac',
 NOW(3), NOW(3)),
(UUID(), @PAGE_QUALITY, 'de',
 'Qualitätszertifikate & Standards',
 'qualitaetszertifikate-standards',
 JSON_OBJECT('html', CONCAT(
   '<p>Ensoteks Produktions- und Serviceprozesse sind nach nationalen und internationalen Qualitätsstandards zertifiziert.</p>',
   '<ul>',
   '<li><strong>ISO 9001:2015</strong> – Qualitätsmanagementsystem</li>',
   '<li><strong>ISO 14001</strong> – Umweltmanagementsystem</li>',
   '<li><strong>ISO 45001</strong> – Arbeitsschutz</li>',
   '<li><strong>ISO 10002</strong> – Kundenzufriedenheits-Management</li>',
   '<li><strong>CE</strong> – Europäische Konformität</li>',
   '<li><strong>EAC</strong> – Eurasische Konformität</li>',
   '</ul>'
 )),
 'Ensotek Qualitätszertifikate: ISO 9001, ISO 14001, ISO 45001, CE, EAC.',
 'Ensotek Qualitätszertifikate',
 'Qualitätszertifikate | Ensotek',
 'Ensotek Qualitätszertifikate und Standards: ISO 9001, ISO 14001, ISO 45001, CE, EAC.',
 'ensotek,qualität,zertifikat,iso 9001,iso 14001,ce,eac',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `slug`             = VALUES(`slug`),
  `content`          = VALUES(`content`),
  `summary`          = VALUES(`summary`),
  `featured_image_alt` = VALUES(`featured_image_alt`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `tags`             = VALUES(`tags`),
  `updated_at`       = VALUES(`updated_at`);

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
