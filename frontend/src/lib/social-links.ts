export interface SocialLink { label: string; href: string }
const labels: Record<string, string> = { instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube', linkedin: 'LinkedIn', x: 'X', tiktok: 'TikTok' };
/** One settings source for visible links and Organization sameAs. No guessed accounts. */
export function socialLinksFromSetting(value: unknown): SocialLink[] {
  let data = value;
  if (typeof data === 'string') { try { data = JSON.parse(data); } catch { return []; } }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return [];
  return Object.entries(labels).flatMap(([key, label]) => {
    const href = (data as Record<string, unknown>)[key];
    if (typeof href !== 'string' || !href.trim()) return [];
    try { const url = new URL(href); return url.protocol === 'https:' ? [{ label, href: url.href }] : []; }
    catch { return []; }
  });
}
