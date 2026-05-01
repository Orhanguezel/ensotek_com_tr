-- =============================================================
-- FILE: 012_fix_product_images.seed.sql
-- ensotek.de DB'sinden gelen relative image URL'leri absolute yap
-- bbbb0001 (CC-CTP) + bbbb0002 (CTP-SINGLE)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- bbbb0001: Kapalı Tip Su Soğutma Kuleleri (CC CTP)
UPDATE `products`
SET
  `image_url` = 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1752786288/uploads/metahub/about-images/closed-circuit-water-cooling-towers1-1752786287184-840184158.webp',
  `images` = JSON_ARRAY(
    'https://res.cloudinary.com/dbozv7wqd/image/upload/v1752786288/uploads/metahub/about-images/closed-circuit-water-cooling-towers1-1752786287184-840184158.webp',
    'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-1-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-2-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/closed-circuit-cooling-tower-3-250x250-1.jpg'
  )
WHERE `id` = 'bbbb0001-2222-4222-8222-bbbbbbbb0001';

-- bbbb0002: Açık Tip CTP Tek Hücreli
UPDATE `products`
SET
  `image_url` = 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321557/products/cover/open-circuit-ctp-single-1-250x250-1.png',
  `images` = JSON_ARRAY(
    'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321557/products/cover/open-circuit-ctp-single-1-250x250-1.png',
    'https://www.ensotek.de/uploads/material/open-circuit-ctp-single-2-250x250-1.jpg',
    'https://www.ensotek.de/uploads/material/open-circuit-ctp-single-3-250x250-1.jpg'
  )
WHERE `id` = 'bbbb0002-2222-4222-8222-bbbbbbbb0002';

COMMIT;
