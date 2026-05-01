import { API_BASE_URL } from '@/lib/utils';

export const revalidate = 3600;

export async function GET() {
  let body = '';
  try {
    const res = await fetch(`${API_BASE_URL}/site_settings/llms_txt`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const raw = (data?.value ?? data?.data?.value ?? data) as unknown;
      if (typeof raw === 'string') body = raw;
      else if (raw && typeof raw === 'object') body = String((raw as { value?: unknown }).value ?? '');
    }
  } catch {
    body = '';
  }

  if (!body) {
    body = '# Ensotek\n\nIndustrial cooling tower systems. Visit https://www.ensotek.com.tr for details.';
  }

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
