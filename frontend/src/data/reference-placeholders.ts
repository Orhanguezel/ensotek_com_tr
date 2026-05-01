export type ReferencePlaceholder = {
  id: string;
  client_name: string;
  title: string;
  summary: string;
  sector: string;
  location: string;
  year: number;
  logoText: string;
};

const trReferences: ReferencePlaceholder[] = [
  {
    id: 'placeholder-kardemir',
    client_name: 'KARDEMIR',
    title: 'Demir-çelik tesisi proses soğutma projesi',
    summary: 'Ağır sanayi proseslerinde sürekli soğutma ihtiyacı için endüstriyel soğutma kulesi çözümü.',
    sector: 'Demir-çelik',
    location: 'Karabük, Türkiye',
    year: 2024,
    logoText: 'K',
  },
  {
    id: 'placeholder-tupras',
    client_name: 'TÜPRAŞ',
    title: 'Rafineri proses soğutma sistemi',
    summary: 'Petrokimya proseslerinde yüksek ısı yükü için güvenilir ve servis edilebilir soğutma altyapısı.',
    sector: 'Petrokimya',
    location: 'İzmit, Türkiye',
    year: 2024,
    logoText: 'T',
  },
  {
    id: 'placeholder-ford',
    client_name: 'FORD OTOSAN',
    title: 'Otomotiv üretim hattı soğutma uygulaması',
    summary: 'Üretim hatlarında proses ve HVAC ihtiyaçlarını destekleyen endüstriyel kule çözümü.',
    sector: 'Otomotiv',
    location: 'Kocaeli, Türkiye',
    year: 2023,
    logoText: 'F',
  },
  {
    id: 'placeholder-aselsan',
    client_name: 'ASELSAN',
    title: 'Kritik tesis iklimlendirme ve proses soğutma',
    summary: 'Hassas üretim ve tesis altyapısı için sürdürülebilir soğutma kapasitesi.',
    sector: 'Savunma',
    location: 'Ankara, Türkiye',
    year: 2023,
    logoText: 'A',
  },
  {
    id: 'placeholder-erdemir',
    client_name: 'ERDEMİR',
    title: 'Ağır sanayi su soğutma kulesi',
    summary: 'Yüksek kapasiteli proses soğutma için CTP gövdeli kule uygulaması.',
    sector: 'Demir-çelik',
    location: 'Zonguldak, Türkiye',
    year: 2022,
    logoText: 'E',
  },
  {
    id: 'placeholder-arcelik',
    client_name: 'ARÇELİK',
    title: 'CTP 6C açık tip soğutma kulesi',
    summary: 'Beyaz eşya üretim tesisinde proses soğutma sürekliliği için açık tip kule çözümü.',
    sector: 'Beyaz eşya',
    location: 'Gebze, Türkiye',
    year: 2022,
    logoText: 'A',
  },
  {
    id: 'placeholder-tofas',
    client_name: 'TOFAŞ',
    title: 'Otomotiv fabrikası açık tip soğutma kulesi',
    summary: 'Boya hatları, kalıp soğutma ve proses ekipmanları için CTP kaportalı kule çözümü.',
    sector: 'Otomotiv',
    location: 'Bursa, Türkiye',
    year: 2022,
    logoText: 'T',
  },
  {
    id: 'placeholder-eczacibasi',
    client_name: 'ECZACIBAŞI',
    title: 'Kapalı devre proses soğutma',
    summary: 'İlaç üretiminde proses akışkanını koruyan kapalı devre soğutma kulesi uygulaması.',
    sector: 'İlaç',
    location: 'İstanbul, Türkiye',
    year: 2021,
    logoText: 'E',
  },
  {
    id: 'placeholder-linde',
    client_name: 'LINDE GAZ',
    title: 'Yüksek performanslı kapalı devre sistem',
    summary: 'Endüstriyel gaz üretiminde TCTP ve DCTP serisiyle yüksek kapasite soğutma.',
    sector: 'Endüstriyel gaz',
    location: 'Gebze, Türkiye',
    year: 2021,
    logoText: 'L',
  },
  {
    id: 'placeholder-hes',
    client_name: 'HES KABLO',
    title: 'Kablo üretim tesisi kapalı devre soğutma',
    summary: 'Üretim hattı sürekliliğini destekleyen DCTP kapalı devre kule uygulaması.',
    sector: 'Kablo üretimi',
    location: 'Kayseri, Türkiye',
    year: 2020,
    logoText: 'H',
  },
  {
    id: 'placeholder-green-park',
    client_name: 'GREEN PARK',
    title: 'Otel HVAC soğutma kulesi',
    summary: 'Merkezi iklimlendirme sistemleri için düşük bakım ihtiyacı olan açık tip kule çözümü.',
    sector: 'Turizm & HVAC',
    location: 'İstanbul, Türkiye',
    year: 2020,
    logoText: 'G',
  },
  {
    id: 'placeholder-orion',
    client_name: 'ORION AVM',
    title: 'Alışveriş merkezi kapalı devre soğutma',
    summary: 'Ticari HVAC altyapısı için kompakt ve güvenilir TCTP serisi uygulaması.',
    sector: 'Ticari HVAC',
    location: 'Tekirdağ, Türkiye',
    year: 2019,
    logoText: 'O',
  },
  {
    id: 'placeholder-aves',
    client_name: 'AVES',
    title: 'Gıda üretim tesisi soğutma sistemi',
    summary: 'Gıda proseslerinde hijyen ve süreklilik ihtiyacına uygun kombine kapalı devre çözüm.',
    sector: 'Gıda',
    location: 'Mersin, Türkiye',
    year: 2019,
    logoText: 'A',
  },
  {
    id: 'placeholder-tat',
    client_name: 'TAT TEKSTİL',
    title: 'Tekstil prosesi açık tip soğutma',
    summary: 'Tekstil üretiminde oluşan ısı yükünü karşılayan CTP kaportalı açık tip kule.',
    sector: 'Tekstil',
    location: 'Gaziantep, Türkiye',
    year: 2018,
    logoText: 'T',
  },
  {
    id: 'placeholder-plastifay',
    client_name: 'PLASTİFAY',
    title: 'Plastik üretim tesisi CTP soğutma kulesi',
    summary: 'Plastik proses ekipmanları için korozyona dayanıklı açık tip soğutma altyapısı.',
    sector: 'Plastik',
    location: 'Türkiye',
    year: 2018,
    logoText: 'P',
  },
];

const enReferences: ReferencePlaceholder[] = trReferences.map((item) => ({
  ...item,
  title: `${item.client_name} industrial cooling tower project`,
  summary: `Placeholder reference for ${item.sector.toLowerCase()} applications. Final logo and project details will be replaced with approved customer data.`,
  location: item.location.replace('Türkiye', 'Turkey'),
}));

export function getReferencePlaceholders(locale: string): ReferencePlaceholder[] {
  return locale === 'en' ? enReferences : trReferences;
}
