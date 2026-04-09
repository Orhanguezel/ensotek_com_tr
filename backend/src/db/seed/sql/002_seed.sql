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
  (UUID(), 'site_logo',            '*', '/media/logo.png',                  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_logo_dark',       '*', '/media/logo.png',                  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_logo_light',      '*', '/media/logo.png',                  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_favicon',         '*', '/favicon.ico',                     CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'site_og_default_image','*', '/media/ensotek_icon_512.png',      CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- App icons
  (UUID(), 'app_icon_192',         '*', '/media/ensotek_icon_192.png',      CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'app_icon_512',         '*', '/media/ensotek_icon_512.png',      CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'app_icon_apple',       '*', '/media/apple-touch-icon.png',      CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'app_icon_apple_512',   '*', '/media/ensotek-apple-icon-512.png',CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

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

INSERT INTO `storage_assets` (
  `id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`, `hash`, `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `provider_version`, `etag`, `metadata`, `created_at`, `updated_at`
) VALUES (
  'c9d7df58-8aa5-4f1f-9e3f-2ebea7ac1001',
  NULL,
  'kap.jpg',
  'uploads',
  'kap.jpg',
  'about',
  'image/jpeg',
  9094,
  270,
  300,
  '/uploads/kap.jpg',
  NULL,
  'local',
  NULL,
  'image',
  'jpg',
  NULL,
  NULL,
  JSON_OBJECT('section', 'about'),
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  `name`       = VALUES(`name`),
  `folder`     = VALUES(`folder`),
  `mime`       = VALUES(`mime`),
  `size`       = VALUES(`size`),
  `width`      = VALUES(`width`),
  `height`     = VALUES(`height`),
  `url`        = VALUES(`url`),
  `provider`   = VALUES(`provider`),
  `metadata`   = VALUES(`metadata`),
  `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- SITE SETTINGS — Dinamik Bölüm İçerikleri (Admin Panelden Düzenlenebilir)
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`) VALUES

  -- Hero Stats
  (UUID(), 'hero_stats', 'tr', '{"years":"39+","towers":"3000+","countries":"40+"}', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'hero_stats', 'en', '{"years":"39+","towers":"3000+","countries":"40+"}', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'hero_stats', 'de', '{"years":"39+","towers":"3000+","countries":"40+"}', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- About Content
  (UUID(), 'about_content', 'tr', JSON_OBJECT(
    'label',       'Hakkımızda',
    'title',       '39 Yıllık Endüstriyel Deneyim',
    'description', 'Ensotek, 1986 yılından bu yana ISO 9001 belgeli üretici olarak 3.000''den fazla soğutma kulesi kurulumu tamamlamış, İstanbul ve Ankara fabrikalarıyla Türkiye''nin en büyük soğutma kulesi üretim tesisini işletmektedir.',
    'feature1',    'ISO 9001:2015 kalite yönetim sistemi sertifikasyonu',
    'feature2',    'İstanbul ofisi ve Ankara fabrikasıyla tam entegre üretim kapasitesi',
    'feature3',    '40''tan fazla ülkede proje deneyimi ve teknik destek',
    'feature4',    '7/24 servis ve bakım desteği',
    'image_url',   '/uploads/kap.jpg',
    'storage_asset_id', 'c9d7df58-8aa5-4f1f-9e3f-2ebea7ac1001'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'about_content', 'en', JSON_OBJECT(
    'label',       'About Us',
    'title',       '39 Years of Industrial Excellence',
    'description', 'Ensotek has been ISO 9001 certified since 1986 and has completed over 3,000 cooling tower installations. Operating Turkey''s largest cooling tower production facility with offices in Istanbul and a factory in Ankara.',
    'feature1',    'ISO 9001:2015 quality management system certification',
    'feature2',    'Fully integrated production capacity with Istanbul office and Ankara factory',
    'feature3',    'Project experience and technical support in 40+ countries',
    'feature4',    '24/7 service and maintenance support',
    'image_url',   '/uploads/kap.jpg',
    'storage_asset_id', 'c9d7df58-8aa5-4f1f-9e3f-2ebea7ac1001'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'about_content', 'de', JSON_OBJECT(
    'label',       'Über uns',
    'title',       '39 Jahre industrielle Exzellenz',
    'description', 'Ensotek ist seit 1986 ISO 9001-zertifiziert und hat über 3.000 Kühltürme installiert. Mit Büro in Istanbul und Fabrik in Ankara betreibt Ensotek die größte Kühlturmproduktionsanlage der Türkei.',
    'feature1',    'ISO 9001:2015 Qualitätsmanagementsystem-Zertifizierung',
    'feature2',    'Vollintegrierte Produktionskapazität mit Istanbul-Büro und Ankara-Fabrik',
    'feature3',    'Projekterfahrung und technischer Support in 40+ Ländern',
    'feature4',    '24/7 Service und Wartungsunterstützung',
    'image_url',   '/uploads/kap.jpg',
    'storage_asset_id', 'c9d7df58-8aa5-4f1f-9e3f-2ebea7ac1001'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- Global Reach Stats
  (UUID(), 'global_reach_stats', 'tr', JSON_OBJECT(
    'countries_count', '40+',
    'projects_value',  '3000+',
    'projects_label',  'Tamamlanan Proje',
    'experience_value','39+',
    'experience_label','Yıl Deneyim',
    'capacity_value',  '500+',
    'capacity_label',  'MW Soğutma Kapasitesi'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'global_reach_stats', 'en', JSON_OBJECT(
    'countries_count', '40+',
    'projects_value',  '3000+',
    'projects_label',  'Completed Projects',
    'experience_value','39+',
    'experience_label','Years Experience',
    'capacity_value',  '500+',
    'capacity_label',  'MW Cooling Capacity'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'global_reach_stats', 'de', JSON_OBJECT(
    'countries_count', '40+',
    'projects_value',  '3000+',
    'projects_label',  'Abgeschlossene Projekte',
    'experience_value','39+',
    'experience_label','Jahre Erfahrung',
    'capacity_value',  '500+',
    'capacity_label',  'MW Kühlkapazität'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- Testimonials
  (UUID(), 'testimonial_featured', 'tr', JSON_OBJECT(
    'quote',   'Ensotek''in soğutma kulesi sistemleri, tesisimizde beklentilerimizin çok ötesinde performans gösterdi. Teknik ekibin kurulum ve bakım desteği mükemmeldi. 39 yıllık deneyimleri gerçekten hissediliyor.',
    'author',  'Ahmet Yılmaz',
    'company', 'Teknik Direktör, Enerji A.Ş.'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'testimonial_featured', 'en', JSON_OBJECT(
    'quote',   'Ensotek''s cooling tower systems performed far beyond expectations at our facility. The technical team''s installation and maintenance support was excellent. Their 39 years of experience truly shows.',
    'author',  'Ahmet Yilmaz',
    'company', 'Technical Director, Energy Corp.'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  (UUID(), 'testimonial_featured', 'de', JSON_OBJECT(
    'quote',   'Die Kühltürme von Ensotek haben in unserer Anlage weit über Erwartungen performt. Die technische Unterstützung beim Einbau und bei der Wartung war hervorragend.',
    'author',  'Ahmet Yilmaz',
    'company', 'Technischer Direktor, Energy AG'
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  -- FAQ Items
  (UUID(), 'faq_items', 'tr', JSON_ARRAY(
    JSON_OBJECT('question','Legionella riski nasıl yönetilir?','answer','Soğutma kulelerinde Legionella riski; biyosit dozajlaması, düzenli bakım ve su analiziyle minimize edilir. Ensotek, TSE ve REHVA standartlarına uygun bakım programları sunar.'),
    JSON_OBJECT('question','Hangi kule tipi projem için doğru?','answer','Kapasite, mevcut alan, su kalitesi ve bütçe gereksinimlerine göre ücretsiz teknik danışmanlık sunuyoruz. Uzman ekibimiz en uygun çözümü belirler.'),
    JSON_OBJECT('question','CTP gövdenin avantajları nelerdir?','answer','Cam elyaf takviyeli polyester (CTP) korozyona dayanıklı, hafif ve uzun ömürlüdür. Metal gövdelere kıyasla %40 daha uzun servis ömrü sunar ve boya gerektirmez.'),
    JSON_OBJECT('question','Kapasite nasıl hesaplanır?','answer','Soğutma kapasitesi; proses yükü, giriş/çıkış sıcaklıkları ve yaklaşım değerlerine göre termodinamik hesaplamayla belirlenir. Ücretsiz hesaplama için ekibimizle iletişime geçin.'),
    JSON_OBJECT('question','Bakım ne sıklıkta yapılmalıdır?','answer','Mevsimlik bakım ve yılda 1-2 tam bakım önerilir. Kritik tesisler için sürekli izleme sistemleri kurulabilir.'),
    JSON_OBJECT('question','Kiralık soğutma kulesi hizmeti var mı?','answer','Evet, geçici veya mevsimsel ihtiyaçlar için kiralık soğutma kulesi sistemleri sunuyoruz. Kurulum, devreye alma ve bakım hizmetleri dahildir.'),
    JSON_OBJECT('question','Ankara fabrikası hakkında bilgi verir misiniz?','answer','2021 yılında faaliyete geçen Ankara (Kahramankazan) fabrikamız, Türkiye''nin en büyük soğutma kulesi üretim tesisidir. Modern CNC ve kompozit üretim ekipmanlarıyla donatılmıştır.')
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  (UUID(), 'faq_items', 'en', JSON_ARRAY(
    JSON_OBJECT('question','How is Legionella risk managed?','answer','Legionella risk is minimized in cooling towers through biocide dosing, regular maintenance and water analysis. Ensotek provides maintenance programs compliant with TSE and REHVA standards.'),
    JSON_OBJECT('question','Which tower type is right for my project?','answer','We offer free technical consultancy based on capacity, available space, water quality and budget requirements. Our expert team determines the most suitable solution.'),
    JSON_OBJECT('question','What are the advantages of FRP body?','answer','Fiberglass reinforced polyester (FRP) is corrosion-resistant, lightweight and long-lasting. It offers 40% longer service life compared to metal bodies and requires no painting.'),
    JSON_OBJECT('question','How is capacity calculated?','answer','Cooling capacity is determined by thermodynamic calculation based on process load, inlet/outlet temperatures and approach values. Contact our team for a free calculation.'),
    JSON_OBJECT('question','How often should maintenance be performed?','answer','Seasonal maintenance and 1-2 full maintenance per year is recommended. Continuous monitoring systems can be installed for critical facilities.'),
    JSON_OBJECT('question','Is rental cooling tower service available?','answer','Yes, we offer rental cooling tower systems for temporary or seasonal needs. Installation, commissioning and maintenance services are included.'),
    JSON_OBJECT('question','Tell me about the Ankara factory.','answer','Our Ankara (Kahramankazan) factory, commissioned in 2021, is Turkey''s largest cooling tower production facility, equipped with modern CNC and composite manufacturing equipment.')
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  (UUID(), 'faq_items', 'de', JSON_ARRAY(
    JSON_OBJECT('question','Wie wird das Legionella-Risiko gemanagt?','answer','Das Legionella-Risiko in Kühltürmen wird durch Biozid-Dosierung, regelmäßige Wartung und Wasseranalyse minimiert. Ensotek bietet Wartungsprogramme nach TSE- und REHVA-Standards.'),
    JSON_OBJECT('question','Welcher Kühlturmtyp ist für mein Projekt geeignet?','answer','Wir bieten kostenlose technische Beratung basierend auf Kapazität, verfügbarem Platz, Wasserqualität und Budgetanforderungen an. Unser Expertenteam ermittelt die beste Lösung.'),
    JSON_OBJECT('question','Was sind die Vorteile des FRP-Gehäuses?','answer','Glasfaserverstärkter Kunststoff (FRP) ist korrosionsbeständig, leicht und langlebig. Er bietet 40% längere Standzeit im Vergleich zu Metallgehäusen und benötigt keine Lackierung.'),
    JSON_OBJECT('question','Wie wird die Kapazität berechnet?','answer','Die Kühlkapazität wird durch thermodynamische Berechnung auf Basis von Prozesslast, Ein-/Austrittstemperaturen und Annäherungswerten bestimmt. Kontaktieren Sie uns für eine kostenlose Berechnung.'),
    JSON_OBJECT('question','Wie oft sollte gewartet werden?','answer','Saisonale Wartung und 1-2 Vollwartungen pro Jahr werden empfohlen. Für kritische Anlagen können kontinuierliche Überwachungssysteme installiert werden.'),
    JSON_OBJECT('question','Gibt es einen Mietkühlturm-Service?','answer','Ja, wir bieten Mietkühlturmsysteme für temporäre oder saisonale Bedürfnisse an. Installation, Inbetriebnahme und Wartungsleistungen sind inbegriffen.'),
    JSON_OBJECT('question','Erzählen Sie mir über die Ankara-Fabrik.','answer','Unsere 2021 in Betrieb genommene Fabrik in Ankara (Kahramankazan) ist die größte Kühlturmproduktionsanlage der Türkei, ausgestattet mit modernen CNC- und Verbundwerkstoff-Fertigungsanlagen.')
  ), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))

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
  '/uploads/kap.jpg',
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

-- =============================================================
-- SPARE PARTS CATEGORY
-- =============================================================

INSERT INTO `categories`
  (`id`, `module_key`, `is_active`, `is_featured`, `display_order`, `created_at`, `updated_at`)
VALUES
  ('aaaa1001-1111-4111-8111-aaaaaaaa1001', 'sparepart', 1, 0, 50, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `is_active` = VALUES(`is_active`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `category_i18n` (`category_id`, `locale`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
  ('aaaa1001-1111-4111-8111-aaaaaaaa1001', 'tr', 'SOĞUTMA KULESİ YEDEK PARÇALARI', 'sogutma-kulesi-yedek-parcalari', NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa1001-1111-4111-8111-aaaaaaaa1001', 'en', 'COOLING TOWER SPARE PARTS',       'cooling-tower-spare-parts',      NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('aaaa1001-1111-4111-8111-aaaaaaaa1001', 'de', 'ERSATZTEILE FÜR KÜHLTÜRME',       'ersatzteile-fuer-kuehltuerme',   NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- SPARE PARTS SUB-CATEGORIES
-- =============================================================

INSERT INTO `sub_categories`
  (`id`, `category_id`, `is_active`, `is_featured`, `display_order`, `created_at`, `updated_at`)
VALUES
  ('bbbb1001-1111-4111-8111-bbbbbbbb1001', 'aaaa1001-1111-4111-8111-aaaaaaaa1001', 1, 0, 10, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1002-1111-4111-8111-bbbbbbbb1002', 'aaaa1001-1111-4111-8111-aaaaaaaa1001', 1, 0, 20, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1003-1111-4111-8111-bbbbbbbb1003', 'aaaa1001-1111-4111-8111-aaaaaaaa1001', 1, 0, 30, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1004-1111-4111-8111-bbbbbbbb1004', 'aaaa1001-1111-4111-8111-aaaaaaaa1001', 1, 0, 40, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `is_active` = VALUES(`is_active`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `sub_category_i18n` (`sub_category_id`, `locale`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
  ('bbbb1001-1111-4111-8111-bbbbbbbb1001', 'tr', 'Kule Ana Bileşenleri',      'kule-ana-bilesenleri',       NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1002-1111-4111-8111-bbbbbbbb1002', 'tr', 'Yedek Parçalar ve Aksesuar','yedek-parcalar-ve-aksesuar', NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1003-1111-4111-8111-bbbbbbbb1003', 'tr', 'Dolgu Malzemeleri',         'dolgu-malzemeleri',          NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1004-1111-4111-8111-bbbbbbbb1004', 'tr', 'Fan ve Motor Grubu',        'fan-ve-motor-grubu',         NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1001-1111-4111-8111-bbbbbbbb1001', 'en', 'Tower Main Components',     'tower-main-components',      NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1002-1111-4111-8111-bbbbbbbb1002', 'en', 'Spare Parts & Accessories', 'spare-parts-accessories',    NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1003-1111-4111-8111-bbbbbbbb1003', 'en', 'Fill Media',                'fill-media',                 NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1004-1111-4111-8111-bbbbbbbb1004', 'en', 'Fan & Motor Group',         'fan-motor-group',            NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1001-1111-4111-8111-bbbbbbbb1001', 'de', 'Turm-Hauptkomponenten',     'turm-hauptkomponenten',      NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1002-1111-4111-8111-bbbbbbbb1002', 'de', 'Ersatzteile & Zubehör',     'ersatzteile-zubehoer',       NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1003-1111-4111-8111-bbbbbbbb1003', 'de', 'Füllkörper / Füllmaterial', 'fuellkoerper-fuellmaterial', NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('bbbb1004-1111-4111-8111-bbbbbbbb1004', 'de', 'Ventilator- & Motorgruppe', 'ventilator-motorgruppe',     NULL, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- SPARE PARTS (5 ürün)
-- =============================================================

INSERT INTO `products` (
  `id`, `item_type`, `category_id`, `sub_category_id`,
  `price`, `image_url`, `storage_asset_id`, `images`, `storage_image_ids`,
  `is_active`, `is_featured`, `order_num`, `product_code`,
  `stock_quantity`, `rating`, `review_count`, `created_at`, `updated_at`
) VALUES
-- SP-01: Motor ve Redüktör
(
  'bbbb1501-2222-4222-8222-bbbbbbbb1501', 'sparepart',
  'aaaa1001-1111-4111-8111-aaaaaaaa1001', 'bbbb1004-1111-4111-8111-bbbbbbbb1004',
  0.00,
  'https://www.ensotek.de/uploads/material/ensotek-sogutma-kulesi-motor-fan-grubu-mekanik-250x250-1.jpg',
  NULL,
  JSON_ARRAY(
    'https://www.ensotek.de/uploads/material/ensotek-sogutma-kulesi-motor-fan-grubu-mekanik-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/ensotek-sogutma-kulesi-reduktorlu-motor-fan-grubu-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/44-250x250-1.jpg'
  ),
  JSON_ARRAY(), 1, 1, 1501, 'SP-MOTOR-REDUKTOR', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
-- SP-03: Aksiyal Fan
(
  'bbbb1503-2222-4222-8222-bbbbbbbb1503', 'sparepart',
  'aaaa1001-1111-4111-8111-aaaaaaaa1001', 'bbbb1004-1111-4111-8111-bbbbbbbb1004',
  0.00,
  'https://www.ensotek.de/uploads/material/fan-1220-250x250-1.jpg',
  NULL,
  JSON_ARRAY(
    'https://www.ensotek.de/uploads/material/fan-1220-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/fan-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/aluminyum-fan-2-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/4-kanatli-sac-kule-fani-250x250-1.jpg'
  ),
  JSON_ARRAY(), 1, 1, 1503, 'SP-FAN', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
-- SP-05: Su Dağıtım Sistemi
(
  'bbbb1505-2222-4222-8222-bbbbbbbb1505', 'sparepart',
  'aaaa1001-1111-4111-8111-aaaaaaaa1001', 'bbbb1001-1111-4111-8111-bbbbbbbb1001',
  0.00,
  'https://www.ensotek.de/uploads/material/su-dagitim-sistemi-250x250-1.jpg',
  NULL,
  JSON_ARRAY(
    'https://www.ensotek.de/uploads/material/su-dagitim-sistemi-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/pvc-kole-ve-pvc-flans-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/su-dagitim-uygulamasi-250x250-1.jpg'
  ),
  JSON_ARRAY(), 1, 1, 1505, 'SP-WATER-DISTRIBUTION', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
-- SP-09: PVC Film Fill
(
  'bbbb1509-2222-4222-8222-bbbbbbbb1509', 'sparepart',
  'aaaa1001-1111-4111-8111-aaaaaaaa1001', 'bbbb1003-1111-4111-8111-bbbbbbbb1003',
  0.00,
  'https://www.ensotek.de/uploads/material/pvc-cf-12-petek-dolgu_1-250x250-1.jpg',
  NULL,
  JSON_ARRAY(
    'https://www.ensotek.de/uploads/material/pvc-cf-12-petek-dolgu_1-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/pvc-cf-19-petek-dolgu-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/pvc-cf-30-petek-dolgu-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/pvc-cf-m-sogutma-kulesi-dolgusu-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/pvc-cf-o-sogutma-kulesi-dolgusu_1-250x250-1.jpg'
  ),
  JSON_ARRAY(), 1, 1, 1509, 'SP-PVC-FILM-FILL', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
-- SP-13: Hava Giriş Panjuru
(
  'bbbb1513-2222-4222-8222-bbbbbbbb1513', 'sparepart',
  'aaaa1001-1111-4111-8111-aaaaaaaa1001', 'bbbb1001-1111-4111-8111-bbbbbbbb1001',
  0.00,
  'https://www.ensotek.de/uploads/material/hava-giris-panjuru2-250x250-1.jpg',
  NULL,
  JSON_ARRAY('https://www.ensotek.de/uploads/material/hava-giris-panjuru2-250x250-1.jpg'),
  JSON_ARRAY(), 1, 1, 1513, 'SP-AIR-INLET-LOUVERS', 0, 5.00, 0,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  `image_url`   = VALUES(`image_url`),
  `images`      = VALUES(`images`),
  `is_active`   = VALUES(`is_active`),
  `order_num`   = VALUES(`order_num`),
  `updated_at`  = CURRENT_TIMESTAMP(3);

-- =============================================================
-- SPARE PARTS I18N — TR
-- =============================================================

INSERT INTO `product_i18n` (
  `product_id`, `locale`, `title`, `slug`, `description`,
  `alt`, `tags`, `specifications`, `meta_title`, `meta_description`,
  `created_at`, `updated_at`
) VALUES
(
  'bbbb1501-2222-4222-8222-bbbbbbbb1501', 'tr',
  'Motor ve Redüktör (Fan Grubu)',
  'motor-ve-reduktor-fan-grubu',
  'Motor ve redüktör, kulenin çatı bölümünde fan ve fan bacası ile birlikte grup halinde görev yapar. Su soğutma kulesinde en önemli görevi üstlenen ekipmanlardandır. Fan çapı Ø ≤ 1600 mm olan kulelerde yalnız elektrik motoru kullanılabilir; daha büyük modellerde motor ve redüktör birlikte kullanılmaktadır. Fanlarda çevre hızı 52–60 m/s dir. Elektrik motorları ve redüktörler V1 konumunda düşey flanşlı tip olarak kullanılır. Motorlar F sınıfı izolasyon ve IP56 koruma sınıfı ile toz, yağ ve neme karşı korunmaktadır.',
  'Soğutma kulesi motor ve redüktör yedek parça',
  JSON_ARRAY('yedek parça','motor','redüktör','fan grubu','soğutma kulesi'),
  JSON_OBJECT('fanHizi','52–60 m/s','fanCapi','Ø ≤ 1600 mm: yalnız motor | büyük modeller: motor + redüktör','montaj','V1 konumu, düşey flanşlı','izolasyon','F sınıfı','koruma','IP56'),
  'Motor ve Redüktör | Soğutma Kulesi Yedek Parça | Ensotek',
  'Soğutma kulesi çatı bölümünde çalışan motor ve redüktör. IP56, F sınıfı izolasyon, 52–60 m/s çevre hızı.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1503-2222-4222-8222-bbbbbbbb1503', 'tr',
  'Soğutma Kulesi Aksiyal Fan (Lüfter)',
  'sogutma-kulesi-aksiyal-fan',
  'Aksiyal fan, kulenin üst kısmındaki fan şaftında yer alır ve havayı kule boyunca hareket ettirerek buharlaşma prensibi ile soğutmayı sağlar. Dış ortamdan panjurlar üzerinden alınan hava, dolgulardan geçer ve fan bacasından atmosfere atılır. Fan kanatları cam elyaf takviyeli PP, CTP (FRP), alüminyum pultruzyon profil veya PP malzemeden üretilebilir. Farklı tip soğutma kulesi fanları temin edilebilir.',
  'Soğutma kulesi aksiyal fan yedek parça',
  JSON_ARRAY('yedek parça','fan','aksiyal fan','lüfter','fan grubu','soğutma kulesi'),
  JSON_OBJECT('konum','Kule üstü fan şaftı / fan bacası bölgesi','kanatMalzemeleri','Cam elyaf takviyeli PP | CTP (FRP) | Alüminyum pultruzyon | PP','baglantiTablasi','Alüminyum pultruzyon veya kataforez kaplı karbon çelik'),
  'Aksiyal Fan | Soğutma Kulesi Yedek Parça | Ensotek',
  'Soğutma kulesi aksiyal fan: hava akışını sağlar, dolgulardan geçirip fan bacasından atmosfere atar. PP/CTP/Alüminyum seçenekleri.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1505-2222-4222-8222-bbbbbbbb1505', 'tr',
  'Su Dağıtım Sistemi',
  'su-dagitim-sistemi',
  'Su dağıtım sistemi, kule içinde damlalık (drift eliminator) ile dolgu malzemesi arasında konumlanır ve tesisten gelen sıcak suyun dolgular üzerine eşit şekilde dağıtılmasını sağlar. Su sıcaklığı 55°C nin altındaysa ana boru ve by-pass hattı PVC malzemeden; daha yüksek sıcaklıklarda ise PP veya CTP (FRP) malzemeden uygulanır. Ana boru ve by-pass, sızdırmaz bağlantı ile üretilir; bakımda kolayca sökülüp takılabilir.',
  'Soğutma kulesi su dağıtım sistemi yedek parça',
  JSON_ARRAY('yedek parça','su dağıtım','kolektör','by-pass','soğutma kulesi'),
  JSON_OBJECT('konum','Damlalık ile dolgu arasında','sicaklikEsigi','55°C','malzeme55Alti','PVC','malzeme55Ustu','PP veya CTP (FRP)','baglanti','Sızdırmaz; bakımda kes/ekle gerektirmez'),
  'Su Dağıtım Sistemi | Soğutma Kulesi Yedek Parça | Ensotek',
  'Soğutma kulesi su dağıtım sistemi: sıcak suyu dolgulara eşit dağıtır. 55°C altı PVC; yüksek sıcaklıkta PP/CTP.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1509-2222-4222-8222-bbbbbbbb1509', 'tr',
  'PVC Petek Dolgu (Film Tipi)',
  'pvc-petek-dolgu-film-tipi',
  'PVC film tipi petek dolgu, soğutma kulelerinde su ve havanın ısı alışverişi için gerekli ısı transfer yüzeyini oluşturur. Plakalar vakumla şekillendirilir ve paket (bale) haline getirilerek blok olarak kullanılır. Maksimum 55°C sıcaklığa kadar, suyun temiz olduğu proseslerde tercih edilir. CF-12, CF-19, CF-30, CF-M ve CF-O tipleri bulunur.',
  'Soğutma kulesi PVC petek dolgu yedek parça',
  JSON_ARRAY('yedek parça','pvc petek dolgu','film dolgu','cf-12','cf-19','cf-30'),
  JSON_OBJECT('malzeme','PVC','kullanimKosulu','Temiz su; maks. 55°C','tipler','CF-12, CF-19, CF-30, CF-M, CF-O','CF-30','Arıtma tesisleri için','CF-O','Çapraz akışlı kuleler için'),
  'PVC Petek Dolgu (Film Tipi) | Soğutma Kulesi Yedek Parça | Ensotek',
  'PVC film tipi petek dolgu: yüksek yüzey alanı ile verimli ısı transferi. Temiz su ve 55°C altı; CF-12/19/30/M/O seçenekleri.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1513-2222-4222-8222-bbbbbbbb1513', 'tr',
  'Hava Giriş Panjuru',
  'hava-giris-panjuru',
  'Hava giriş panjurları, kulenin gövdesinde soğuk su havuzu ile dolgu seviyesi arasında yer alır. Kuleye giren havayı yönlendirerek dolgu yüzeyine homojen dağılımı sağlar, havuzdan sıçrayan su kaybını azaltır ve yosun oluşumunu düşürür. Lameller 1. sınıf PVC den çekme sistemiyle üretilir; minimum hava direnci sağlayan özel forma sahiptir. İstenirse FRP (CTP) malzemeden de üretilebilir.',
  'Soğutma kulesi hava giriş panjuru yedek parça',
  JSON_ARRAY('yedek parça','hava giriş panjuru','louver','lamel','soğutma kulesi'),
  JSON_OBJECT('malzeme','PVC (1. sınıf) / opsiyon: FRP (CTP)','amac','Hava yönlendirme; sıçrama kaybını azaltma; yosun önleme','tasarim','Minimum hava direncili lamel formu','uyumluluk','Yerli ve ithal paket kule tipleri'),
  'Hava Giriş Panjuru | Soğutma Kulesi Yedek Parça | Ensotek',
  'Hava giriş panjuru: havayı yönlendirir, su sıçrama kaybını ve yosun oluşumunu azaltır. PVC lamel; opsiyonel FRP.',
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
-- SPARE PARTS I18N — EN
-- =============================================================

INSERT INTO `product_i18n` (
  `product_id`, `locale`, `title`, `slug`, `description`,
  `alt`, `tags`, `specifications`, `meta_title`, `meta_description`,
  `created_at`, `updated_at`
) VALUES
(
  'bbbb1501-2222-4222-8222-bbbbbbbb1501', 'en',
  'Motor and Reducer (Fan Group)',
  'motor-and-reducer-fan-group',
  'The motor and reducer operate as a group with the fan and fan stack on the tower deck. They are among the most critical components of a water cooling tower. Units with fan diameter Ø ≤ 1600 mm may use only an electric motor; larger units use motor and reducer together. Fan peripheral speed is 52–60 m/s. Motors and reducers are used in V1 vertical flange configuration. Motors are Class F insulated and IP56 protected against dust, oil and moisture.',
  'Cooling tower motor and reducer spare part',
  JSON_ARRAY('spare part','motor','reducer','fan group','cooling tower'),
  JSON_OBJECT('fanSpeed','52–60 m/s','fanDiameterNote','Ø ≤ 1600 mm: motor only | larger: motor + reducer','mounting','V1 vertical flange','insulation','Class F','protection','IP56'),
  'Motor and Reducer | Cooling Tower Spare Parts | Ensotek',
  'Motor and reducer group operating with fan and fan stack. IP56, Class F insulation, 52–60 m/s peripheral speed.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1503-2222-4222-8222-bbbbbbbb1503', 'en',
  'Cooling Tower Axial Fan',
  'cooling-tower-axial-fan',
  'The axial fan is installed in the fan shaft at the top of the tower. It drives airflow through the tower to enable evaporative cooling. Air is drawn through louvers, passes through the fill media and is discharged to the atmosphere through the fan stack. Fan blades can be manufactured from glass-fiber reinforced PP, FRP (CTP), aluminum pultrusion profiles or PP. Various cooling tower fan types are available.',
  'Cooling tower axial fan spare part',
  JSON_ARRAY('spare part','fan','axial fan','fan group','cooling tower'),
  JSON_OBJECT('location','Top fan shaft / fan stack area','bladeMaterials','Glass fiber reinforced PP | FRP (CTP) | Aluminum pultrusion | PP','connectionPlate','Aluminum pultrusion or cataphoresis-coated carbon steel'),
  'Axial Fan | Cooling Tower Spare Parts | Ensotek',
  'Cooling tower axial fan: drives airflow through louvers and fill media. PP/CTP/Aluminum blade options.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1505-2222-4222-8222-bbbbbbbb1505', 'en',
  'Water Distribution System',
  'water-distribution-system',
  'The water distribution system is located inside the tower between the drift eliminator and the fill media. It ensures uniform distribution of hot water from the plant onto the fills. When water temperature is below 55°C the main pipe and bypass are applied in PVC; for higher temperatures PP or FRP (CTP) is used. The main pipe and bypass are produced with leak-tight connections for easy maintenance without cutting or splicing.',
  'Cooling tower water distribution system spare part',
  JSON_ARRAY('spare part','water distribution','collector','bypass','cooling tower'),
  JSON_OBJECT('location','Between drift eliminator and fill media','temperatureThreshold','55°C','materialBelow55C','PVC','materialAbove55C','PP or FRP (CTP)','connection','Leak-tight; no cutting/splicing for maintenance'),
  'Water Distribution System | Cooling Tower Spare Parts | Ensotek',
  'Cooling tower water distribution system: distributes hot water uniformly onto fill media. PVC below 55°C; PP/FRP above 55°C.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1509-2222-4222-8222-bbbbbbbb1509', 'en',
  'PVC Film Fill',
  'pvc-film-fill',
  'PVC film fill provides the heat transfer surface required for water-to-air exchange in cooling towers. Sheets are vacuum-formed and assembled into blocks (bales) for installation. Used in clean-water processes up to 55°C. High surface area yields superior efficiency. Types available: CF-12, CF-19, CF-30, CF-M and CF-O. CF-30 is common in wastewater treatment; CF-O is used in crossflow towers.',
  'Cooling tower PVC film fill spare part',
  JSON_ARRAY('spare part','PVC film fill','fill media','CF-12','CF-19','CF-30'),
  JSON_OBJECT('material','PVC','recommendedProcess','Clean water; up to 55°C','types','CF-12, CF-19, CF-30, CF-M, CF-O','CF-30','Wastewater treatment (biological)','CF-O','Crossflow towers'),
  'PVC Film Fill | Cooling Tower Spare Parts | Ensotek',
  'PVC film fill for clean-water processes up to 55°C. Available in CF-12/19/30/M/O types.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1513-2222-4222-8222-bbbbbbbb1513', 'en',
  'Air Inlet Louvers',
  'air-inlet-louvers',
  'Air inlet louvers are installed on the tower casing between the cold-water basin and the fill level. They direct incoming air for uniform distribution across the fill, reduce splash water losses from the basin, and limit sunlight to reduce algae formation. Louvers are manufactured from first-grade PVC with a special low-resistance profile. FRP option available on request. Suitable for packaged tower types.',
  'Cooling tower air inlet louvers spare part',
  JSON_ARRAY('spare part','air inlet louvers','louver','splash loss','cooling tower'),
  JSON_OBJECT('material','First-grade PVC / optional: FRP','purpose','Air guidance; reduce splash loss; reduce algae','design','Special low-resistance louver profile','compatibility','Packaged tower types'),
  'Air Inlet Louvers | Cooling Tower Spare Parts | Ensotek',
  'Air inlet louvers guide airflow, reduce splash losses and help limit algae growth. PVC standard; optional FRP.',
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
-- SPARE PARTS I18N — DE
-- =============================================================

INSERT INTO `product_i18n` (
  `product_id`, `locale`, `title`, `slug`, `description`,
  `alt`, `tags`, `specifications`, `meta_title`, `meta_description`,
  `created_at`, `updated_at`
) VALUES
(
  'bbbb1501-2222-4222-8222-bbbbbbbb1501', 'de',
  'Motor und Getriebe (Lüftergruppe)',
  'motor-und-getriebe-lueftergruppe',
  'Motor und Getriebe arbeiten an der Turmspitze gemeinsam mit Ventilator und Ventilatorstapel. Sie übernehmen eine zentrale Aufgabe im Kühlturm. Türme mit Ventilatordurchmesser Ø ≤ 1600 mm werden nur mit Elektromotor verwendet; größere Anlagen mit Motor und Getriebe. Umfangsgeschwindigkeit: 52–60 m/s. Einbau in V1-Position als vertikale Flanschausführung. Schutzart IP56, Isolationsklasse F gegen Staub, Öl und Feuchtigkeit.',
  'Kühlturm Motor und Getriebe Ersatzteil',
  JSON_ARRAY('ersatzteil','motor','getriebe','lueftergruppe','kuehlturm'),
  JSON_OBJECT('umfangsgeschwindigkeit','52–60 m/s','durchmesserHinweis','Ø ≤ 1600 mm: nur Motor | größer: Motor + Getriebe','montage','V1 vertikale Flanschausführung','isolation','Klasse F','schutzart','IP56'),
  'Motor und Getriebe | Kühlturm Ersatzteile | Ensotek',
  'Motor- und Getriebeeinheit für Kühltürme: IP56, Klasse F, 52–60 m/s Umfangsgeschwindigkeit.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1503-2222-4222-8222-bbbbbbbb1503', 'de',
  'Axialventilator (Lüfter) für Kühltürme',
  'axialventilator-fuer-kuehltuerme',
  'Der Axialventilator befindet sich im Lüfterschacht oben auf dem Turm. Er sorgt dafür, dass die Luft durch den Turm strömt und damit die Verdunstungskühlung wirksam wird. Luft wird über Jalousien angesaugt, strömt durch die Füllkörper und wird über den Lüfterkamin ausgestoßen. Flügel werden aus glasfaserverstärktem PP, FRP (CTP), Aluminium-Pultrusionsprofil oder PP gefertigt.',
  'Axialventilator für Kühltürme Ersatzteil',
  JSON_ARRAY('ersatzteil','axialventilator','luefter','lueftergruppe','kuehlturm'),
  JSON_OBJECT('einbauort','Lüfterschacht oben am Turm','fluegelMaterial','Glasfaserverstärktes PP | FRP (CTP) | Aluminium-Pultrusionsprofil | PP','verbindung','Aluminium-Pultrusionsprofil oder kataphoretisch beschichteter Kohlenstoffstahl'),
  'Axialventilator | Kühlturm Ersatzteile | Ensotek',
  'Axialventilator für Kühltürme: führt Luft durch Füllkörper und Lüfterkamin. Mehrere Materialoptionen.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1505-2222-4222-8222-bbbbbbbb1505', 'de',
  'Wasserverteilungssystem',
  'wasserverteilungssystem',
  'Das Wasserverteilungssystem befindet sich im Turm zwischen Tropfenabscheider und Füllkörpern. Es sorgt für die gleichmäßige Verteilung von heißem Wasser auf die Füllungen. Unter 55°C bestehen Hauptrohr und Bypass aus PVC; bei höheren Temperaturen aus PP oder FRP (CTP). Dichtende Verbindungen ermöglichen einfache Montage/Demontage ohne Schneiden.',
  'Wasserverteilungssystem für Kühltürme Ersatzteil',
  JSON_ARRAY('ersatzteil','wasserverteilung','sammler','bypass','kuehlturm'),
  JSON_OBJECT('einbauort','Zwischen Tropfenabscheider und Füllkörpern','temperaturSchwelle','55°C','materialUnter55C','PVC','materialUeber55C','PP oder FRP (CTP)','verbindung','Dichtend; ohne Schneiden montierbar'),
  'Wasserverteilungssystem | Kühlturm Ersatzteile | Ensotek',
  'Wasserverteilungssystem: gleichmäßige Verteilung auf Füllkörper. PVC unter 55°C, PP/FRP darüber.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1509-2222-4222-8222-bbbbbbbb1509', 'de',
  'PVC Folienfüllung (Filmfüllung)',
  'pvc-folienfuellung-filmfuellung',
  'Die PVC-Folienfüllung bildet die Wärmeübertragungsfläche im Kühlturm. Die Folienplatten werden im Vakuum geformt und zu Blöcken zusammengefügt. Einsatz in Prozessen mit sauberem Wasser bis 55°C. Typen: CF-12, CF-19, CF-30, CF-M und CF-O. CF-30 für Kläranlagen; CF-O für Querstromkühltürme.',
  'Kühlturm PVC Folienfüllung Ersatzteil',
  JSON_ARRAY('ersatzteil','pvc folienfuellung','filmfuellung','cf-12','cf-19','cf-30'),
  JSON_OBJECT('material','PVC','einsatz','Sauberes Wasser; bis 55°C','typen','CF-12, CF-19, CF-30, CF-M, CF-O','CF-30','Kläranlagen (biologisch)','CF-O','Querstromkühltürme'),
  'PVC Folienfüllung | Kühlturm Ersatzteile | Ensotek',
  'PVC Filmfüllung für sauberes Wasser bis 55°C. Typen CF-12/19/30/M/O verfügbar.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  'bbbb1513-2222-4222-8222-bbbbbbbb1513', 'de',
  'Lufteinlasslamellen',
  'lufteinlasslamellen',
  'Lufteinlasslamellen befinden sich am Turmkörper zwischen Kaltwasserbecken und Füllhöhe. Sie führen die einströmende Luft gleichmäßig über den Füllkörper, reduzieren Spritzwasserverluste und begrenzen Sonnenlicht zur Verringerung der Algenbildung. Lamellen aus PVC (1. Klasse) mit minimalem Luftwiderstand; optional FRP. Geeignet für Paketkühltürme.',
  'Lufteinlasslamellen für Kühltürme Ersatzteil',
  JSON_ARRAY('ersatzteil','lufteinlasslamellen','louver','spritzwasser','kuehlturm'),
  JSON_OBJECT('material','PVC (1. Klasse) / optional: FRP','zweck','Luftführung; Spritzwasser reduzieren; Algen verringern','design','Lamellenprofil mit minimalem Luftwiderstand','kompatibilitaet','Paketkühltürme'),
  'Lufteinlasslamellen | Kühlturm Ersatzteile | Ensotek',
  'Lufteinlasslamellen: Luftführung, Spritzwasserverluste und Algenbildung reduzieren. PVC Standard, optional FRP.',
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
