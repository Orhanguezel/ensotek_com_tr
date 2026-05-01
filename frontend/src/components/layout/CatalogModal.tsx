'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Send, X } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  locale: string;
}

const copy = {
  tr: {
    title: 'Katalog Talep Et',
    subtitle: 'PDF katalog bağlantısını e-posta ile gönderelim.',
    name: 'Ad Soyad',
    company: 'Firma',
    email: 'E-posta',
    phone: 'Telefon',
    message: 'Mesaj',
    messagePlaceholder: 'Hangi ürün grubu veya proje için katalog istediğinizi yazabilirsiniz.',
    terms: 'KVKK aydınlatma metnini okudum ve katalog talebim için verilerimin işlenmesini kabul ediyorum.',
    marketing: 'Ürün ve teknik içerik e-postaları almak istiyorum.',
    submit: 'Katalog İste',
    loading: 'Gönderiliyor...',
    successTitle: 'Talebiniz alındı',
    success: 'Katalog bağlantısı e-posta adresinize gönderilecek.',
    error: 'Talep gönderilemedi. Lütfen tekrar deneyin.',
    close: 'Kapat',
  },
  en: {
    title: 'Request Catalog',
    subtitle: 'We will send the PDF catalog link by email.',
    name: 'Full name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    messagePlaceholder: 'You can tell us which product group or project the catalog is for.',
    terms: 'I accept the processing of my data for this catalog request.',
    marketing: 'I would like to receive product and technical content emails.',
    submit: 'Request Catalog',
    loading: 'Sending...',
    successTitle: 'Request received',
    success: 'The catalog link will be sent to your email address.',
    error: 'The request could not be sent. Please try again.',
    close: 'Close',
  },
};

export function CatalogModal({ open, onClose, locale }: Props) {
  const t = copy[locale as 'tr' | 'en'] ?? copy.tr;
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    customer_name: '',
    company_name: '',
    email: '',
    phone: '',
    message: '',
    consent_terms: false,
    consent_marketing: false,
  });

  useEffect(() => {
    if (!open) return;
    setStatus('idle');
    setForm({
      customer_name: '',
      company_name: '',
      email: '',
      phone: '',
      message: '',
      consent_terms: false,
      consent_marketing: false,
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE_URL}/catalog-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          company_name: form.company_name || null,
          phone: form.phone || null,
          message: form.message || null,
          locale,
          country_code: locale === 'tr' ? 'TR' : 'US',
        }),
      });
      if (!res.ok) throw new Error('catalog_request_failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/70" aria-label={t.close} onClick={onClose} />
      <div className="relative w-full max-w-lg border border-(--color-border) bg-(--deep) shadow-2xl">
        <div className="flex items-center justify-between border-b border-(--color-border) p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center border border-(--color-border-strong) text-(--cyan)">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-wide text-(--white)">
                {t.title}
              </h2>
              <p className="text-xs text-(--silver)">{t.subtitle}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-(--silver) hover:text-(--cyan)" aria-label={t.close}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="py-8 text-center">
              <h3 className="mb-3 text-xl font-semibold text-(--white)">{t.successTitle}</h3>
              <p className="mb-6 text-sm text-(--mist)">{t.success}</p>
              <button type="button" onClick={onClose} className="btn-fill text-xs">
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required minLength={2} className="contact-input-et" placeholder={`${t.name} *`} value={form.customer_name} onChange={(e) => setForm((p) => ({ ...p, customer_name: e.target.value }))} />
                <input className="contact-input-et" placeholder={t.company} value={form.company_name} onChange={(e) => setForm((p) => ({ ...p, company_name: e.target.value }))} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required type="email" className="contact-input-et" placeholder={`${t.email} *`} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
                <input className="contact-input-et" placeholder={t.phone} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              </div>
              <textarea className="contact-input-et min-h-24 resize-none" placeholder={t.messagePlaceholder} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} />
              <label className="flex gap-3 text-xs leading-relaxed text-(--mist)">
                <input required type="checkbox" checked={form.consent_terms} onChange={(e) => setForm((p) => ({ ...p, consent_terms: e.target.checked }))} />
                <span>{t.terms} *</span>
              </label>
              <label className="flex gap-3 text-xs leading-relaxed text-(--mist)">
                <input type="checkbox" checked={form.consent_marketing} onChange={(e) => setForm((p) => ({ ...p, consent_marketing: e.target.checked }))} />
                <span>{t.marketing}</span>
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
    </div>
  );
}
