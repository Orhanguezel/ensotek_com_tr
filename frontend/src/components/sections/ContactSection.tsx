'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { contactService } from '@/features/contact/contact.service';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { MapPin, Phone, Mail, Clock, Factory, MessageCircle } from 'lucide-react';
import type { ContactInfo } from '@/lib/api';

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

interface Props {
  contactInfo?: ContactInfo;
  initialMessage?: string;
}

export function ContactSection({ contactInfo, initialMessage = '' }: Props) {
  const t = useTranslations('home.contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: initialMessage,
    },
  });

  async function onSubmit(data: FormData) {
    try {
      setError('');
      await contactService.submit(data);
      setSubmitted(true);
      reset();
    } catch {
      setError(t('error'));
    }
  }

  const phone1 = contactInfo?.phone;
  const phone2 = contactInfo?.phone_2;
  const phone1Wa = contactInfo?.phone_is_whatsapp ?? false;
  const phone2Wa = contactInfo?.phone_2_is_whatsapp ?? false;
  const email1 = contactInfo?.email;
  const email2 = contactInfo?.email_2;
  const headquartersLabel = contactInfo?.address_label ?? (locale === 'en' ? 'Headquarters' : locale === 'de' ? 'Hauptsitz' : 'Merkez');
  const factoryLabel = contactInfo?.factory_label ?? (locale === 'en' ? 'Factory' : locale === 'de' ? 'Fabrik' : 'Fabrika');
  const phoneLabel = locale === 'en' ? 'Phone / WhatsApp' : locale === 'de' ? 'Telefon / WhatsApp' : 'Telefon / WhatsApp';

  const waLink = (raw: string) => `https://wa.me/${raw.replace(/[^0-9]/g, '')}`;
  const telLink = (raw: string) => `tel:${raw.replace(/\s/g, '')}`;

  const inputClass =
    'w-full bg-(--color-bg-panel) border border-(--color-border) px-4 py-3 text-sm text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-none focus:border-(--color-accent) transition-colors';

  return (
    <section className="section-py bg-(--color-bg-secondary)" id="contact">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <Reveal>
            <SectionHeader
              label={t('label')}
              title={t('title')}
              description={t('subtitle')}
              className="mb-10"
            />

            {contactInfo?.company_name && (
              <h3 className="mb-6 text-base font-semibold text-(--color-text-primary) font-[family-name:var(--font-display)] leading-snug">
                {contactInfo.company_name}
              </h3>
            )}

            <div className="space-y-6">
              {/* Phones */}
              {(phone1 || phone2) && (
                <div className="flex items-start gap-4">
                  <div className="size-10 border border-(--color-border) flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={16} className="text-(--color-accent)" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-(--color-text-muted) uppercase tracking-wider mb-2 font-[family-name:var(--font-display)]">
                      {phoneLabel}
                    </div>
                    <div className="space-y-1">
                      {phone1 && (
                        <div className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                          <a href={telLink(phone1)} className="hover:text-(--color-accent) transition-colors">
                            {phone1}
                          </a>
                          {phone1Wa && (
                            <a
                              href={waLink(phone1)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="WhatsApp"
                              className="inline-flex items-center text-(--color-accent) hover:opacity-80 transition-opacity"
                            >
                              <MessageCircle size={14} />
                            </a>
                          )}
                        </div>
                      )}
                      {phone2 && (
                        <div className="flex items-center gap-2 text-sm text-(--color-text-secondary)">
                          <a href={telLink(phone2)} className="hover:text-(--color-accent) transition-colors">
                            {phone2}
                          </a>
                          {phone2Wa && (
                            <a
                              href={waLink(phone2)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="WhatsApp"
                              className="inline-flex items-center text-(--color-accent) hover:opacity-80 transition-opacity"
                            >
                              <MessageCircle size={14} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Emails */}
              {(email1 || email2) && (
                <div className="flex items-start gap-4">
                  <div className="size-10 border border-(--color-border) flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={16} className="text-(--color-accent)" />
                  </div>
                  <div className="flex-1 space-y-1">
                    {email1 && (
                      <a
                        href={`mailto:${email1}`}
                        className="block text-sm text-(--color-text-secondary) hover:text-(--color-accent) transition-colors"
                      >
                        {email1}
                      </a>
                    )}
                    {email2 && (
                      <a
                        href={`mailto:${email2}`}
                        className="block text-sm text-(--color-text-secondary) hover:text-(--color-accent) transition-colors"
                      >
                        {email2}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Headquarters */}
              {contactInfo?.address && (
                <div className="flex items-start gap-4">
                  <div className="size-10 border border-(--color-border) flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} className="text-(--color-accent)" />
                  </div>
                  <div>
                    <div className="text-xs text-(--color-text-muted) uppercase tracking-wider mb-1 font-[family-name:var(--font-display)]">
                      {headquartersLabel}
                    </div>
                    <div className="text-sm text-(--color-text-secondary)">{contactInfo.address}</div>
                  </div>
                </div>
              )}

              {/* Factory */}
              {contactInfo?.factory_address && (
                <div className="flex items-start gap-4">
                  <div className="size-10 border border-(--color-border) flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Factory size={16} className="text-(--color-accent)" />
                  </div>
                  <div>
                    <div className="text-xs text-(--color-text-muted) uppercase tracking-wider mb-1 font-[family-name:var(--font-display)]">
                      {factoryLabel}
                    </div>
                    <div className="text-sm text-(--color-text-secondary)">{contactInfo.factory_address}</div>
                  </div>
                </div>
              )}

              {/* Working hours */}
              {contactInfo?.working_hours && (
                <div className="flex items-start gap-4">
                  <div className="size-10 border border-(--color-border) flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={16} className="text-(--color-accent)" />
                  </div>
                  <div className="text-sm text-(--color-text-secondary) self-center">
                    {contactInfo.working_hours}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={150}>
            {submitted ? (
              <div className="border border-(--color-accent) p-8 text-center">
                <div className="text-4xl mb-4 text-(--color-accent)">✓</div>
                <h3 className="text-lg font-semibold text-(--color-accent) mb-2 font-[family-name:var(--font-display)] uppercase">
                  {t('successTitle')}
                </h3>
                <p className="text-sm text-(--color-text-secondary)">{t('successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('name')}
                      placeholder={t('field.name')}
                      className={inputClass}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{t('required')}</p>}
                  </div>
                  <div>
                    <input
                      {...register('company')}
                      placeholder={t('field.company')}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder={t('field.email')}
                      className={inputClass}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{t('required')}</p>}
                  </div>
                  <div>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder={t('field.phone')}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder={t('field.message')}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{t('required')}</p>}
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-fill w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('sending') : t('submit')}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
