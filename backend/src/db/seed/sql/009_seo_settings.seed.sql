-- =============================================================
-- FILE: 009_seo_settings.seed.sql
-- Sayfa bazlı SEO ayarları + llms.txt
-- module_key: site_settings.key = 'seo_pages' | 'llms_txt'
-- Locale bazlı (tr/en/de)
-- Admin panel /admin/site-settings/seo_pages üzerinden düzenlenir
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- =============================================================
-- 1) seo_pages — sayfa bazlı SEO (TR)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'seo_pages', 'tr', JSON_OBJECT(
  'home', JSON_OBJECT(
    'title', 'Ensotek — Endüstriyel Soğutma Kulesi Sistemleri',
    'description', 'Açık devre, kapalı devre ve evaporatif soğutma kuleleri. ISO 9001 sertifikalı, 40+ yıl deneyim. Türkiye''nin en büyük soğutma kulesi üretim tesisi.',
    'og_image', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1752786288/uploads/metahub/about-images/closed-circuit-water-cooling-towers1-1752786287184-840184158.webp',
    'no_index', false
  ),
  'product', JSON_OBJECT(
    'title', 'Soğutma Kulesi Ürünleri | Ensotek',
    'description', 'Ensotek soğutma kulesi ürün gamı: açık devre, kapalı devre, CTP, DCTP, TCTP serileri. Türkiye''nin lider üreticisinden teknik özellikler ve katalog.',
    'og_image', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321557/products/cover/open-circuit-ctp-single-1-250x250-1.png',
    'no_index', false
  ),
  'sparepart', JSON_OBJECT(
    'title', 'Soğutma Kulesi Yedek Parçaları | Ensotek',
    'description', 'Fan, motor, dolgu, su dağıtım, hava panjuru ve diğer soğutma kulesi yedek parçaları. Orijinal Ensotek parçalarıyla uzun ömürlü işletme.',
    'og_image', 'https://www.ensotek.de/uploads/material/ensotek-sogutma-kulesi-motor-fan-grubu-mekanik-250x250-1.jpg',
    'no_index', false
  ),
  'service', JSON_OBJECT(
    'title', 'Servis ve Bakım | Ensotek',
    'description', 'Soğutma kulesi kurulum, bakım, su şartlandırma ve revizyon hizmetleri. 7/24 teknik destek.',
    'og_image', '',
    'no_index', false
  ),
  'solutions', JSON_OBJECT(
    'title', 'Endüstriyel Soğutma Çözümleri | Ensotek',
    'description', 'Enerji santrali, petrokimya, çimento, gıda ve metal sanayisi için özel soğutma çözümleri.',
    'og_image', '',
    'no_index', false
  ),
  'about', JSON_OBJECT(
    'title', 'Hakkımızda — 40 Yıllık Endüstriyel Deneyim | Ensotek',
    'description', 'Ensotek, 1986''dan bu yana ISO 9001 sertifikalı üretici olarak 3.000''den fazla soğutma kulesi kurulumu tamamladı. Türkiye''nin en büyük soğutma kulesi üretim tesisi.',
    'og_image', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1752786288/uploads/metahub/about-images/closed-circuit-water-cooling-towers1-1752786287184-840184158.webp',
    'no_index', false
  ),
  'team', JSON_OBJECT(
    'title', 'Ekibimiz | Ensotek',
    'description', 'Ensotek mühendislik ve servis ekibi.',
    'og_image', '',
    'no_index', false
  ),
  'mission_vision', JSON_OBJECT(
    'title', 'Misyonumuz & Vizyonumuz | Ensotek',
    'description', 'Ensotek''in soğutma kulesi sektöründe yenilikçi, sürdürülebilir ve müşteri odaklı yaklaşımı.',
    'og_image', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1757875082/uploads/ensotek/about-images/russia-cooling-tower-1757875080869-645546842.webp',
    'no_index', false
  ),
  'quality', JSON_OBJECT(
    'title', 'Kalite Belgelerimiz | Ensotek',
    'description', 'ISO 9001:2015, ISO 14001, ISO 45001, CE, EAC sertifikalı kalite yönetim sistemi.',
    'og_image', 'https://www.ensotek.de/uploads/zertifika/iso-9001.jpg',
    'no_index', false
  ),
  'news', JSON_OBJECT(
    'title', 'Haberler | Ensotek',
    'description', 'Ensotek''ten güncel haberler, sektör gelişmeleri ve duyurular.',
    'og_image', '',
    'no_index', false
  ),
  'blog', JSON_OBJECT(
    'title', 'Bilgi Bankası — Soğutma Kulesi Rehberleri | Ensotek',
    'description', 'Soğutma kulesi seçimi, Legionella önleme, CTP/FRP gövde, su şartlandırma ve endüstriyel bakım rehberleri.',
    'og_image', '',
    'no_index', false
  ),
  'library', JSON_OBJECT(
    'title', 'Teknik Dokümanlar | Ensotek',
    'description', 'Soğutma kulesi katalogları, teknik kılavuzlar ve teknik veri sayfaları.',
    'og_image', '',
    'no_index', false
  ),
  'faqs', JSON_OBJECT(
    'title', 'Sık Sorulan Sorular | Ensotek',
    'description', 'Soğutma kulesi seçimi, kapasite hesaplama, bakım ve sık sorulan teknik soruların cevapları.',
    'og_image', '',
    'no_index', false
  ),
  'contact', JSON_OBJECT(
    'title', 'İletişim | Ensotek',
    'description', 'Ensotek İstanbul merkez ofisi ve Ankara fabrikası. Telefon, e-posta ve iletişim formu.',
    'og_image', '',
    'no_index', false
  ),
  'offer', JSON_OBJECT(
    'title', 'Teklif İste | Ensotek',
    'description', 'Soğutma kulesi projeniz için ücretsiz teknik teklif alın. Ensotek mühendislik ekibi en uygun çözümü sunar.',
    'og_image', '',
    'no_index', false
  ),
  'legal', JSON_OBJECT(
    'title', 'Yasal Bilgiler | Ensotek',
    'description', 'Kullanım koşulları, gizlilik politikası, KVKK aydınlatma metni.',
    'og_image', '',
    'no_index', true
  )
), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- 2) seo_pages (EN)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'seo_pages', 'en', JSON_OBJECT(
  'home', JSON_OBJECT(
    'title', 'Ensotek — Industrial Cooling Tower Systems',
    'description', 'Open circuit, closed circuit and evaporative cooling towers. ISO 9001 certified, 40+ years of experience. Turkey''s largest cooling tower production facility.',
    'og_image', 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1752786288/uploads/metahub/about-images/closed-circuit-water-cooling-towers1-1752786287184-840184158.webp',
    'no_index', false
  ),
  'product', JSON_OBJECT(
    'title', 'Cooling Tower Products | Ensotek',
    'description', 'Ensotek cooling tower lineup: open circuit, closed circuit, CTP, DCTP, TCTP series. Technical specs and catalog from Turkey''s leading manufacturer.',
    'og_image', '',
    'no_index', false
  ),
  'sparepart', JSON_OBJECT(
    'title', 'Cooling Tower Spare Parts | Ensotek',
    'description', 'Fans, motors, fills, water distribution, air louvers and other cooling tower spare parts. Genuine Ensotek parts for long-term operation.',
    'og_image', '',
    'no_index', false
  ),
  'service', JSON_OBJECT(
    'title', 'Service & Maintenance | Ensotek',
    'description', 'Cooling tower installation, maintenance, water treatment and revision services. 24/7 technical support.',
    'og_image', '',
    'no_index', false
  ),
  'solutions', JSON_OBJECT(
    'title', 'Industrial Cooling Solutions | Ensotek',
    'description', 'Tailored cooling solutions for power, petrochemical, cement, food and metal industries.',
    'og_image', '',
    'no_index', false
  ),
  'about', JSON_OBJECT(
    'title', 'About Us — 40+ Years of Industrial Excellence | Ensotek',
    'description', 'Ensotek has been ISO 9001 certified since 1986 with over 3,000 cooling tower installations. Turkey''s largest cooling tower production facility.',
    'og_image', '',
    'no_index', false
  ),
  'team', JSON_OBJECT(
    'title', 'Our Team | Ensotek',
    'description', 'Ensotek engineering and service team.',
    'og_image', '',
    'no_index', false
  ),
  'mission_vision', JSON_OBJECT(
    'title', 'Mission & Vision | Ensotek',
    'description', 'Ensotek''s innovative, sustainable and customer-focused approach to the cooling tower industry.',
    'og_image', '',
    'no_index', false
  ),
  'quality', JSON_OBJECT(
    'title', 'Quality Certificates | Ensotek',
    'description', 'ISO 9001:2015, ISO 14001, ISO 45001, CE, EAC certified quality management system.',
    'og_image', '',
    'no_index', false
  ),
  'news', JSON_OBJECT(
    'title', 'News | Ensotek',
    'description', 'Latest news, industry updates and announcements from Ensotek.',
    'og_image', '',
    'no_index', false
  ),
  'blog', JSON_OBJECT(
    'title', 'Knowledge Base — Cooling Tower Guides | Ensotek',
    'description', 'Cooling tower selection, Legionella prevention, FRP body, water treatment and industrial maintenance guides.',
    'og_image', '',
    'no_index', false
  ),
  'library', JSON_OBJECT(
    'title', 'Technical Documents | Ensotek',
    'description', 'Cooling tower catalogs, technical manuals and datasheets.',
    'og_image', '',
    'no_index', false
  ),
  'faqs', JSON_OBJECT(
    'title', 'Frequently Asked Questions | Ensotek',
    'description', 'Answers to common technical questions about cooling tower selection, capacity calculation and maintenance.',
    'og_image', '',
    'no_index', false
  ),
  'contact', JSON_OBJECT(
    'title', 'Contact | Ensotek',
    'description', 'Ensotek Istanbul headquarters and Ankara factory. Phone, email and contact form.',
    'og_image', '',
    'no_index', false
  ),
  'offer', JSON_OBJECT(
    'title', 'Request Quote | Ensotek',
    'description', 'Get a free technical quote for your cooling tower project. Ensotek engineers deliver the best fit.',
    'og_image', '',
    'no_index', false
  ),
  'legal', JSON_OBJECT(
    'title', 'Legal Information | Ensotek',
    'description', 'Terms of use, privacy policy and cookie disclosure.',
    'og_image', '',
    'no_index', true
  )
), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = CURRENT_TIMESTAMP(3);

-- =============================================================
-- 3) llms_txt — AI/LLM crawler için site bilgi metni
--    /llms.txt rotasında frontend tarafından servis edilir
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'llms_txt', '*', JSON_QUOTE(CONCAT(
  '# Ensotek — Industrial Cooling Tower Systems\n\n',
  '> Turkey''s largest cooling tower manufacturer. ISO 9001 certified since 1986. 40+ years of experience in open-circuit, closed-circuit and evaporative cooling tower systems.\n\n',
  'Ensotek (ENSOTEK Su Soğutma Kuleleri ve Teknolojileri Mühendislik San.Tic. Ltd. Şti.) designs and manufactures FRP (CTP/GFK) cooling towers for industrial and HVAC applications. Production facility in Ankara; headquarters in Istanbul.\n\n',
  '## Products\n',
  '- [Açık Tip Su Soğutma Kuleleri (CTP/DCTP/TCTP)](https://www.ensotek.com.tr/tr/urunler): Open-circuit cooling towers, single/double/triple cell, capacity 90.000 — 10.400.000 kcal/h.\n',
  '- [Kapalı Tip Su Soğutma Kuleleri (CC CTP)](https://www.ensotek.com.tr/tr/urunler/kapali-tip-su-sogutma-kuleleri-cc-ctp-cc-dctp): Closed-circuit cooling towers for sensitive process water.\n',
  '- Yedek parça: motor, fan, dolgu, su dağıtım sistemi, hava panjuru.\n\n',
  '## Knowledge Base\n',
  '- [Su Soğutma Kulesi Temelleri](https://www.ensotek.com.tr/tr/blog/su-sogutma-kulesi-temelleri): Working principles, classifications, design parameters.\n',
  '- [Açık Tip Çalışma Prensibi](https://www.ensotek.com.tr/tr/blog/acik-tip-su-sogutma-kulesi-calisma-prensibi)\n',
  '- [Kapalı Çevrim Çalışma Prensibi](https://www.ensotek.com.tr/tr/blog/kapali-cevrim-su-sogutma-kulesi-calisma-prensibi)\n',
  '- [Kule Seçimi İçin Gerekli Bilgiler](https://www.ensotek.com.tr/tr/blog/kule-secimi-icin-gerekli-bilgiler)\n',
  '- [Türkiye Yaz Tasarım Sıcaklıkları](https://www.ensotek.com.tr/tr/blog/yaz-kuru-yas-termometre-tasarim-degerleri)\n\n',
  '## Company\n',
  '- [Hakkımızda](https://www.ensotek.com.tr/tr/kurumsal): Company overview and history.\n',
  '- [Kalite Belgeleri](https://www.ensotek.com.tr/tr/kurumsal): ISO 9001, ISO 14001, ISO 45001, CE, EAC.\n',
  '- [Referanslar](https://www.ensotek.com.tr/tr/referanslar): 28 enterprise customers across energy, petrochemicals, cement, food, steel, automotive, retail and corporate sectors.\n\n',
  '## Contact\n',
  '- Telefon / WhatsApp: +90 531 880 31 51, +90 531 880 32 15\n',
  '- E-posta: ensotek@ensotek.com.tr, export@ensotek.com.tr\n',
  '- Merkez: Oruçreis Mah. Tekstilkent Sit. A17 Blok No:41, 34235 Esenler / İstanbul\n',
  '- Fabrika: Saray Mah., Gimat Cad. No:6A, 06980 Kahramankazan / Ankara\n'
)), CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = CURRENT_TIMESTAMP(3);

COMMIT;
