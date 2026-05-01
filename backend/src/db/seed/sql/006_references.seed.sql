-- =============================================================
-- FILE: 006_references.seed.sql
-- Ensotek - Referanslar (Logolu) — Domestic firmalar
-- ✅ category_id NULL (FK dependency yok)
-- ✅ Cloudinary logo URL'leri
-- ✅ TR + EN i18n
-- ensotek_de'den uyarlandı; sub_category_id kolonu yoktur, atlanmıştır
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- =============================================================
-- 1) PARENT: references
-- =============================================================
INSERT INTO `references`
  (`id`, `is_published`, `is_featured`, `display_order`, `featured_image`, `featured_image_asset_id`, `website_url`, `category_id`, `created_at`, `updated_at`)
VALUES
  -- ENERJİ
  ('7b1b5201-0001-4222-8222-520100000001', 1, 1, 101, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587788/uploads/ensotek/Enerjisa_Logo_1_.jpg', NULL, 'https://www.enerjisa.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5201-0002-4222-8222-520100000002', 1, 0, 102, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587787/uploads/ensotek/aksaenerji.jpg', NULL, 'https://www.aksaenerji.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5201-0003-4222-8222-520100000003', 1, 0, 103, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587786/uploads/ensotek/zorluenerji.png', NULL, 'https://www.zorluenerji.com.tr', NULL, NOW(3), NOW(3)),
  -- PETROKİMYA
  ('7b1b5202-0001-4222-8222-520200000001', 1, 1, 201, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587784/uploads/ensotek/tupras-logo.webp', NULL, 'https://www.tupras.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5202-0002-4222-8222-520200000002', 1, 0, 202, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587783/uploads/ensotek/petkim.jpg', NULL, 'https://www.petkim.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5202-0004-4222-8222-520200000004', 1, 0, 204, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587783/uploads/ensotek/aygaz-798.webp', NULL, 'https://www.aygaz.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5202-0005-4222-8222-520200000005', 1, 0, 205, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587782/uploads/ensotek/socar.jpg', NULL, 'https://www.socar.com.tr', NULL, NOW(3), NOW(3)),
  -- ÇİMENTO
  ('7b1b5203-0001-4222-8222-520300000001', 1, 1, 301, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587708/uploads/ensotek/oyakcimonto.jpg', NULL, 'https://www.oyakcimento.com', NULL, NOW(3), NOW(3)),
  ('7b1b5203-0004-4222-8222-520300000004', 1, 0, 304, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587707/uploads/ensotek/cimsa-logo.jpg', NULL, 'https://www.cimsa.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5203-0005-4222-8222-520300000005', 1, 0, 305, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587707/uploads/ensotek/nuhcimonto.png', NULL, 'https://www.nuhcimento.com.tr', NULL, NOW(3), NOW(3)),
  -- GIDA / İÇECEK
  ('7b1b5204-0001-4222-8222-520400000001', 1, 1, 401, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587706/uploads/ensotek/ulker_logo.jpg', NULL, 'https://www.ulker.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5204-0002-4222-8222-520400000002', 1, 0, 402, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587706/uploads/ensotek/Eti_logosu.jpg', NULL, 'https://www.etietieti.com', NULL, NOW(3), NOW(3)),
  ('7b1b5204-0004-4222-8222-520400000004', 1, 0, 404, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587703/uploads/ensotek/pinar.png', NULL, 'https://www.pinar.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5204-0005-4222-8222-520400000005', 1, 0, 405, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587703/uploads/ensotek/anadoluefes.png', NULL, 'https://www.anadoluefes.com', NULL, NOW(3), NOW(3)),
  -- ÇELİK / METAL
  ('7b1b5205-0001-4222-8222-520500000001', 1, 1, 501, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587702/uploads/ensotek/erdemir.png', NULL, 'https://www.erdemir.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5205-0004-4222-8222-520500000004', 1, 0, 504, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587700/uploads/ensotek/kardemir.png', NULL, 'https://www.kardemir.com.tr', NULL, NOW(3), NOW(3)),
  -- OTOMOTİV
  ('7b1b5206-0001-4222-8222-520600000001', 1, 1, 601, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587699/uploads/ensotek/ford.jpg', NULL, 'https://www.fordotosan.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5206-0002-4222-8222-520600000002', 1, 0, 602, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587698/uploads/ensotek/tofas.png', NULL, 'https://www.tofas.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5206-0004-4222-8222-520600000004', 1, 0, 604, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587697/uploads/ensotek/oyak.png', NULL, 'https://www.oyak.com.tr', NULL, NOW(3), NOW(3)),
  -- AVM / TİCARİ
  ('7b1b5207-0002-4222-8222-520700000002', 1, 0, 702, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587694/uploads/ensotek/r_nasans.png', NULL, 'https://www.renesans.com', NULL, NOW(3), NOW(3)),
  ('7b1b5207-0003-4222-8222-520700000003', 1, 0, 703, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587691/uploads/ensotek/zorlu.jpg', NULL, 'https://www.zorlu.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5207-0004-4222-8222-520700000004', 1, 0, 704, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587690/uploads/ensotek/enka-insaat--600.png', NULL, 'https://www.enka.com', NULL, NOW(3), NOW(3)),
  -- VERİ MERKEZİ / HASTANE
  ('7b1b5208-0001-4222-8222-520800000001', 1, 1, 801, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587690/uploads/ensotek/t_rkcell.png', NULL, 'https://www.turkcell.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5208-0002-4222-8222-520800000002', 1, 0, 802, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587689/uploads/ensotek/telekom.png', NULL, 'https://www.turktelekom.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5208-0003-4222-8222-520800000003', 1, 0, 803, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587688/uploads/ensotek/acibadem.png', NULL, 'https://www.acibadem.com.tr', NULL, NOW(3), NOW(3)),
  -- KURUMSAL
  ('7b1b5209-0001-4222-8222-520900000001', 1, 1, 901, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587686/uploads/ensotek/sisecam.png', NULL, 'https://www.sisecam.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5209-0002-4222-8222-520900000002', 1, 0, 902, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587685/uploads/ensotek/aselsan.png', NULL, 'https://www.aselsan.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5209-0004-4222-8222-520900000004', 1, 0, 904, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587685/uploads/ensotek/arcelik_ece81e6627.webp', NULL, 'https://www.arcelik.com.tr', NULL, NOW(3), NOW(3)),
  ('7b1b5209-0005-4222-8222-520900000005', 1, 0, 905, 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1770587684/uploads/ensotek/vestel.png', NULL, 'https://www.vestel.com.tr', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  is_published = VALUES(is_published),
  is_featured = VALUES(is_featured),
  display_order = VALUES(display_order),
  featured_image = VALUES(featured_image),
  website_url = VALUES(website_url),
  updated_at = VALUES(updated_at);

-- =============================================================
-- 2) I18N: TR
-- =============================================================
INSERT INTO `references_i18n`
  (`id`, `reference_id`, `locale`, `title`, `slug`, `summary`, `content`, `featured_image_alt`, `meta_title`, `meta_description`, `created_at`, `updated_at`)
VALUES
  ('8a8a5201-0001-4222-8222-520100000001', '7b1b5201-0001-4222-8222-520100000001', 'tr', 'Enerjisa', 'enerjisa', 'Enerji santrali ve üretim altyapıları için kurumsal referans.', '<p>Enerji üretim tesislerinde iklimlendirme, proses soğutma ve endüstriyel altyapı ihtiyaçları kapsamında uygulanan çözümler için referans kaydı.</p>', 'Enerjisa logo', 'Enerjisa | Referans', 'Enerji santralleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5201-0002-4222-8222-520100000002', '7b1b5201-0002-4222-8222-520100000002', 'tr', 'Aksa Enerji', 'aksa-enerji', 'Enerji santrali ve üretim altyapıları için kurumsal referans.', '<p>Enerji üretim tesislerinde iklimlendirme, proses soğutma ve endüstriyel altyapı ihtiyaçları kapsamında uygulanan çözümler için referans kaydı.</p>', 'Aksa Enerji logo', 'Aksa Enerji | Referans', 'Enerji santralleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5201-0003-4222-8222-520100000003', '7b1b5201-0003-4222-8222-520100000003', 'tr', 'Zorlu Enerji', 'zorlu-enerji', 'Enerji santrali ve üretim altyapıları için kurumsal referans.', '<p>Enerji üretim tesislerinde iklimlendirme, proses soğutma ve endüstriyel altyapı ihtiyaçları kapsamında uygulanan çözümler için referans kaydı.</p>', 'Zorlu Enerji logo', 'Zorlu Enerji | Referans', 'Enerji santralleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5202-0001-4222-8222-520200000001', '7b1b5202-0001-4222-8222-520200000001', 'tr', 'Tüpraş', 'tupras', 'Petrokimya ve kimya tesisleri için kurumsal referans.', '<p>Petrokimya ve kimya tesislerinde proses güvenliği, verimlilik ve sürdürülebilirlik odaklı endüstriyel çözümler kapsamında referans kaydı.</p>', 'Tüpraş logo', 'Tüpraş | Referans', 'Petrokimya ve kimya tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5202-0002-4222-8222-520200000002', '7b1b5202-0002-4222-8222-520200000002', 'tr', 'Petkim', 'petkim', 'Petrokimya ve kimya tesisleri için kurumsal referans.', '<p>Petrokimya ve kimya tesislerinde proses güvenliği, verimlilik ve sürdürülebilirlik odaklı endüstriyel çözümler kapsamında referans kaydı.</p>', 'Petkim logo', 'Petkim | Referans', 'Petrokimya ve kimya tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5202-0004-4222-8222-520200000004', '7b1b5202-0004-4222-8222-520200000004', 'tr', 'Aygaz', 'aygaz', 'Petrokimya ve kimya tesisleri için kurumsal referans.', '<p>Petrokimya ve kimya tesislerinde proses güvenliği, verimlilik ve sürdürülebilirlik odaklı endüstriyel çözümler kapsamında referans kaydı.</p>', 'Aygaz logo', 'Aygaz | Referans', 'Petrokimya ve kimya tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5202-0005-4222-8222-520200000005', '7b1b5202-0005-4222-8222-520200000005', 'tr', 'SOCAR Turkey', 'socar-turkey', 'Petrokimya ve kimya tesisleri için kurumsal referans.', '<p>Petrokimya ve kimya tesislerinde proses güvenliği, verimlilik ve sürdürülebilirlik odaklı endüstriyel çözümler kapsamında referans kaydı.</p>', 'SOCAR logo', 'SOCAR Turkey | Referans', 'Petrokimya ve kimya tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5203-0001-4222-8222-520300000001', '7b1b5203-0001-4222-8222-520300000001', 'tr', 'OYAK Çimento', 'oyak-cimento', 'Çimento ve madencilik operasyonları için kurumsal referans.', '<p>Çimento ve madencilik tesislerinde zorlu saha koşullarına uygun, yüksek dayanımlı endüstriyel uygulamalar kapsamında referans kaydı.</p>', 'OYAK Çimento logo', 'OYAK Çimento | Referans', 'Çimento ve madencilik tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5203-0004-4222-8222-520300000004', '7b1b5203-0004-4222-8222-520300000004', 'tr', 'Çimsa', 'cimsa', 'Çimento ve madencilik operasyonları için kurumsal referans.', '<p>Çimento ve madencilik tesislerinde zorlu saha koşullarına uygun, yüksek dayanımlı endüstriyel uygulamalar kapsamında referans kaydı.</p>', 'Çimsa logo', 'Çimsa | Referans', 'Çimento ve madencilik tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5203-0005-4222-8222-520300000005', '7b1b5203-0005-4222-8222-520300000005', 'tr', 'Nuh Çimento', 'nuh-cimento', 'Çimento ve madencilik operasyonları için kurumsal referans.', '<p>Çimento ve madencilik tesislerinde zorlu saha koşullarına uygun, yüksek dayanımlı endüstriyel uygulamalar kapsamında referans kaydı.</p>', 'Nuh Çimento logo', 'Nuh Çimento | Referans', 'Çimento ve madencilik tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5204-0001-4222-8222-520400000001', '7b1b5204-0001-4222-8222-520400000001', 'tr', 'Ülker', 'ulker', 'Gıda ve içecek üretim tesisleri için kurumsal referans.', '<p>Gıda ve içecek üretim tesislerinde hijyen, enerji verimliliği ve operasyon sürekliliği odaklı uygulamalar kapsamında referans kaydı.</p>', 'Ülker logo', 'Ülker | Referans', 'Gıda ve içecek tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5204-0002-4222-8222-520400000002', '7b1b5204-0002-4222-8222-520400000002', 'tr', 'Eti', 'eti', 'Gıda ve içecek üretim tesisleri için kurumsal referans.', '<p>Gıda ve içecek üretim tesislerinde hijyen, enerji verimliliği ve operasyon sürekliliği odaklı uygulamalar kapsamında referans kaydı.</p>', 'Eti logo', 'Eti | Referans', 'Gıda ve içecek tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5204-0004-4222-8222-520400000004', '7b1b5204-0004-4222-8222-520400000004', 'tr', 'Pınar', 'pinar', 'Gıda ve içecek üretim tesisleri için kurumsal referans.', '<p>Gıda ve içecek üretim tesislerinde hijyen, enerji verimliliği ve operasyon sürekliliği odaklı uygulamalar kapsamında referans kaydı.</p>', 'Pınar logo', 'Pınar | Referans', 'Gıda ve içecek tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5204-0005-4222-8222-520400000005', '7b1b5204-0005-4222-8222-520400000005', 'tr', 'Anadolu Efes', 'anadolu-efes', 'Gıda ve içecek üretim tesisleri için kurumsal referans.', '<p>Gıda ve içecek üretim tesislerinde hijyen, enerji verimliliği ve operasyon sürekliliği odaklı uygulamalar kapsamında referans kaydı.</p>', 'Anadolu Efes logo', 'Anadolu Efes | Referans', 'Gıda ve içecek tesisleri için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5205-0001-4222-8222-520500000001', '7b1b5205-0001-4222-8222-520500000001', 'tr', 'Erdemir', 'erdemir', 'Çelik ve metal sanayi uygulamaları için kurumsal referans.', '<p>Çelik ve metal sanayi tesislerinde yüksek ısı yükleri ve proses gereksinimlerine uygun endüstriyel çözümler için referans kaydı.</p>', 'Erdemir logo', 'Erdemir | Referans', 'Çelik ve metal sanayi için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5205-0004-4222-8222-520500000004', '7b1b5205-0004-4222-8222-520500000004', 'tr', 'Kardemir', 'kardemir', 'Çelik ve metal sanayi uygulamaları için kurumsal referans.', '<p>Çelik ve metal sanayi tesislerinde yüksek ısı yükleri ve proses gereksinimlerine uygun endüstriyel çözümler için referans kaydı.</p>', 'Kardemir logo', 'Kardemir | Referans', 'Çelik ve metal sanayi için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5206-0001-4222-8222-520600000001', '7b1b5206-0001-4222-8222-520600000001', 'tr', 'Ford Otosan', 'ford-otosan', 'Otomotiv ve yan sanayi üretim hatları için kurumsal referans.', '<p>Otomotiv üretim hatlarında proses stabilitesi, kalite ve enerji optimizasyonu hedefleri doğrultusunda uygulanan çözümler için referans kaydı.</p>', 'Ford Otosan logo', 'Ford Otosan | Referans', 'Otomotiv ve yan sanayi için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5206-0002-4222-8222-520600000002', '7b1b5206-0002-4222-8222-520600000002', 'tr', 'Tofaş', 'tofas', 'Otomotiv ve yan sanayi üretim hatları için kurumsal referans.', '<p>Otomotiv üretim hatlarında proses stabilitesi, kalite ve enerji optimizasyonu hedefleri doğrultusunda uygulanan çözümler için referans kaydı.</p>', 'Tofaş logo', 'Tofaş | Referans', 'Otomotiv ve yan sanayi için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5206-0004-4222-8222-520600000004', '7b1b5206-0004-4222-8222-520600000004', 'tr', 'Oyak Renault', 'oyak-renault', 'Otomotiv ve yan sanayi üretim hatları için kurumsal referans.', '<p>Otomotiv üretim hatlarında proses stabilitesi, kalite ve enerji optimizasyonu hedefleri doğrultusunda uygulanan çözümler için referans kaydı.</p>', 'Oyak Renault logo', 'Oyak Renault | Referans', 'Otomotiv ve yan sanayi için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5207-0002-4222-8222-520700000002', '7b1b5207-0002-4222-8222-520700000002', 'tr', 'Rönesans', 'renesans', 'AVM ve ticari binalar için kurumsal referans.', '<p>AVM ve ticari binalarda konfor, enerji verimliliği ve işletme sürekliliği hedefleriyle uygulanan çözümler için referans kaydı.</p>', 'Rönesans logo', 'Rönesans | Referans', 'AVM ve ticari binalar için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5207-0003-4222-8222-520700000003', '7b1b5207-0003-4222-8222-520700000003', 'tr', 'Zorlu', 'zorlu', 'AVM ve ticari binalar için kurumsal referans.', '<p>AVM ve ticari binalarda konfor, enerji verimliliği ve işletme sürekliliği hedefleriyle uygulanan çözümler için referans kaydı.</p>', 'Zorlu logo', 'Zorlu | Referans', 'AVM ve ticari binalar için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5207-0004-4222-8222-520700000004', '7b1b5207-0004-4222-8222-520700000004', 'tr', 'ENKA', 'enka', 'AVM ve ticari binalar için kurumsal referans.', '<p>AVM ve ticari binalarda konfor, enerji verimliliği ve işletme sürekliliği hedefleriyle uygulanan çözümler için referans kaydı.</p>', 'ENKA logo', 'ENKA | Referans', 'AVM ve ticari binalar için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5208-0001-4222-8222-520800000001', '7b1b5208-0001-4222-8222-520800000001', 'tr', 'Turkcell', 'turkcell', 'Veri merkezi ve hastane altyapıları için kurumsal referans.', '<p>Veri merkezleri ve hastanelerde yüksek süreklilik, yedeklilik ve kritik altyapı yönetimi hedefleriyle uygulanan çözümler için referans kaydı.</p>', 'Turkcell logo', 'Turkcell | Referans', 'Veri merkezi ve hastane altyapıları için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5208-0002-4222-8222-520800000002', '7b1b5208-0002-4222-8222-520800000002', 'tr', 'Türk Telekom', 'turk-telekom', 'Veri merkezi ve hastane altyapıları için kurumsal referans.', '<p>Veri merkezleri ve hastanelerde yüksek süreklilik, yedeklilik ve kritik altyapı yönetimi hedefleriyle uygulanan çözümler için referans kaydı.</p>', 'Türk Telekom logo', 'Türk Telekom | Referans', 'Veri merkezi ve hastane altyapıları için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5208-0003-4222-8222-520800000003', '7b1b5208-0003-4222-8222-520800000003', 'tr', 'Acıbadem', 'acibadem', 'Veri merkezi ve hastane altyapıları için kurumsal referans.', '<p>Veri merkezleri ve hastanelerde yüksek süreklilik, yedeklilik ve kritik altyapı yönetimi hedefleriyle uygulanan çözümler için referans kaydı.</p>', 'Acıbadem logo', 'Acıbadem | Referans', 'Veri merkezi ve hastane altyapıları için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5209-0001-4222-8222-520900000001', '7b1b5209-0001-4222-8222-520900000001', 'tr', 'Şişecam', 'sisecam', 'Kurumsal projeler kapsamında referans kaydı.', '<p>Kurumsal projelerde kullanılan endüstriyel çözümler kapsamında referans kaydı.</p>', 'Şişecam logo', 'Şişecam | Referans', 'Kurumsal projeler için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5209-0002-4222-8222-520900000002', '7b1b5209-0002-4222-8222-520900000002', 'tr', 'ASELSAN', 'aselsan', 'Kurumsal projeler kapsamında referans kaydı.', '<p>Kurumsal projelerde kullanılan endüstriyel çözümler kapsamında referans kaydı.</p>', 'ASELSAN logo', 'ASELSAN | Referans', 'Kurumsal projeler için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5209-0004-4222-8222-520900000004', '7b1b5209-0004-4222-8222-520900000004', 'tr', 'Arçelik', 'arcelik', 'Kurumsal projeler kapsamında referans kaydı.', '<p>Kurumsal projelerde kullanılan endüstriyel çözümler kapsamında referans kaydı.</p>', 'Arçelik logo', 'Arçelik | Referans', 'Kurumsal projeler için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3)),
  ('8a8a5209-0005-4222-8222-520900000005', '7b1b5209-0005-4222-8222-520900000005', 'tr', 'Vestel', 'vestel', 'Kurumsal projeler kapsamında referans kaydı.', '<p>Kurumsal projelerde kullanılan endüstriyel çözümler kapsamında referans kaydı.</p>', 'Vestel logo', 'Vestel | Referans', 'Kurumsal projeler için endüstriyel uygulamalar kapsamında referans kaydı.', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title = VALUES(title), slug = VALUES(slug), summary = VALUES(summary),
  content = VALUES(content), featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title), meta_description = VALUES(meta_description),
  updated_at = VALUES(updated_at);

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
