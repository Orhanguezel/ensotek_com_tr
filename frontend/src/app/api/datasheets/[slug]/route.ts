import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/utils';
import { buildDatasheetPdf } from '@/lib/datasheet-pdf';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = new URL(req.url).searchParams.get('locale') || 'tr';
  const res = await fetch(`${API_BASE_URL}/products/by-slug/${encodeURIComponent(slug)}?item_type=product&locale=${locale}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  const product = await res.json();
  const pdf = buildDatasheetPdf(product, locale);
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${slug}-datasheet.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
