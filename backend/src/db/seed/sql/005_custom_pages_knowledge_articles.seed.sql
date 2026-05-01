-- =============================================================
-- FILE: 005_custom_pages_knowledge_articles.seed.sql
-- Bilgi Bankası (blog module_key) makaleleri
-- ensotek_de library içeriklerinden uyarlandı
-- module_key='blog', TR locale, görseller Cloudinary
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- Görseller
SET @IMG_MAIN := 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1752786288/uploads/metahub/about-images/closed-circuit-water-cooling-towers1-1752786287184-840184158.webp';
SET @IMG_OPEN := 'https://res.cloudinary.com/dbozv7wqd/image/upload/v1767321557/products/cover/open-circuit-ctp-single-1-250x250-1.png';
SET @IMG_CLOSED_DIAGRAM := 'https://www.ensotek.de/uploads/library/how-is-closed-circuit-water-cooling-tower-operation.png';
SET @IMG_SELECTION := 'https://www.ensotek.de/uploads/library/su-sogutma-kulesi-ozellikleri-1.jpg';

-- =============================================================
-- 1) CT BASICS — Su Soğutma Kulesi Temelleri
-- =============================================================
SET @P1 := 'cccc2604-1111-4111-8111-cccccccc2604';

INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `image_url`, `images`, `storage_image_ids`,
   `created_at`, `updated_at`)
VALUES
  (@P1, 'blog', 1, 1, 40, 40,
   @IMG_MAIN, @IMG_MAIN,
   CAST(JSON_ARRAY(@IMG_MAIN) AS CHAR), CAST(JSON_ARRAY() AS CHAR),
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`),
  `is_published` = VALUES(`is_published`),
  `display_order` = VALUES(`display_order`),
  `order_num` = VALUES(`order_num`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @P1, 'tr',
 'Su Soğutma Kulesi Temelleri: Tipler, Çalışma Prensibi ve Tasarım Parametreleri',
 'su-sogutma-kulesi-temelleri',
 JSON_OBJECT('html', CONCAT(
   '<h2>Su Soğutma Kulesi Nedir?</h2>',
   '<p>Su soğutma kulesi; proses veya HVAC sisteminden ısınarak dönen suyun ısısını atmosfere atan bir <strong>ısı uzaklaştırma</strong> ekipmanıdır. Temel mekanizma, su ile havanın temas etmesi ve suyun küçük bir kısmının buharlaşarak ısıyı taşımasıdır. Soğuyan su, soğuk su havuzunda toplanır ve tekrar sisteme pompalanır.</p>',
   '<h2>Temel Çalışma Prensibi</h2>',
   '<ol>',
     '<li><strong>Dağıtım:</strong> Sıcak su, dağıtım boruları/nozullar ile dolgu üzerine homojen yayılır.</li>',
     '<li><strong>Temas Yüzeyi:</strong> Dolgu üzerinde film/damlacık oluşur; yüzey alanını artırır.</li>',
     '<li><strong>Hava Akışı:</strong> Fan (veya doğal çekiş) ile hava kule içine alınır.</li>',
     '<li><strong>Isı Transferi:</strong> Duyulur ısı transferi ve <em>kısmi buharlaşma</em> suyu soğutur.</li>',
     '<li><strong>Toplama:</strong> Soğuyan su havuzda toplanır ve prosese geri gönderilir.</li>',
   '</ol>',
   '<h2>Sınıflandırma: Karşı Akış / Çapraz Akış</h2>',
   '<p><strong>Karşı akışlı</strong> kulelerde su aşağı inerken hava yukarı çıkar; genelde yüksek performans sağlar. <strong>Çapraz akışlı</strong> kulelerde hava suya göre yatay/çapraz yönde ilerler.</p>',
   '<h2>Açık Devre / Kapalı Devre</h2>',
   '<p><strong>Açık devre</strong> kulelerde proses suyu hava ile doğrudan temas eder. <strong>Kapalı devre</strong> kulelerde proses suyu serpantin içinde dolaşır; dıştaki püskürtme suyu ve hava ile ısı atılır.</p>',
   '<h2>Kritik Parametreler</h2>',
   '<ul>',
     '<li><strong>Range:</strong> giriş (sıcak) ve çıkış (soğuk) su sıcaklık farkı.</li>',
     '<li><strong>Approach:</strong> çıkış suyu ile yaş termometre sıcaklığı farkı.</li>',
     '<li><strong>Wet-bulb:</strong> evaporatif kulelerde erişilebilir minimuma yakın sınır.</li>',
   '</ul>',
   '<h2>Su Kayıpları</h2>',
   '<ul>',
     '<li><strong>Buharlaşma:</strong> ısı atımının doğal sonucu.</li>',
     '<li><strong>Sürüklenme (Drift):</strong> egzoz havası ile taşınan damlacıklar; drift eliminator ile azaltılır.</li>',
     '<li><strong>Blöf (Blowdown):</strong> TDS birikimini sınırlamak için kontrollü tahliye.</li>',
   '</ul>',
   '<h2>İşletme ve Bakım</h2>',
   '<ul>',
     '<li>Su şartlandırma (korozyon/kireç/biyolojik kontrol) süreklilik için kritiktir.</li>',
     '<li>Nozul/dolgu/drift eliminator/fan-motor grubu periyodik kontrol edilmelidir.</li>',
   '</ul>'
 )),
 'Su soğutma kulelerinin çalışma prensibi, sınıflandırması ve tasarım/işletme parametreleri.',
 'Su soğutma kulesi teknik içerik görseli',
 'Su Soğutma Kulesi Temelleri | Ensotek',
 'Su soğutma kulelerinin çalışma prensibi, açık/kapalı devre sınıflandırması, kritik parametreler ve su kayıpları.',
 'su sogutma kulesi, acik devre, kapali devre, karsi akis, capraz akis, buharlasma, drift, blof, wet bulb, approach',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `content` = VALUES(`content`), `summary` = VALUES(`summary`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `tags` = VALUES(`tags`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- 2) CT FEATURES — Ensotek Kulelerinin Özellikleri
-- =============================================================
SET @P2 := 'cccc2605-1111-4111-8111-cccccccc2605';

INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `image_url`, `images`, `storage_image_ids`,
   `created_at`, `updated_at`)
VALUES
  (@P2, 'blog', 1, 1, 50, 50,
   @IMG_MAIN, @IMG_MAIN,
   CAST(JSON_ARRAY(@IMG_MAIN, @IMG_OPEN) AS CHAR), CAST(JSON_ARRAY() AS CHAR),
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`), `is_published` = VALUES(`is_published`),
  `display_order` = VALUES(`display_order`), `order_num` = VALUES(`order_num`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @P2, 'tr',
 'Ensotek Soğutma Kulelerimizin Özellikleri',
 'ensotek-sogutma-kulelerinin-ozellikleri',
 JSON_OBJECT('html', CONCAT(
   '<h2>Ensotek Soğutma Kulelerimizin Özellikleri</h2>',
   '<h3>Gövde ve Malzeme Yapısı</h3>',
   '<ol>',
     '<li><strong>CTP gövde yapısı:</strong> Ensotek soğutma kuleleri cam elyaf takviyeli polyester (CTP) malzemeden imal edilir. Boyama ihtiyacı duymaz; uzun yıllar korozyona uğramadan görünümünü ve mekanik dayanımını korur.</li>',
     '<li><strong>Kimyasallara ve korozyona dayanıklılık:</strong> CTP yapı kimyasallara ve korozyona karşı yüksek direnç sağlar; metal kulelerde görülen paslanma ve yüzey bozulmaları bu yapıda minimize edilir.</li>',
     '<li><strong>Alev ilerletmeyen reçine seçeneği:</strong> Otel, hastane, AVM, rezidans gibi hassas tesislerde alev ilerletmeyen reçine ile yangın güvenliği artırılabilir.</li>',
   '</ol>',
   '<h3>Dolgu Seçenekleri</h3>',
   '<p>Proses suyunun temizliği ve işletme koşullarına göre aşağıdaki dolgu tipleri tercih edilebilir:</p>',
   '<ol>',
     '<li><strong>PVC petek dolgu (film fill):</strong> Temiz su uygulamalarında yüksek ıslak yüzey alanı sayesinde yüksek performans sağlar.</li>',
     '<li><strong>PP bigudi dolgu (splash fill):</strong> Kirli/yağlı/tufallı su ve tozlu ortamlarda tıkanma riski düşüktür; temizlenebilir ve tekrar kullanılabilir. PP, yüksek sıcaklıklı proseslerde (~100&nbsp;°C) tercih edilebilir.</li>',
     '<li><strong>PP grid dolgu:</strong> Çok kirli su koşullarında sıçratma tipi yapı ile bakım kolaylığı ve tıkanma dayanımı sağlar.</li>',
   '</ol>',
   '<h3>Dayanıklılık ve İşletme Ekonomisi</h3>',
   '<ul>',
     '<li><strong>Uzun ömür:</strong> Kompozit yapı, korozyon kaynaklı degradasyonu azaltır.</li>',
     '<li><strong>Düşük bakım maliyeti:</strong> Doğru dolgu seçimi ve korozyonun minimize edilmesi ile periyodik bakım ihtiyacı azalır.</li>',
   '</ul>',
   '<h3>Fan Konfigürasyonu ve Enerji Verimliliği</h3>',
   '<ul>',
     '<li><strong>Üstten fanlı, karşı akışlı, cebri çekişli tasarım:</strong> Nemli hava daha hızlı uzaklaşır; resirkülasyon riski azaltılabilir.</li>',
     '<li><strong>Enerji avantajı:</strong> Uygun tasarım ve işletme şartlarında cebri çekişli tasarım, cebri itişli yapılara göre enerji tüketiminde avantaj sağlayabilir.</li>',
   '</ul>',
   '<h3>Performans ve İşletme Avantajları</h3>',
   '<ul>',
     '<li><strong>Yüksek soğutma performansı:</strong> Yaş termometre değerine yaklaşım iyileşebilir; proses kararlılığı artar.</li>',
     '<li><strong>Toplam sahip olma maliyeti:</strong> Yaşam döngüsü maliyeti, enerji ve bakım avantajları ile optimize edilebilir.</li>',
     '<li><strong>Yedek parça erişimi:</strong> Fan, dolgu, nozullar ve yardımcı ekipmanlarda yedek parça temini hızlıdır.</li>',
   '</ul>'
 )),
 'CTP/GFK gövde, PVC/PP dolgu seçenekleri, fan konfigürasyonu ve enerji verimliliği — Ensotek kulelerinin teknik özellikleri.',
 'Ensotek soğutma kulesi özellikleri görseli',
 'Ensotek Soğutma Kulelerinin Özellikleri | Ensotek',
 'Ensotek soğutma kulelerinin CTP/GFK malzeme yapısı, dolgu seçenekleri, enerji verimliliği ve işletme avantajları.',
 'ensotek, ctp, grp, pvc film fill, pp splash fill, enerji verimliligi',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `content` = VALUES(`content`), `summary` = VALUES(`summary`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `tags` = VALUES(`tags`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- 3) OPEN CIRCUIT — Açık Tip Çalışma Prensibi
-- =============================================================
SET @P3 := 'cccc2606-1111-4111-8111-cccccccc2606';

INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `image_url`, `images`, `storage_image_ids`,
   `created_at`, `updated_at`)
VALUES
  (@P3, 'blog', 1, 0, 60, 60,
   @IMG_OPEN, @IMG_OPEN,
   CAST(JSON_ARRAY(@IMG_OPEN, @IMG_MAIN) AS CHAR), CAST(JSON_ARRAY() AS CHAR),
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`), `is_published` = VALUES(`is_published`),
  `display_order` = VALUES(`display_order`), `order_num` = VALUES(`order_num`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @P3, 'tr',
 'Açık Tip Su Soğutma Kulesi Çalışma Prensibi',
 'acik-tip-su-sogutma-kulesi-calisma-prensibi',
 JSON_OBJECT('html', CONCAT(
   '<h2>Açık Tip Su Soğutma Kulesi Çalışma Prensibi</h2>',
   '<h3>Açık Tip (Açık Devre) Kule Nedir?</h3>',
   '<p>Açık tip su soğutma kulelerinde proses suyu, kule içerisinde hava ile <strong>doğrudan temas</strong> eder. Isı uzaklaştırmanın büyük bölümü buharlaşma ile sağlanır. Bu nedenle verim yüksektir; ancak su kalitesi, kireçlenme ve kirlenme yönetimi doğru yapılmalıdır.</p>',
   '<h3>Temel Çalışma Mekanizması</h3>',
   '<p>Su, üst dağıtım sisteminden nozullar ile dolgu üzerine yayılır. Fan ile kule içine alınan hava, dolgu yüzeyinde su ile temas eder. Bu temas sırasında:</p>',
   '<ul>',
     '<li><strong>Duyulur ısı transferi:</strong> Su ile hava arasındaki sıcaklık farkı ile sudan havaya ısı geçer.</li>',
     '<li><strong>Gizli ısı (buharlaşma):</strong> Suyun bir kısmı buharlaşarak hal değiştirir ve sudan ek ısı çeker.</li>',
   '</ul>',
   '<p>Soğuyan su alt havuzda toplanır ve pompalanarak tekrar prosese gönderilir. Nemlenen hava ise fan bacasından atmosfere atılır.</p>',
   '<h3>Cebri Çekişli Karşı Akışlı Kulelerde Adım Adım İşleyiş</h3>',
   '<ol>',
     '<li><strong>Sıcak su girişi:</strong> Prosesten gelen sıcak su, dağıtım hattına alınır.</li>',
     '<li><strong>Dağıtım ve püskürtme:</strong> Nozullar suyu dolgu üzerine homojen şekilde yayar.</li>',
     '<li><strong>Dolgu üzerinde film/damlacık oluşumu:</strong> Su, dolgu yüzeyinde ince film ve küçük damlacıklar oluşturarak ısı transfer alanını artırır.</li>',
     '<li><strong>Hava emişi:</strong> Fan, dış havayı hava panjurlarından içeri alır ve dolgudan geçirir.</li>',
     '<li><strong>Isı uzaklaştırma:</strong> Su, havaya ısı verir; bir kısmı buharlaşır ve su sıcaklığı düşer.</li>',
     '<li><strong>Soğuk su havuzu:</strong> Soğuyan su havuzda toplanır.</li>',
     '<li><strong>Deşarj:</strong> Nemli hava fan bacasından atılır; su ise pompalanarak prosese geri döner.</li>',
   '</ol>',
   '<h3>Açık Tip Kulelerin Temel Bileşenleri</h3>',
   '<ul>',
     '<li><strong>Gövde ve havuz:</strong> Su toplama ve taşıyıcı yapı.</li>',
     '<li><strong>Su dağıtım sistemi ve nozullar:</strong> Suyun homojen yayılması.</li>',
     '<li><strong>Dolgu (fill):</strong> Isı transfer yüzeyini büyütür; film veya sıçratma tipi olabilir.</li>',
     '<li><strong>Fan-motor grubu:</strong> Hava akışını sağlar (cebri çekişli/itme seçenekleri).</li>',
     '<li><strong>Sürüklenme tutucu (drift eliminator):</strong> Su damlacıklarının hava ile taşınmasını azaltır.</li>',
     '<li><strong>Hava panjurları (louvers):</strong> Hava girişini düzenler, su sıçramasını azaltır.</li>',
   '</ul>',
   '<h3>Performans Terimleri</h3>',
   '<ul>',
     '<li><strong>Range (Soğutma aralığı):</strong> Tg − Tç (giriş-çıkış suyu sıcaklık farkı).</li>',
     '<li><strong>Approach (Yaklaşım):</strong> Tç − Twb (çıkış suyu ile yaş termometre arasındaki fark).</li>',
     '<li><strong>Yaş termometre (Wet-bulb):</strong> Kule performansını doğrudan etkileyen temel iklim parametresidir.</li>',
   '</ul>'
 )),
 'Açık tip (açık devre) kule çalışma prensibi: adımlar, bileşenler, performans terimleri ve su kayıpları.',
 'Açık tip su soğutma kulesi çalışma prensibi şeması',
 'Açık Tip Soğutma Kulesi Çalışma Prensibi | Ensotek',
 'Açık tip (açık devre) kule çalışma prensibi: adımlar, bileşenler, performans terimleri ve su kayıpları.',
 'acik tip, acik devre, karsı akis, induced draft, drift, blowdown',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `content` = VALUES(`content`), `summary` = VALUES(`summary`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `tags` = VALUES(`tags`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- 4) CLOSED CIRCUIT — Kapalı Çevrim Çalışma Prensibi
-- =============================================================
SET @P4 := 'cccc2607-1111-4111-8111-cccccccc2607';

INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `image_url`, `images`, `storage_image_ids`,
   `created_at`, `updated_at`)
VALUES
  (@P4, 'blog', 1, 0, 70, 70,
   @IMG_CLOSED_DIAGRAM, @IMG_CLOSED_DIAGRAM,
   CAST(JSON_ARRAY(@IMG_CLOSED_DIAGRAM, @IMG_MAIN) AS CHAR), CAST(JSON_ARRAY() AS CHAR),
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`), `is_published` = VALUES(`is_published`),
  `display_order` = VALUES(`display_order`), `order_num` = VALUES(`order_num`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @P4, 'tr',
 'Kapalı Çevrim Su Soğutma Kulesi Çalışma Prensibi',
 'kapali-cevrim-su-sogutma-kulesi-calisma-prensibi',
 JSON_OBJECT('html', CONCAT(
   '<h2>Kapalı Çevrim Su Soğutma Kulesi Çalışma Prensibi</h2>',
   '<h3>Kapalı Çevrim (Kapalı Devre) Kule Nedir?</h3>',
   '<p>Kapalı çevrim kuleler, soğutulacak akışkanın (proses suyu / glikol / özel akışkan) ortam ile teması istenmeyen proseslerde tercih edilir. Soğutulacak akışkan <strong>metal serpantin (eşanjör registeri)</strong> içinde dolaşır. Kulede dolaşan hava ve serpantin üzerine püskürtülen sprey suyu, serpantin dış yüzeyinden ısı alarak içindeki akışkanı dolaylı şekilde soğutur. Böylece proses akışkanı <strong>kirlenmez</strong> ve sistem suyu kalitesi korunur.</p>',
   '<h3>Temel Çalışma Mantığı</h3>',
   '<ol>',
     '<li><strong>Sıcak proses akışkanı serpantine girer:</strong> Isınmış akışkan serpantin borularından geçer.</li>',
     '<li><strong>Hava akışı sağlanır:</strong> Fan, ortam havasını kule içine alır ve serpantin üzerinden geçirir.</li>',
     '<li><strong>Sprey suyu devresi çalışır:</strong> Kule havuzundaki sirkülasyon suyu pompa ile nozullara basılır ve serpantin üzerine püskürtülür.</li>',
     '<li><strong>Isı transferi:</strong> Serpantin içindeki akışkan ısısını boru duvarından dış yüzeye iletir; sprey suyu ve hava bu ısıyı atmosfere taşır.</li>',
     '<li><strong>Soğuyan akışkan prosese döner:</strong> Serpantinden çıkan akışkan sisteme geri gönderilir.</li>',
   '</ol>',
   '<h3>Free Cooling (Kuru Soğutucu) Modu</h3>',
   '<p>Soğuk mevsimlerde sprey suyu devresi kapatılarak kule yalnızca hava akışıyla çalıştırılabilir. Bu işletme şekli, kapalı tip kuleyi <strong>kuru soğutucu (dry cooler)</strong> gibi çalıştırır ve <strong>free cooling</strong> olarak adlandırılır. Uygun iklim koşullarında enerji tüketimi azaltılabilir.</p>',
   '<h3>Donma Riski ve Koruma Stratejileri</h3>',
   '<p>Kış şartlarında sistem durduğunda serpantin içinde kalan akışkan donabilir. Donma, serpantin borularında çatlama riski doğurur. Başlıca önlemler:</p>',
   '<ul>',
     '<li><strong>Serpantinin boşaltılması</strong> (duruşlarda tahliye).</li>',
     '<li><strong>Düşük debide sirkülasyon</strong> ile kritik sıcaklıklarda dolaşım.</li>',
     '<li><strong>Antifriz (glikol)</strong> kullanımı ile donma noktasının düşürülmesi.</li>',
     '<li><strong>Otomasyon</strong>: fan/pompa kademelendirme ve set değerleriyle donma önleyici kontrol.</li>',
   '</ul>',
   '<h3>Kullanım Alanları ve Avantajlar</h3>',
   '<ul>',
     '<li><strong>Proses suyu temizliği:</strong> Hassas ekipmanlarda su kalitesinin korunması.</li>',
     '<li><strong>Daha düşük kirlenme riski:</strong> Proses devresi atmosfere açık değildir.</li>',
     '<li><strong>Free cooling imkânı:</strong> Soğuk iklimlerde enerji avantajı.</li>',
     '<li><strong>Stabil işletme:</strong> Uygun kontrol ile yıl boyu daha kontrollü performans.</li>',
   '</ul>'
 )),
 'Serpantin üzerinden dolaylı soğutma, sprey devresi, free cooling ve donma riskine karşı önlemler.',
 'Kapalı çevrim soğutma kulesi çalışma prensibi şeması',
 'Kapalı Çevrim Soğutma Kulesi Çalışma Prensibi | Ensotek',
 'Kapalı devre kulelerde serpantin üzerinden dolaylı soğutma, sprey devresi, free cooling, donma riskine karşı önlemler ve enerji tüketimi.',
 'kapali cevrim, kapali devre, serpantin, esanjör, spray, free cooling, donma',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `content` = VALUES(`content`), `summary` = VALUES(`summary`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `tags` = VALUES(`tags`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- 5) SELECTION — Kule Seçimi İçin Gerekli Bilgiler
-- =============================================================
SET @P5 := 'cccc2608-1111-4111-8111-cccccccc2608';

INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `image_url`, `images`, `storage_image_ids`,
   `created_at`, `updated_at`)
VALUES
  (@P5, 'blog', 1, 0, 80, 80,
   @IMG_SELECTION, @IMG_SELECTION,
   CAST(JSON_ARRAY(@IMG_SELECTION, @IMG_MAIN) AS CHAR), CAST(JSON_ARRAY() AS CHAR),
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`), `is_published` = VALUES(`is_published`),
  `display_order` = VALUES(`display_order`), `order_num` = VALUES(`order_num`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @P5, 'tr',
 'Kule Seçimi İçin Gerekli Bilgiler',
 'kule-secimi-icin-gerekli-bilgiler',
 JSON_OBJECT('html', CONCAT(
   '<h2>Kule Seçimi İçin Gerekli Bilgiler</h2>',
   '<p>Su soğutma kuleleri, aksi özel talep olmadığı sürece, <strong>en sıcak yaz günlerine ait meteorolojik tasarım şartlarına</strong> göre seçilir. Doğru kule seçimi; kapasite, iklim verisi ve proses tarafı şartlarının birlikte değerlendirilmesini gerektirir.</p>',
   '<h3>1) Proses Verileri (Zorunlu)</h3>',
   '<ul>',
     '<li><strong>Soğutulacak su miktarı (Debi):</strong> m³/h (tercihen) veya kapasite (kW, kcal/h)</li>',
     '<li><strong>Kuleye giren su sıcaklığı (Sıcak su, Tg, °C)</strong></li>',
     '<li><strong>Kuleden çıkan su sıcaklığı (Soğuk su, Tç, °C)</strong></li>',
     '<li><strong>Çalışma rejimi:</strong> Sürekli mi, vardiyalı mı; yük sabit mi değişken mi?</li>',
   '</ul>',
   '<h3>2) İklim Verileri (Tasarım Şartı)</h3>',
   '<p>Kule kapasitesi doğrudan iklim verilerine bağlıdır. En kritik parametre <strong>yaş termometre (wet-bulb)</strong> değeridir.</p>',
   '<ul>',
     '<li><strong>Yaş termometre sıcaklığı (°C)</strong> – zorunlu</li>',
     '<li><strong>Kuru termometre sıcaklığı (°C)</strong> – önerilir</li>',
     '<li><strong>Bağıl nem (%)</strong> – önerilir</li>',
     '<li><strong>Rakım / barometrik basınç</strong> – özellikle yüksek rakımda önemlidir</li>',
   '</ul>',
   '<h3>3) Temel Kavramlar: Range ve Approach</h3>',
   '<p><strong>Range</strong>, kuleye giren sıcak su ile kuleden çıkan soğuk su arasındaki sıcaklık farkıdır: <code>Range = Tg − Tç</code>.</p>',
   '<p><strong>Approach</strong>, kuleden çıkan soğuk su sıcaklığı ile yaş termometre arasındaki farktır: <code>Approach = Tç − Twb</code>. Approach ne kadar düşük istenirse, kule boyutu ve maliyeti genellikle artar.</p>',
   '<h3>4) Su Kalitesi ve İşletme Koşulları</h3>',
   '<ul>',
     '<li><strong>Proses suyu analizi:</strong> iletkenlik, sertlik, pH, askıda katı madde (TSS)</li>',
     '<li><strong>Kirlenme kaynakları:</strong> yağ, tufal, lif, organik yük, biyolojik oluşum</li>',
     '<li><strong>Kimyasal şartlandırma:</strong> inhibitör, biyosit, pH kontrolü</li>',
     '<li><strong>Blöf (purge/blowdown)</strong> stratejisi</li>',
   '</ul>',
   '<h3>5) Mekanik ve Kurulum Parametreleri</h3>',
   '<ul>',
     '<li><strong>Kurulum yeri:</strong> İç/dış ortam, hava sirkülasyonu, resirkülasyon riski</li>',
     '<li><strong>Alan kısıtı:</strong> uzunluk/genişlik/yükseklik limitleri, servis boşlukları</li>',
     '<li><strong>Gürültü limiti:</strong> yerleşim bölgeleri veya hassas tesisler için</li>',
     '<li><strong>Elektrik:</strong> besleme, frekans invertörü (VFD) ihtiyacı</li>',
     '<li><strong>Donma riski:</strong> kış koşulları, ısıtıcı, antifriz, kontrol senaryosu</li>',
   '</ul>',
   '<h3>Örnek Veri Seti</h3>',
   '<p>Örnek: Debi 120 m³/h, Tg=40°C, Tç=30°C, Twb=24°C, rakım 200 m, sürekli çalışma, su orta kirlilikte.</p>'
 )),
 'Soğutma kulesi seçimi için gerekli proses girdileri, iklim verileri, range/approach, su kalitesi ve kurulum parametreleri.',
 'Soğutma kulesi seçimi için gerekli veriler kontrol listesi',
 'Kule Seçimi İçin Gerekli Bilgiler | Ensotek',
 'Soğutma kulesi seçimi için gerekli proses (debi/sıcaklıklar), iklim verileri (yaş termometre), range/approach ve su kalitesi.',
 'kule seçimi, soğutma kulesi seçimi, debi, yaş termometre, range, approach, su kalitesi, blöf',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `content` = VALUES(`content`), `summary` = VALUES(`summary`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `tags` = VALUES(`tags`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- 6) SUMMER WET/DRY BULB — Türkiye Yaz Tasarım Değerleri
-- =============================================================
SET @P6 := 'cccc2609-1111-4111-8111-cccccccc2609';

INSERT INTO `custom_pages`
  (`id`, `module_key`, `is_published`, `featured`, `display_order`, `order_num`,
   `featured_image`, `image_url`, `images`, `storage_image_ids`,
   `created_at`, `updated_at`)
VALUES
  (@P6, 'blog', 1, 0, 90, 90,
   @IMG_MAIN, @IMG_MAIN,
   CAST(JSON_ARRAY(@IMG_MAIN) AS CHAR), CAST(JSON_ARRAY() AS CHAR),
   NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`), `is_published` = VALUES(`is_published`),
  `display_order` = VALUES(`display_order`), `order_num` = VALUES(`order_num`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`,
   `featured_image_alt`, `meta_title`, `meta_description`, `tags`,
   `created_at`, `updated_at`)
VALUES
(UUID(), @P6, 'tr',
 'Türkiye Yaz Kuru ve Yaş Termometre Tasarım Değerleri',
 'yaz-kuru-yas-termometre-tasarim-degerleri',
 JSON_OBJECT('html', CONCAT(
   '<p>Bu tabloda, Türkiye''deki illere göre yaz tasarım dönemi için kuru termometre ve yaş termometre sıcaklık değerleri verilmiştir. Soğutma kulesi seçimi, kondenser devresi tasarımı ve genel iklimlendirme (HVAC) hesaplarında referans alınabilir.</p>',
   '<p><strong>Not:</strong> Değerler MGM (Meteoroloji Genel Müdürlüğü) kaynaklı tipik yaz tasarım koşullarını temsil eder; proje bazında yerel ölçümler veya güncel iklim verileri ile birlikte değerlendirilmelidir.</p>',
   '<table>',
     '<thead><tr><th>Şehir</th><th>Kuru (°C)</th><th>Yaş (°C)</th></tr></thead>',
     '<tbody>',
       '<tr><td>Adana</td><td>38</td><td>27</td></tr>',
       '<tr><td>Adıyaman</td><td>38</td><td>23</td></tr>',
       '<tr><td>Afyon</td><td>34</td><td>21</td></tr>',
       '<tr><td>Ağrı</td><td>34</td><td>25</td></tr>',
       '<tr><td>Aksaray</td><td>34</td><td>20</td></tr>',
       '<tr><td>Amasya</td><td>31</td><td>21</td></tr>',
       '<tr><td>Ankara</td><td>35</td><td>20</td></tr>',
       '<tr><td>Antalya</td><td>39</td><td>28</td></tr>',
       '<tr><td>Aydın</td><td>39</td><td>24</td></tr>',
       '<tr><td>Balıkesir</td><td>38</td><td>25</td></tr>',
       '<tr><td>Bursa</td><td>37</td><td>25</td></tr>',
       '<tr><td>Çanakkale</td><td>34</td><td>25</td></tr>',
       '<tr><td>Denizli</td><td>38</td><td>24</td></tr>',
       '<tr><td>Diyarbakır</td><td>42</td><td>23</td></tr>',
       '<tr><td>Edirne</td><td>36</td><td>25</td></tr>',
       '<tr><td>Elazığ</td><td>38</td><td>21</td></tr>',
       '<tr><td>Erzincan</td><td>36</td><td>22</td></tr>',
       '<tr><td>Erzurum</td><td>31</td><td>19</td></tr>',
       '<tr><td>Eskişehir</td><td>34</td><td>22</td></tr>',
       '<tr><td>Gaziantep</td><td>39</td><td>23</td></tr>',
       '<tr><td>Hatay</td><td>37</td><td>28</td></tr>',
       '<tr><td>Isparta</td><td>34</td><td>21</td></tr>',
       '<tr><td>İçel (Mersin)</td><td>35</td><td>29</td></tr>',
       '<tr><td>İstanbul</td><td>33</td><td>24</td></tr>',
       '<tr><td>İzmir</td><td>37</td><td>24</td></tr>',
       '<tr><td>Kahramanmaraş</td><td>36</td><td>25</td></tr>',
       '<tr><td>Karaman</td><td>34</td><td>21</td></tr>',
       '<tr><td>Kayseri</td><td>36</td><td>23</td></tr>',
       '<tr><td>Kocaeli</td><td>36</td><td>25</td></tr>',
       '<tr><td>Konya</td><td>34</td><td>21</td></tr>',
       '<tr><td>Malatya</td><td>38</td><td>21</td></tr>',
       '<tr><td>Manisa</td><td>40</td><td>25</td></tr>',
       '<tr><td>Mardin</td><td>38</td><td>23</td></tr>',
       '<tr><td>Muğla</td><td>37</td><td>22</td></tr>',
       '<tr><td>Osmaniye</td><td>38</td><td>26</td></tr>',
       '<tr><td>Sakarya</td><td>35</td><td>25</td></tr>',
       '<tr><td>Samsun</td><td>32</td><td>25</td></tr>',
       '<tr><td>Şanlıurfa</td><td>43</td><td>24</td></tr>',
       '<tr><td>Sivas</td><td>33</td><td>20</td></tr>',
       '<tr><td>Tekirdağ</td><td>33</td><td>25</td></tr>',
       '<tr><td>Trabzon</td><td>31</td><td>25</td></tr>',
       '<tr><td>Van</td><td>33</td><td>20</td></tr>',
       '<tr><td>Zonguldak</td><td>32</td><td>25</td></tr>',
     '</tbody>',
   '</table>',
   '<p><em>Kaynak: Meteoroloji Genel Müdürlüğü (MGM)</em></p>'
 )),
 'Türkiye illerine göre yaz tasarım kuru ve yaş termometre sıcaklık değerleri tablosu.',
 'Türkiye yaz tasarım kuru/yaş termometre değerleri tablosu',
 'Türkiye Yaz Kuru/Yaş Termometre Tasarım Değerleri | Ensotek',
 'Türkiye illerine göre yaz tasarım kuru ve yaş termometre sıcaklık değerleri. Soğutma kulesi ve HVAC tasarımı için referans.',
 'tasarım, yaz, kuru termometre, yaş termometre, türkiye, iklim verisi, hvac, soğutma kulesi',
 NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`), `slug` = VALUES(`slug`),
  `content` = VALUES(`content`), `summary` = VALUES(`summary`),
  `meta_title` = VALUES(`meta_title`), `meta_description` = VALUES(`meta_description`),
  `tags` = VALUES(`tags`), `updated_at` = VALUES(`updated_at`);

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
