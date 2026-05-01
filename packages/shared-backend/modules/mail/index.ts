/**
 * Mail module stub.
 * Her projenin kendi mail konfigurasyonu vardir.
 * Bu stub derleme icin gerekli export'lari saglar.
 * Proje backend'inde override edilir.
 */
export const SITE_NAME = process.env.SITE_NAME ?? 'Ensotek';

export function escapeMailHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function wrapMailBody(inner: string): string {
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5">${inner}</body></html>`;
}

export async function sendMailRaw(_opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> {
  console.warn('[shared-backend] sendMailRaw stub called — override in project');
}

export async function sendWelcomeMail(_input: { to: string; user_name: string; user_email: string }): Promise<void> {
  console.warn('[shared-backend] sendWelcomeMail stub called — override in project');
}

export async function sendPasswordChangedMail(_input: { to: string; user_name?: string }): Promise<void> {
  console.warn('[shared-backend] sendPasswordChangedMail stub called — override in project');
}
