'use client';

import { useState } from 'react';
import { FileText, Send, X } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';

type Props = {
  locale: string;
  productTitle: string;
  productSlug: string;
};

const copy = {
  tr: {
    button: 'Teknik Datasheet İndir',
    title: 'Teknik Datasheet',
    subtitle: 'PDF bağlantısını e-posta ile gönderelim.',
    name: 'Ad Soyad',
    company: 'Firma',
    email: 'E-posta',
    phone: 'Telefon',
    terms: 'KVKK aydınlatma metnini okudum ve datasheet talebim için verilerimin işlenmesini kabul ediyorum.',
    submit: 'PDF Linkini Gönder',
    loading: 'Gönderiliyor...',
    success: 'Datasheet bağlantısı e-posta adresinize gönderildi. İndirme başlatılıyor.',
    error: 'Talep gönderilemedi. Lütfen tekrar deneyin.',
    close: 'Kapat',
  },
  en: {
    button: 'Download Technical Datasheet',
    title: 'Technical Datasheet',
    subtitle: 'We will send the PDF link by email.',
    name: 'Full name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    terms: 'I accept the processing of my data for this datasheet request.',
    submit: 'Send PDF Link',
    loading: 'Sending...',
    success: 'The datasheet link was sent to your email. Download is starting.',
    error: 'The request could not be sent. Please try again.',
    close: 'Close',
  },
};

export function DatasheetRequestButton({ locale, productTitle, productSlug }: Props) {
  const t = copy[locale as 'tr' | 'en'] ?? copy.tr;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', consent: false });
  const datasheetUrl = `/api/datasheets/${encodeURIComponent(productSlug)}?locale=${encodeURIComponent(locale)}`;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE_URL}/catalog-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          company_name: form.company || null,
          email: form.email,
          phone: form.phone || null,
          locale,
          country_code: locale === 'tr' ? 'TR' : 'US',
          consent_terms: form.consent,
          consent_marketing: false,
          catalog_url: datasheetUrl,
          message: `Datasheet request: ${productTitle}`,
        }),
      });
      if (!res.ok) throw new Error('datasheet_request_failed');
      setStatus('success');
      window.setTimeout(() => {
        window.location.href = datasheetUrl;
      }, 700);
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-ghost">
        <FileText size={16} />
        {t.button}
      </button>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/70" aria-label={t.close} onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md border border-(--color-border) bg-(--deep) p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-wide text-(--white)">
                  {t.title}
                </h2>
                <p className="text-sm text-(--silver)">{t.subtitle}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-(--silver) hover:text-(--cyan)" aria-label={t.close}>
                <X size={20} />
              </button>
            </div>
            {status === 'success' ? (
              <p className="text-sm text-(--mist)">{t.success}</p>
            ) : (
              <form onSubmit={submit} className="grid gap-4">
                <input required className="contact-input-et" placeholder={`${t.name} *`} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                <input className="contact-input-et" placeholder={t.company} value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
                <input required type="email" className="contact-input-et" placeholder={`${t.email} *`} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
                <input className="contact-input-et" placeholder={t.phone} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
                <label className="flex gap-3 text-xs leading-relaxed text-(--mist)">
                  <input required type="checkbox" checked={form.consent} onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))} />
                  <span>{t.terms} *</span>
                </label>
                {status === 'error' && <p className="text-sm text-red-300">{t.error}</p>}
                <button type="submit" disabled={status === 'loading'} className="btn-fill justify-center text-xs disabled:opacity-60">
                  <Send size={15} />
                  {status === 'loading' ? t.loading : t.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
