type DatasheetProduct = {
  title: string;
  slug: string;
  product_code?: string | null;
  summary?: string | null;
  description?: string | null;
  specifications?: Record<string, unknown> | null;
};

function clean(value: unknown): string {
  return String(value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .normalize('NFKD')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function pdfText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function linesForProduct(product: DatasheetProduct, locale: string): string[] {
  const specs = Object.entries(product.specifications ?? {}).slice(0, 12);
  const labels = locale === 'tr'
    ? { code: 'Model Kodu', desc: 'Aciklama', specs: 'Teknik Ozellikler', contact: 'Iletisim' }
    : { code: 'Model Code', desc: 'Description', specs: 'Technical Specifications', contact: 'Contact' };
  return [
    'ENSOTEK TECHNICAL DATASHEET',
    clean(product.title),
    `${labels.code}: ${clean(product.product_code || product.slug)}`,
    '',
    labels.desc,
    clean(product.summary || product.description || 'Industrial cooling tower product datasheet.'),
    '',
    labels.specs,
    ...(specs.length > 0 ? specs.map(([key, value]) => `${clean(key)}: ${clean(value)}`) : ['Capacity: Project-specific thermal selection', 'Material: FRP / CTP composite body', 'Application: Industrial process cooling']),
    '',
    labels.contact,
    'ensotek@ensotek.com.tr | +90 212 613 33 01 | www.ensotek.com.tr',
  ];
}

export function buildDatasheetPdf(product: DatasheetProduct, locale: string): Buffer {
  const text = linesForProduct(product, locale).slice(0, 28);
  const content = [
    'BT',
    '/F1 20 Tf',
    '50 790 Td',
    `(${pdfText(text[0] ?? 'ENSOTEK TECHNICAL DATASHEET')}) Tj`,
    '/F1 14 Tf',
    ...text.slice(1).flatMap((line) => ['0 -24 Td', `(${pdfText(line)}) Tj`]),
    'ET',
  ].join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, 'binary');
}
