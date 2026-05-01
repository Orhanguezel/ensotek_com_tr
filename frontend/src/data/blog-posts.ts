import type { BlogPost } from '@/lib/api';

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-tr-001',
    module_key: 'blog',
    is_published: 1,
    display_order: 10,
    locale: 'tr',
    created_at: '2026-01-15T09:00:00.000Z',
    updated_at: '2026-01-15T09:00:00.000Z',
    title: 'Soğutma Kulesi Seçim Rehberi',
    slug: 'sogutma-kulesi-secim-rehberi',
    summary:
      'Açık devre, kapalı devre ve hibrit soğutma kulesi seçeneklerini proses yükü, su kalitesi, yaklaşım sıcaklığı ve saha koşullarına göre değerlendirin.',
    meta_title: 'Soğutma Kulesi Seçim Rehberi | Ensotek',
    meta_description:
      'Endüstriyel tesisler için soğutma kulesi seçerken kapasite, yaklaşım sıcaklığı, su kalitesi, bakım ve enerji verimliliği kriterleri.',
    content:
      '<p>Soğutma kulesi seçimi yalnızca kapasite hesabıyla tamamlanmaz. Proses suyu sıcaklıkları, yaş termometre değeri, yaklaşım sıcaklığı, saha yerleşimi, ses limiti, su kalitesi ve bakım erişimi birlikte değerlendirilmelidir.</p><h2>Temel seçim kriterleri</h2><p>Açık devre kuleler yüksek evaporatif verim ve ekonomik ilk yatırım sunar. Kapalı devre kuleler proses akışkanını dış ortamdan ayırarak kirlenme riskini azaltır. Hibrit çözümler ise su tüketimi, görünür buhar ve enerji maliyeti arasında daha hassas denge kurmak isteyen tesisler için değerlendirilir.</p><h2>Proje verileri neden önemlidir?</h2><p>Debi, giriş ve çıkış sıcaklıkları, yaş termometre değeri, rakım ve çalışma rejimi doğru verilmediğinde kule kapasitesi sahada beklenen performansı sağlayamayabilir. Ensotek mühendislik ekibi bu verilerle termal seçim, malzeme yapısı ve bakım senaryosunu birlikte analiz eder.</p>',
  },
  {
    id: 'blog-tr-002',
    module_key: 'blog',
    is_published: 1,
    display_order: 20,
    locale: 'tr',
    created_at: '2026-01-22T09:00:00.000Z',
    updated_at: '2026-01-22T09:00:00.000Z',
    title: 'Soğutma Kulelerinde Legionella Önleme',
    slug: 'sogutma-kulelerinde-legionella-onleme',
    summary:
      'Legionella riskini azaltmak için su şartlandırma, biyosid uygulaması, düzenli temizlik ve bakım kayıtlarının birlikte yürütülmesi gerekir.',
    meta_title: 'Soğutma Kulelerinde Legionella Önleme | Ensotek',
    meta_description:
      'Soğutma kulelerinde Legionella riskini azaltmak için bakım, temizlik, su şartlandırma ve izleme uygulamaları.',
    content:
      '<p>Soğutma kuleleri doğru işletilmediğinde biyofilm oluşumu, tortu birikimi ve durgun su bölgeleri mikrobiyolojik riskleri artırabilir. Legionella yönetimi bu nedenle tek seferlik temizlik değil, düzenli izleme ve kayıtlı bakım disiplinidir.</p><h2>Önleyici bakım yaklaşımı</h2><p>Düzenli blöf, filtrasyon, su şartlandırma, biyosid dozajı ve mekanik temizlik birlikte uygulanmalıdır. Damla tutucu, dolgu, havuz ve su dağıtım sistemi periyodik olarak kontrol edilmelidir.</p><h2>İzleme ve kayıt</h2><p>Sıcaklık, iletkenlik, pH, biyosid seviyesi ve mikrobiyolojik analiz sonuçları kayıt altında tutulduğunda riskli trendler erken fark edilir. Ensotek servis yaklaşımı bakım planını tesisin çalışma rejimine göre düzenler.</p>',
  },
  {
    id: 'blog-tr-003',
    module_key: 'blog',
    is_published: 1,
    display_order: 30,
    locale: 'tr',
    created_at: '2026-01-29T09:00:00.000Z',
    updated_at: '2026-01-29T09:00:00.000Z',
    title: 'CTP ve FRP Soğutma Kulesi Gövdeleri Karşılaştırması',
    slug: 'ctp-frp-sogutma-kulesi-govdeleri-karsilastirmasi',
    summary:
      'CTP/FRP gövdeler korozyon dayanımı, düşük bakım ihtiyacı ve uzun servis ömrüyle endüstriyel soğutma kulelerinde güçlü bir alternatiftir.',
    meta_title: 'CTP FRP Soğutma Kulesi Gövde Karşılaştırması | Ensotek',
    meta_description:
      'CTP ve FRP soğutma kulesi gövdelerinin korozyon, bakım, ağırlık ve servis ömrü açısından avantajları.',
    content:
      '<p>CTP ve FRP terimleri cam elyaf takviyeli polyester kompozit yapıları ifade eder. Soğutma kulesi gövdelerinde bu malzeme grubu korozyon dayanımı ve düşük bakım ihtiyacı nedeniyle yaygın kullanılır.</p><h2>Neden kompozit gövde?</h2><p>Metal yüzeylerde korozyon, boya yenileme ve kimyasal ortam etkisi önemli işletme giderleri oluşturabilir. CTP/FRP gövdeler hafif, modüler ve kimyasal etkilere dayanıklı yapısıyla saha montajını ve uzun dönem işletmeyi kolaylaştırır.</p><h2>Seçimde dikkat edilecekler</h2><p>Reçine tipi, UV dayanımı, bağlantı detayları, servis erişimi ve taşıyıcı yapı tasarımı gövde performansını belirler. Ensotek kule tasarımlarında kompozit üretim deneyimini termal tasarım ve bakım erişimiyle birlikte ele alır.</p>',
  },
];

export function fallbackBlogPost(slug: string): BlogPost | null {
  return FALLBACK_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}
