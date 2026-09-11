'use client';

import { useState, type FormEvent } from 'react';
import { useLocale } from 'next-intl';

export function NewsletterForm() {
  const locale = useLocale();
  const en = locale === 'en';
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || status === 'pending') return;
    setStatus('pending');
    try {
      const response = await fetch('/api/newsletter/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept-Language': locale }, body: JSON.stringify({ email, locale, meta: { source: 'website_footer', marketing_consent: true, consent_text_version: 'newsletter-20260910' } }) });
      const result = await response.json();
      if (!response.ok || !result.id) throw new Error('subscription_failed');
      setStatus('success'); setEmail(''); setConsent(false);
    } catch { setStatus('error'); }
  }
  return <form onSubmit={submit} className="my-8 max-w-xl space-y-3" aria-label={en ? 'Technical newsletter' : 'Teknik bülten'}>
    <h3 className="font-semibold">{en ? 'Technical newsletter' : 'Teknik bülten'}</h3>
    <label className="block" htmlFor="newsletter-email">{en ? 'Email address' : 'E-posta adresi'}</label>
    <div className="flex flex-wrap gap-3">
      <input id="newsletter-email" type="email" autoComplete="email" required maxLength={255} value={email} onChange={event => setEmail(event.target.value)} className="min-w-0 flex-1 rounded border border-current bg-transparent px-3 py-2" />
      <button type="submit" disabled={!consent || status === 'pending'} className="rounded border border-current px-4 py-2 disabled:opacity-50">{status === 'pending' ? (en ? 'Saving…' : 'Kaydediliyor…') : (en ? 'Subscribe' : 'Abone ol')}</button>
    </div>
    <label className="flex items-start gap-2 text-sm"><input type="checkbox" required checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1" /><span>{en ? 'I agree to receive technical news by email. ' : 'Teknik haberleri e-posta ile almayı kabul ediyorum. '}<a href={en ? "https://ensotek.de/en/legal/privacy-policy" : "https://ensotek.de/tr/legal/kvkk"} className="underline">{en ? 'Privacy information' : 'Gizlilik bilgisi'}</a></span></label>
    <p role="status" aria-live="polite">{status === 'success' ? (en ? 'Your subscription request has been saved.' : 'Abonelik talebiniz kaydedildi.') : status === 'error' ? (en ? 'Your request could not be saved. Please try again.' : 'Talebiniz kaydedilemedi. Lütfen tekrar deneyin.') : ''}</p>
  </form>;
}
