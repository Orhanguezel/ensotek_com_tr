'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Send } from 'lucide-react';
import { offerFormSchema, type OfferFormValues, offerService } from '@/features/offer';

const inputClass =
  'w-full bg-(--color-bg-panel) border border-(--color-border) px-4 py-3 text-sm text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-none focus:border-(--color-accent) transition-colors';

export function OfferForm() {
  const t = useTranslations('offer');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      consent_marketing: false,
      consent_terms: false,
    },
  });

  async function onSubmit(values: OfferFormValues) {
    try {
      setError('');
      await offerService.create({
        ...values,
        locale,
        source: 'ensotek_com_tr',
        company_name: values.company_name || null,
        phone: values.phone || null,
        country_code: values.country_code || undefined,
        subject: values.subject || (locale === 'en' ? 'Website quote request' : 'Web sitesi teklif talebi'),
        form_data: {
          source: 'frontend_offer_page',
        },
      });
      setSubmitted(true);
      reset();
    } catch {
      setError(t('error'));
    }
  }

  if (submitted) {
    return (
      <div className="border border-(--color-accent) bg-(--color-bg-panel) p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 size-10 text-(--color-accent)" />
        <h2 className="mb-2 text-lg font-semibold uppercase text-(--color-accent) font-[family-name:var(--font-display)]">
          {t('successTitle')}
        </h2>
        <p className="text-sm text-(--color-text-secondary)">{t('successMessage')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input {...register('customer_name')} className={inputClass} placeholder={t('field.name')} />
          {errors.customer_name && <p className="mt-1 text-xs text-red-500">{t('required')}</p>}
        </div>
        <input {...register('company_name')} className={inputClass} placeholder={t('field.company')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input {...register('email')} type="email" className={inputClass} placeholder={t('field.email')} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{t('required')}</p>}
        </div>
        <input {...register('phone')} type="tel" className={inputClass} placeholder={t('field.phone')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input {...register('country_code')} className={inputClass} placeholder={t('field.country')} />
        <input {...register('subject')} className={inputClass} placeholder={t('field.subject')} />
      </div>
      <div>
        <textarea {...register('message')} rows={7} className={`${inputClass} resize-none`} placeholder={t('field.message')} />
        {errors.message && <p className="mt-1 text-xs text-red-500">{t('required')}</p>}
      </div>
      <label className="flex gap-3 text-sm text-(--color-text-secondary)">
        <input type="checkbox" {...register('consent_terms')} className="mt-1 size-4 accent-(--color-accent)" />
        <span>{t('field.terms')}</span>
      </label>
      {errors.consent_terms && <p className="text-xs text-red-500">{t('required')}</p>}
      <label className="flex gap-3 text-sm text-(--color-text-secondary)">
        <input type="checkbox" {...register('consent_marketing')} className="mt-1 size-4 accent-(--color-accent)" />
        <span>{t('field.marketing')}</span>
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-fill w-full justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50">
        <Send size={16} />
        {isSubmitting ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
