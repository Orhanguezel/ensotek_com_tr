-- =============================================================
-- FILE: 002_seed.sql
-- Ensotek COM TR — Seed Verisi
-- İletişim, Logo, Kategoriler, Ürünler (TR/EN/DE)
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
  '+902126133301',
  1, 1, 'admin',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  `password_hash`  = VALUES(`password_hash`),
  `is_active`      = 1,
  `email_verified` = 1,
  `updated_at`     = CURRENT_TIMESTAMP(3);

INSERT INTO `profiles` (`id`, `full_name`, `phone`, `created_at`, `updated_at`)
VALUES (@ADMIN_ID, 'Admin', '+902126133301', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `user_roles` (`id`, `user_id`, `role`, `created_at`)
VALUES (UUID(), @ADMIN_ID, 'admin', CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `role` = VALUES(`role`);

-- =============================================================
-- THEME CONFIG
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
-- SITE SETTINGS — Temel + İletişim + Logo
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`) VALUES
  -- Dil ayarları
  (UUID(), 'app_locales',    '*',  '["tr","en","de"]',            CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'default_locale', '*',  'tr',                          CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- Site adı
  (UUID(), 'site_name', 'tr', 'Ensotek',                         CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_name', 'en', 'Ensotek',                         CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_name', 'de', 'Ensotek',                         CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- Site açıklaması
  (UUID(), 'site_description', 'tr', 'Soğutma Kulesi Çözümleri', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_description', 'en', 'Cooling Tower Solutions',  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_description', 'de', 'Kühlturm-Lösungen',        CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- Logo
  (UUID(), 'site_logo',       '*', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587346/site-media/logo.png', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_logo_dark',  '*', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587346/site-media/logo.png', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_logo_light', '*', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587346/site-media/logo.png', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_favicon',    '*', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770613423/site-media/favicon.ico', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_og_default_image', '*', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767249482/site-media/2.jpg', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- Storage
  (UUID(), 'storage_driver', '*', 'cloudinary', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- İletişim bilgileri (TR)
  (UUID(), 'contact_info', 'tr', JSON_OBJECT(
    'company_name',  'ENSOTEK Su Soğutma Kuleleri ve Teknolojileri Mühendislik San.Tic. Ltd. Şti.',
    'phone',         '+90 212 613 33 01',
    'phone_2',       '+90 531 880 31 51',
    'email',         'ensotek@ensotek.com.tr',
    'email_2',       'export@ensotek.com.tr',
    'address',       'Oruçreis Mah. Tekstilkent Sit. A17 Blok No:41 34235 Esenler / İstanbul, Türkiye',
    'city',          'İstanbul',
    'country',       'Türkiye',
    'working_hours', 'Pzt-Cum 08:00-18:00',
    'maps_lat',      '41.0436',
    'maps_lng',      '28.8820'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- İletişim bilgileri (EN)
  (UUID(), 'contact_info', 'en', JSON_OBJECT(
    'company_name',  'ENSOTEK Cooling Towers & Technologies Engineering Ltd.',
    'phone',         '+90 212 613 33 01',
    'phone_2',       '+90 531 880 31 51',
    'email',         'ensotek@ensotek.com.tr',
    'email_2',       'export@ensotek.com.tr',
    'address',       'Oruçreis District, Tekstilkent Site, A17 Block No:41, 34235 Esenler / Istanbul, Türkiye',
    'city',          'Istanbul',
    'country',       'Türkiye',
    'working_hours', 'Mon-Fri 08:00-18:00',
    'maps_lat',      '41.0436',
    'maps_lng',      '28.8820'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- İletişim bilgileri (DE)
  (UUID(), 'contact_info', 'de', JSON_OBJECT(
    'company_name',  'ENSOTEK Kühltürme & Technologien Engineering GmbH (Ltd.)',
    'phone',         '+90 212 613 33 01',
    'phone_2',       '+90 531 880 31 51',
    'email',         'ensotek@ensotek.com.tr',
    'email_2',       'export@ensotek.com.tr',
    'address',       'Oruçreis Mah., Tekstilkent Sit., A17 Blok No:41, 34235 Esenler / Istanbul, Türkei',
    'city',          'Istanbul',
    'country',       'Türkei',
    'working_hours', 'Mo-Fr 08:00-18:00',
    'maps_lat',      '41.0436',
    'maps_lng',      '28.8820'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- Eski tekli alanlar (geriye uyumluluk)
  (UUID(), 'contact_email',   '*',  'ensotek@ensotek.com.tr',    CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_email_2', '*',  'export@ensotek.com.tr',     CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_phone',   '*',  '+90 212 613 33 01',         CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_phone_2', '*',  '+90 531 880 31 51',         CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_address', 'tr', 'Oruçreis Mah. Tekstilkent Sit. A17 Blok No:41 34235 Esenler / İstanbul, Türkiye', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_address', 'en', 'Oruçreis District, Tekstilkent Site, A17 Block No:41, 34235 Esenler / Istanbul, Türkiye', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'contact_address', 'de', 'Oruçreis Mah., Tekstilkent Sit., A17 Blok No:41, 34235 Esenler / Istanbul, Türkei', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- Katalog PDF
  (UUID(), 'catalog_pdf', 'tr', 'https://www.ensotek.de/uploads/ensotek/catalog/ensotek-katalog.pdf', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'catalog_pdf', 'en', 'https://www.ensotek.de/uploads/ensotek/catalog/ensotek-catalog.pdf', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'catalog_pdf', 'de', 'https://www.ensotek.de/uploads/ensotek/catalog/ensotek-katalog.pdf', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))

ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- CATEGORIES — Ürün kategorileri
-- =============================================================

INSERT INTO `categories`
  (`id`, `module_key`, `is_active`, `is_featured`, `display_order`, `created_at`, `updated_at`)
VALUES
  -- Ana: Soğutma Kuleleri (üst başlık)
  ('aaaa0001-1111-4111-8111-aaaaaaaa0001', 'product', 1, 1, 10, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  -- Açık Devre
  ('aaaa0002-1111-4111-8111-aaaaaaaa0002', 'product', 1, 1, 20, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  -- Kapalı Devre
  ('aaaa0003-1111-4111-8111-aaaaaaaa0003', 'product', 1, 1, 30, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  -- Hibrit
  ('aaaa0004-1111-4111-8111-aaaaaaaa0004', 'product', 1, 0, 40, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `is_active`     = VALUES(`is_active`),
  `display_order` = VALUES(`display_order`),
  `updated_at`    = CURRENT_TIMESTAMP(3);

-- TR
INSERT INTO `category_i18n` (`category_id`, `locale`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
  ('aaaa0001-1111-4111-8111-aaaaaaaa0001', 'tr', 'SOĞUTMA KULELERİ',                'sogutma-kuleleri',                   'Tüm soğutma kulesi serileri',                CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0002-1111-4111-8111-aaaaaaaa0002', 'tr', 'AÇIK DEVRE SOĞUTMA KULELERİ',     'acik-devre-sogutma-kuleleri',        'Açık devre su soğutma kuleleri',             CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0003-1111-4111-8111-aaaaaaaa0003', 'tr', 'KAPALI DEVRE SOĞUTMA KULELERİ',   'kapali-devre-sogutma-kuleleri',      'Kapalı devre su soğutma kuleleri',           CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0004-1111-4111-8111-aaaaaaaa0004', 'tr', 'HİBRİT SOĞUTMA SİSTEMLERİ',       'hibrit-sogutma-sistemleri',          'Hibrit (açık+kapalı) soğutma sistemleri',    CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `updated_at` = CURRENT_TIMESTAMP(3);

-- EN
INSERT INTO `category_i18n` (`category_id`, `locale`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
  ('aaaa0001-1111-4111-8111-aaaaaaaa0001', 'en', 'COOLING TOWERS',                   'cooling-towers',                      'All cooling tower series',                   CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0002-1111-4111-8111-aaaaaaaa0002', 'en', 'OPEN CIRCUIT COOLING TOWERS',      'open-circuit-cooling-towers',         'Open circuit cooling towers',                CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0003-1111-4111-8111-aaaaaaaa0003', 'en', 'CLOSED CIRCUIT COOLING TOWERS',    'closed-circuit-cooling-towers',       'Closed circuit cooling towers',              CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0004-1111-4111-8111-aaaaaaaa0004', 'en', 'HYBRID COOLING SYSTEMS',           'hybrid-cooling-systems',              'Hybrid (open+closed) cooling systems',       CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `updated_at` = CURRENT_TIMESTAMP(3);

-- DE
INSERT INTO `category_i18n` (`category_id`, `locale`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
  ('aaaa0001-1111-4111-8111-aaaaaaaa0001', 'de', 'KÜHLTÜRME',                        'kuehltuerme',                         'Alle Kühlturm-Serien',                       CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0002-1111-4111-8111-aaaaaaaa0002', 'de', 'OFFENE KREISLAUF-KÜHLTÜRME',       'offene-kreislauf-kuehltuerme',        'Offene Kreislauf-Kühltürme',                 CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0003-1111-4111-8111-aaaaaaaa0003', 'de', 'GESCHLOSSENE KREISLAUF-KÜHLTÜRME', 'geschlossene-kreislauf-kuehltuerme',  'Geschlossene Kreislauf-Kühltürme',           CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa0004-1111-4111-8111-aaaaaaaa0004', 'de', 'HYBRID-KÜHLSYSTEME',               'hybrid-kuehlsysteme',                 'Hybrid (offen+geschlossen) Kühlsysteme',     CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- SUB-CATEGORIES
-- =============================================================

INSERT INTO `sub_categories`
  (`id`, `category_id`, `is_active`, `is_featured`, `display_order`, `created_at`, `updated_at`)
VALUES
  -- Açık Devre alt kategorisi
  ('bbbb0102-1111-4111-8111-bbbbbbbb0102', 'aaaa0002-1111-4111-8111-aaaaaaaa0002', 1, 1, 10, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  -- Kapalı Devre alt kategorisi
  ('bbbb0201-1111-4111-8111-bbbbbbbb0201', 'aaaa0003-1111-4111-8111-aaaaaaaa0003', 1, 1, 10, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `is_active` = VALUES(`is_active`), `updated_at` = CURRENT_TIMESTAMP(3);

-- TR
INSERT INTO `sub_category_i18n` (`sub_category_id`, `locale`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
  ('bbbb0102-1111-4111-8111-bbbbbbbb0102', 'tr', 'Mekanik Ventilasyonlu Açık Devre',   'mekanik-ventilasyonlu-acik-devre',   NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb0201-1111-4111-8111-bbbbbbbb0201', 'tr', 'Endüstriyel Kapalı Devre',           'endustriyel-kapali-devre',           NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `updated_at` = CURRENT_TIMESTAMP(3);

-- EN
INSERT INTO `sub_category_i18n` (`sub_category_id`, `locale`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
  ('bbbb0102-1111-4111-8111-bbbbbbbb0102', 'en', 'Mechanical Draft Open Circuit',      'mechanical-draft-open-circuit',      NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb0201-1111-4111-8111-bbbbbbbb0201', 'en', 'Industrial Closed Circuit',          'industrial-closed-circuit',          NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `updated_at` = CURRENT_TIMESTAMP(3);

-- DE
INSERT INTO `sub_category_i18n` (`sub_category_id`, `locale`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
  ('bbbb0102-1111-4111-8111-bbbbbbbb0102', 'de', 'Mechanischer Entwurf Offener Kreislauf', 'mechanischer-entwurf-offener-kreislauf', NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb0201-1111-4111-8111-bbbbbbbb0201', 'de', 'Industrielle Geschlossener Kreislauf',   'industrielle-geschlossener-kreislauf',   NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- PRODUCTS
-- =============================================================

INSERT INTO `products` (
  `id`, `item_type`, `category_id`, `sub_category_id`,
  `price`, `image_url`, `storage_asset_id`, `images`, `storage_image_ids`,
  `is_active`, `is_featured`, `order_num`, `product_code`,
  `stock_quantity`, `rating`, `review_count`, `created_at`, `updated_at`
) VALUES

-- 01: Kapalı Devre — CC CTP / CC DCTP
(
  'bbbb0001-2222-4222-8222-bbbbbbbb0001',
  'product',
  'aaaa0003-1111-4111-8111-aaaaaaaa0003',
  'bbbb0201-1111-4111-8111-bbbbbbbb0201',
  0.00,
  'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321365/products/cover/closed-circuit-cooling-tower-1-250x250-1.png',
  NULL,
  JSON_ARRAY(
    'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-1-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-2-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-3-250x250-1.jpg'
  ),
  JSON_ARRAY(),
  1, 1, 100, 'CC-CTP', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 02: Açık Devre — Tek Hücreli CTP
(
  'bbbb0002-2222-4222-8222-bbbbbbbb0002',
  'product',
  'aaaa0002-1111-4111-8111-aaaaaaaa0002',
  'bbbb0102-1111-4111-8111-bbbbbbbb0102',
  0.00,
  'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321557/products/cover/open-circuit-ctp-single-1-250x250-1.png',
  NULL,
  JSON_ARRAY(
    'https://www.ensotek.de/uploads/material/open-circuit-ctp-single-1-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/open-circuit-ctp-single-2-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/open-circuit-ctp-single-3-250x250-1.jpg'
  ),
  JSON_ARRAY(),
  1, 1, 200, 'CTP-SINGLE', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 03: Açık Devre — İki Hücreli DCTP
(
  'bbbb0003-2222-4222-8222-bbbbbbbb0003',
  'product',
  'aaaa0002-1111-4111-8111-aaaaaaaa0002',
  'bbbb0102-1111-4111-8111-bbbbbbbb0102',
  0.00,
  'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321522/products/cover/open-circuit-dctp-double-1-250x250-1.png',
  NULL,
  JSON_ARRAY(
    'https://www.ensotek.de/uploads/material/open-circuit-dctp-double-1-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/open-circuit-dctp-double-2-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/open-circuit-dctp-double-3-250x250-1.jpg'
  ),
  JSON_ARRAY(),
  1, 1, 300, 'DCTP-DOUBLE', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 04: Açık Devre — Üç Hücreli TCTP
(
  'bbbb0004-2222-4222-8222-bbbbbbbb0004',
  'product',
  'aaaa0002-1111-4111-8111-aaaaaaaa0002',
  'bbbb0102-1111-4111-8111-bbbbbbbb0102',
  0.00,
  'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321488/products/cover/open-circuit-tctp-triple-1-250x250-1.png',
  NULL,
  JSON_ARRAY(
    'https://www.ensotek.de/uploads/material/open-circuit-tctp-triple-1-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/open-circuit-tctp-triple-2-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/open-circuit-tctp-triple-3-250x250-1.jpg'
  ),
  JSON_ARRAY(),
  1, 1, 400, 'TCTP-TRIPLE', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)

ON DUPLICATE KEY UPDATE
  `image_url`   = VALUES(`image_url`),
  `images`      = VALUES(`images`),
  `is_active`   = VALUES(`is_active`),
  `is_featured` = VALUES(`is_featured`),
  `order_num`   = VALUES(`order_num`),
  `updated_at`  = CURRENT_TIMESTAMP(3);

-- =============================================================
-- PRODUCT I18N — TR
-- =============================================================

INSERT INTO `product_i18n` (
  `product_id`, `locale`, `title`, `slug`, `description`,
  `alt`, `tags`, `specifications`, `meta_title`, `meta_description`,
  `created_at`, `updated_at`
) VALUES

-- 01 TR: Kapalı Devre CC CTP
(
  'bbbb0001-2222-4222-8222-bbbbbbbb0001', 'tr',
  'Kapalı Tip Su Soğutma Kuleleri – CC CTP / CC DCTP Serisi',
  'kapali-tip-su-sogutma-kuleleri-cc-ctp-cc-dctp',
  'Kapalı sistemler, soğutulacak suyun kirliliğe karşı hassas olduğu proseslerde tercih edilir. Temiz kalması istenen su, kapalı tip kule içindeki serpantinlerden geçerken soğutulur. Sıcak su boru içerisinden geçerken, soğuk hava ve kulenin sirkülasyon suyu boru yüzeyinden içerideki suyu soğutur. Kapalı sistem soğutma kuleleri; hava kompresörleri, indüksiyon ocakları ve chiller grupları gibi hassas ekipmanlar içeren proseslerde kullanılır.',
  'Kapalı tip su soğutma kulesi (closed circuit cooling tower) – CC CTP / CC DCTP',
  JSON_ARRAY('kapalı devre', 'soğutma kulesi', 'CC CTP', 'CC DCTP', 'closed circuit'),
  JSON_OBJECT(
    'principle', 'Proses akışkanı serpantin/boru içinden geçer; dıştan hava + sirkülasyon suyu ile boru yüzeyinden soğutulur.',
    'useCases',  'Hava kompresörleri | İndüksiyon ocakları | Chiller grupları',
    'series',    'CC CTP | CC DCTP',
    'fanDiameter', '930 / 1100 / 1250 / 1500 mm',
    'motorPower',  '3 kW – 2×5,5 kW (modele göre)',
    'sprayPump',   '1,1 kW – 5,5 kW (modele göre)'
  ),
  'Kapalı Tip Su Soğutma Kuleleri | CC CTP / CC DCTP | Ensotek',
  'Kirliliğe hassas proses suları için kapalı tip su soğutma kuleleri. CC CTP / CC DCTP serileri, model seçenekleri ve teknik özet.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 02 TR: Açık Devre Tek Hücreli CTP
(
  'bbbb0002-2222-4222-8222-bbbbbbbb0002', 'tr',
  'Açık Tip Su Soğutma Kuleleri – Tek Hücreli (CTP Serisi)',
  'acik-tip-su-sogutma-kuleleri-tek-hucreli-ctp-serisi',
  'CTP serisi tek hücreli açık tip su soğutma kuleleri; geniş model skalası ile farklı kapasite ve debi ihtiyaçlarına uygun çözümler sunar. Kapasite değerleri 35/30/25°C ve 40/30/24°C çalışma koşullarına göre katalogda tablo halinde verilmektedir.',
  'Açık tip tek hücreli su soğutma kulesi – CTP Serisi',
  JSON_ARRAY('açık devre', 'tek hücreli', 'CTP', 'soğutma kulesi'),
  JSON_OBJECT(
    'cellType',           'Tek hücreli',
    'series',             'CTP',
    'modelRange',         'CTP-1 … CTP-35',
    'capacityConditions', '35/30/25°C | 40/30/24°C',
    'capacityRange',      '90.000 – 3.500.000 kcal/h',
    'flowRange',          '18 – 700 m³/h',
    'fanDiameter',        '630 – 3700 mm'
  ),
  'Açık Tip Tek Hücreli Su Soğutma Kuleleri | CTP Serisi | Ensotek',
  'Ensotek CTP serisi açık tip tek hücreli su soğutma kuleleri. Geniş kapasite aralığı, model seçenekleri ve teknik özellikler.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 03 TR: Açık Devre İki Hücreli DCTP
(
  'bbbb0003-2222-4222-8222-bbbbbbbb0003', 'tr',
  'Açık Tip Su Soğutma Kuleleri – İki Hücreli (DCTP Serisi)',
  'acik-tip-su-sogutma-kuleleri-iki-hucreli-dctp-serisi',
  'DCTP serisi iki hücreli açık tip su soğutma kuleleri, yüksek kapasite ve debi ihtiyaçlarında çift hücreli yapı ile çözüm sunar. Katalog tablosunda her model için ölçüler, ağırlıklar, kapasite ve debi değerleri 35/30/25°C ve 40/30/24°C koşullarında verilmiştir.',
  'Açık tip iki hücreli su soğutma kulesi – DCTP Serisi',
  JSON_ARRAY('açık devre', 'iki hücreli', 'DCTP', 'soğutma kulesi'),
  JSON_OBJECT(
    'cellType',           'İki hücreli',
    'series',             'DCTP',
    'modelRange',         'DCTP-3 … DCTP-35',
    'capacityConditions', '35/30/25°C | 40/30/24°C',
    'capacityRange',      '500.000 – 7.000.000 kcal/h',
    'flowRange',          '100 – 1400 m³/h',
    'fanGroup',           '2×930 … 2×3150 mm',
    'weightEmpty',        '780 – 8.900 kg',
    'weightOperating',    '2.500 – 45.000 kg'
  ),
  'Açık Tip İki Hücreli Su Soğutma Kuleleri | DCTP Serisi | Ensotek',
  'Ensotek DCTP serisi açık tip iki hücreli su soğutma kuleleri. Yüksek kapasite gerektiren prosesler için ölçeklenebilir çözüm.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 04 TR: Açık Devre Üç Hücreli TCTP
(
  'bbbb0004-2222-4222-8222-bbbbbbbb0004', 'tr',
  'Açık Tip Su Soğutma Kuleleri – Üç Hücreli (TCTP Serisi)',
  'acik-tip-su-sogutma-kuleleri-uc-hucreli-tctp-serisi',
  'TCTP serisi üç hücreli açık tip su soğutma kuleleri, çok yüksek kapasite ve debi gerektiren uygulamalarda üç hücreli yapı ile ölçeklenebilir çözüm sağlar. Katalog tablosunda her modelin ölçüleri, ağırlıkları, kapasite ve debi değerleri 35/30/25°C ve 40/30/24°C koşullarına göre verilmiştir.',
  'Açık tip üç hücreli su soğutma kulesi – TCTP Serisi',
  JSON_ARRAY('açık devre', 'üç hücreli', 'TCTP', 'soğutma kulesi'),
  JSON_OBJECT(
    'cellType',           'Üç hücreli',
    'series',             'TCTP',
    'modelRange',         'TCTP-3 … TCTP-35',
    'capacityConditions', '35/30/25°C | 40/30/24°C',
    'capacityRange',      '700.000 – 10.400.000 kcal/h',
    'flowRange',          '140 – 2080 m³/h',
    'fanGroup',           '3×930 … 3×3700 mm',
    'weightEmpty',        '950 – 11.500 kg',
    'weightOperating',    '3.400 – 60.000 kg'
  ),
  'Açık Tip Üç Hücreli Su Soğutma Kuleleri | TCTP Serisi | Ensotek',
  'Ensotek TCTP serisi açık tip üç hücreli su soğutma kuleleri. Çok yüksek kapasiteli endüstriyel soğutma uygulamaları.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)

ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `description`      = VALUES(`description`),
  `specifications`   = VALUES(`specifications`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `updated_at`       = CURRENT_TIMESTAMP(3);

-- =============================================================
-- PRODUCT I18N — EN
-- =============================================================

INSERT INTO `product_i18n` (
  `product_id`, `locale`, `title`, `slug`, `description`,
  `alt`, `tags`, `specifications`, `meta_title`, `meta_description`,
  `created_at`, `updated_at`
) VALUES

-- 01 EN: Closed Circuit CC CTP
(
  'bbbb0001-2222-4222-8222-bbbbbbbb0001', 'en',
  'Closed Circuit Cooling Towers – CC CTP / CC DCTP Series',
  'closed-circuit-cooling-towers-cc-ctp-cc-dctp',
  'Closed circuit systems are preferred in processes where the water to be cooled is susceptible to contamination. The water required to remain clean is cooled as it passes through the pipe coils in the closed type tower. Hot water flows inside the coil, while cold air and circulating water remove heat from the coil surface. Closed circuit cooling towers are commonly used in processes containing sensitive equipment such as air compressors, induction furnaces and chillers.',
  'Closed circuit cooling tower – CC CTP / CC DCTP Series',
  JSON_ARRAY('closed circuit', 'cooling tower', 'CC CTP', 'CC DCTP'),
  JSON_OBJECT(
    'principle',   'Process fluid flows inside the coil; it is cooled from the outside by air and circulating water.',
    'useCases',    'Air compressors | Induction furnaces | Chillers',
    'series',      'CC CTP | CC DCTP',
    'fanDiameter', '930 / 1100 / 1250 / 1500 mm',
    'motorPower',  '3 kW – 2×5.5 kW (model dependent)',
    'sprayPump',   '1.1 kW – 5.5 kW (model dependent)'
  ),
  'Closed Circuit Cooling Towers | CC CTP / CC DCTP | Ensotek',
  'Closed circuit cooling towers for contamination-sensitive process water. CC CTP / CC DCTP series, model options and technical overview.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 02 EN: Open Circuit Single Cell CTP
(
  'bbbb0002-2222-4222-8222-bbbbbbbb0002', 'en',
  'Open Circuit Cooling Towers – Single Cell (CTP Series)',
  'open-circuit-cooling-towers-single-cell-ctp-series',
  'CTP single-cell open circuit cooling towers provide a wide model range to match different capacity and flow requirements. Capacity and flow rate values are provided in the catalog table for 35/30/25°C and 40/30/24°C operating conditions.',
  'Open circuit single-cell cooling tower – CTP Series',
  JSON_ARRAY('open circuit', 'single cell', 'CTP', 'cooling tower'),
  JSON_OBJECT(
    'cellType',           'Single cell',
    'series',             'CTP',
    'modelRange',         'CTP-1 … CTP-35',
    'capacityConditions', '35/30/25°C | 40/30/24°C',
    'capacityRange',      '90,000 – 3,500,000 kcal/h',
    'flowRange',          '18 – 700 m³/h',
    'fanDiameter',        '630 – 3700 mm'
  ),
  'Open Circuit Single-Cell Cooling Towers | CTP Series | Ensotek',
  'Ensotek CTP series open circuit single-cell cooling towers. Wide capacity range, model options and technical specifications.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 03 EN: Open Circuit Double Cell DCTP
(
  'bbbb0003-2222-4222-8222-bbbbbbbb0003', 'en',
  'Open Circuit Cooling Towers – Double Cell (DCTP Series)',
  'open-circuit-cooling-towers-double-cell-dctp-series',
  'DCTP double-cell open circuit cooling towers offer scalable solutions for high capacity and flow requirements with a two-cell configuration. The catalog table provides dimensions, weights, capacity and flow rate values for each model at 35/30/25°C and 40/30/24°C conditions.',
  'Open circuit double-cell cooling tower – DCTP Series',
  JSON_ARRAY('open circuit', 'double cell', 'DCTP', 'cooling tower'),
  JSON_OBJECT(
    'cellType',           'Double cell',
    'series',             'DCTP',
    'modelRange',         'DCTP-3 … DCTP-35',
    'capacityConditions', '35/30/25°C | 40/30/24°C',
    'capacityRange',      '500,000 – 7,000,000 kcal/h',
    'flowRange',          '100 – 1400 m³/h',
    'fanGroup',           '2×930 … 2×3150 mm',
    'weightEmpty',        '780 – 8,900 kg',
    'weightOperating',    '2,500 – 45,000 kg'
  ),
  'Open Circuit Double-Cell Cooling Towers | DCTP Series | Ensotek',
  'Ensotek DCTP series open circuit double-cell cooling towers. Scalable solution for high-capacity industrial cooling.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 04 EN: Open Circuit Triple Cell TCTP
(
  'bbbb0004-2222-4222-8222-bbbbbbbb0004', 'en',
  'Open Circuit Cooling Towers – Triple Cell (TCTP Series)',
  'open-circuit-cooling-towers-triple-cell-tctp-series',
  'TCTP triple-cell open circuit cooling towers provide scalable solutions for very high capacity and flow applications using a three-cell configuration. The catalog table provides dimensions, weights, capacity and flow rate values for each model at 35/30/25°C and 40/30/24°C conditions.',
  'Open circuit triple-cell cooling tower – TCTP Series',
  JSON_ARRAY('open circuit', 'triple cell', 'TCTP', 'cooling tower'),
  JSON_OBJECT(
    'cellType',           'Triple cell',
    'series',             'TCTP',
    'modelRange',         'TCTP-3 … TCTP-35',
    'capacityConditions', '35/30/25°C | 40/30/24°C',
    'capacityRange',      '700,000 – 10,400,000 kcal/h',
    'flowRange',          '140 – 2080 m³/h',
    'fanGroup',           '3×930 … 3×3700 mm',
    'weightEmpty',        '950 – 11,500 kg',
    'weightOperating',    '3,400 – 60,000 kg'
  ),
  'Open Circuit Triple-Cell Cooling Towers | TCTP Series | Ensotek',
  'Ensotek TCTP series open circuit triple-cell cooling towers. High-capacity industrial cooling applications.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)

ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `description`      = VALUES(`description`),
  `specifications`   = VALUES(`specifications`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `updated_at`       = CURRENT_TIMESTAMP(3);

-- =============================================================
-- PRODUCT I18N — DE
-- =============================================================

INSERT INTO `product_i18n` (
  `product_id`, `locale`, `title`, `slug`, `description`,
  `alt`, `tags`, `specifications`, `meta_title`, `meta_description`,
  `created_at`, `updated_at`
) VALUES

-- 01 DE: Kapalı Devre CC CTP
(
  'bbbb0001-2222-4222-8222-bbbbbbbb0001', 'de',
  'Geschlossene Kühltürme – CC CTP / CC DCTP Serie',
  'geschlossene-kuehltuerme-cc-ctp-cc-dctp',
  'Geschlossene Systeme werden in Prozessen bevorzugt, in denen das zu kühlende Wasser gegenüber Verunreinigungen empfindlich ist. Das Medium, das sauber bleiben soll, wird gekühlt, während es durch die Rohrschlangen (Coils) im geschlossenen Turm strömt. Das heiße Prozesswasser fließt im Rohr, während Außenluft und Umlaufwasser Wärme über die Rohr-/Coil-Oberfläche abführen. Geschlossene Kühltürme werden u. a. bei Luftkompressoren, Induktionsöfen und Kältemaschinen (Chiller) eingesetzt.',
  'Geschlossener Kühlturm – CC CTP / CC DCTP Serie',
  JSON_ARRAY('geschlossener kreislauf', 'kühlturm', 'CC CTP', 'CC DCTP'),
  JSON_OBJECT(
    'prinzip',     'Prozessmedium strömt im Coil; Kühlung von außen durch Luft und Umlaufwasser über die Coil-Oberfläche.',
    'einsatz',     'Luftkompressoren | Induktionsöfen | Chiller',
    'serien',      'CC CTP | CC DCTP',
    'ventDurchm',  '930 / 1100 / 1250 / 1500 mm',
    'motorLeist',  '3 kW – 2×5,5 kW (modellabhängig)',
    'spruehpumpe', '1,1 kW – 5,5 kW (modellabhängig)'
  ),
  'Geschlossene Kühltürme | CC CTP / CC DCTP | Ensotek',
  'Geschlossene Kühltürme für kontaminationsempfindliches Prozesswasser. CC CTP / CC DCTP Serien, Modelloptionen und technische Übersicht.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 02 DE: Offener Kreislauf Einzelzelle CTP
(
  'bbbb0002-2222-4222-8222-bbbbbbbb0002', 'de',
  'Offene Kühltürme – Einzelzelle (CTP-Serie)',
  'offene-kuehltuerme-einzelzelle-ctp-serie',
  'Die CTP-Serie (Einzelzelle) der offenen Kühltürme bietet eine breite Modellauswahl für unterschiedliche Kapazitäts- und Volumenstromanforderungen. Kapazität und Volumenstrom sind in der Katalogtabelle für die Betriebsbedingungen 35/30/25°C und 40/30/24°C angegeben.',
  'Offener Kühlturm Einzelzelle – CTP-Serie',
  JSON_ARRAY('offener kreislauf', 'einzelzelle', 'CTP', 'kühlturm'),
  JSON_OBJECT(
    'zelltyp',             'Einzelzelle',
    'serie',               'CTP',
    'modellbereich',       'CTP-1 … CTP-35',
    'betriebsbedingungen', '35/30/25°C | 40/30/24°C',
    'kapazitaet',          '90.000 – 3.500.000 kcal/h',
    'volumenstrom',        '18 – 700 m³/h',
    'ventDurchm',          '630 – 3700 mm'
  ),
  'Offene Kühltürme Einzelzelle | CTP-Serie | Ensotek',
  'Ensotek CTP-Serie offene Kühltürme Einzelzelle. Breiter Kapazitätsbereich, Modelloptionen und technische Daten.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 03 DE: Offener Kreislauf Doppelzelle DCTP
(
  'bbbb0003-2222-4222-8222-bbbbbbbb0003', 'de',
  'Offene Kühltürme – Doppelzelle (DCTP-Serie)',
  'offene-kuehltuerme-doppelzelle-dctp-serie',
  'Die DCTP-Serie (Doppelzelle) der offenen Kühltürme bietet skalierbare Lösungen für hohe Kapazitäts- und Volumenstromanforderungen. Die Katalogtabelle enthält Maße, Gewichte, Kapazität und Volumenstromwerte für jedes Modell bei 35/30/25°C und 40/30/24°C.',
  'Offener Kühlturm Doppelzelle – DCTP-Serie',
  JSON_ARRAY('offener kreislauf', 'doppelzelle', 'DCTP', 'kühlturm'),
  JSON_OBJECT(
    'zelltyp',             'Doppelzelle',
    'serie',               'DCTP',
    'modellbereich',       'DCTP-3 … DCTP-35',
    'betriebsbedingungen', '35/30/25°C | 40/30/24°C',
    'kapazitaet',          '500.000 – 7.000.000 kcal/h',
    'volumenstrom',        '100 – 1400 m³/h',
    'ventGruppe',          '2×930 … 2×3150 mm',
    'gewichtLeer',         '780 – 8.900 kg',
    'gewichtBetrieb',      '2.500 – 45.000 kg'
  ),
  'Offene Kühltürme Doppelzelle | DCTP-Serie | Ensotek',
  'Ensotek DCTP-Serie offene Kühltürme Doppelzelle. Skalierbare Lösung für hochkapazitive industrielle Kühlung.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),

-- 04 DE: Offener Kreislauf Dreifachzelle TCTP
(
  'bbbb0004-2222-4222-8222-bbbbbbbb0004', 'de',
  'Offene Kühltürme – Dreifachzelle (TCTP-Serie)',
  'offene-kuehltuerme-dreifachzelle-tctp-serie',
  'Die TCTP-Serie (Dreifachzelle) bietet skalierbare Lösungen für sehr hohe Kapazitäts- und Volumenstromanforderungen. Die Katalogtabelle enthält Maße, Gewichte, Kapazität und Volumenstromwerte für jedes Modell bei 35/30/25°C und 40/30/24°C.',
  'Offener Kühlturm Dreifachzelle – TCTP-Serie',
  JSON_ARRAY('offener kreislauf', 'dreifachzelle', 'TCTP', 'kühlturm'),
  JSON_OBJECT(
    'zelltyp',             'Dreifachzelle',
    'serie',               'TCTP',
    'modellbereich',       'TCTP-3 … TCTP-35',
    'betriebsbedingungen', '35/30/25°C | 40/30/24°C',
    'kapazitaet',          '700.000 – 10.400.000 kcal/h',
    'volumenstrom',        '140 – 2080 m³/h',
    'ventGruppe',          '3×930 … 3×3700 mm',
    'gewichtLeer',         '950 – 11.500 kg',
    'gewichtBetrieb',      '3.400 – 60.000 kg'
  ),
  'Offene Kühltürme Dreifachzelle | TCTP-Serie | Ensotek',
  'Ensotek TCTP-Serie offene Kühltürme Dreifachzelle. Hochkapazitive industrielle Kühlanwendungen.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)

ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `description`      = VALUES(`description`),
  `specifications`   = VALUES(`specifications`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `updated_at`       = CURRENT_TIMESTAMP(3);

SET FOREIGN_KEY_CHECKS = 1;
