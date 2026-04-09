'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { contactService } from '@/features/contact/contact.service';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { MapPin, Phone, Mail } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export function ContactSection() {
  const t = useTranslations('home.contact');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
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

  return (
    <section className="section-py bg-(--deep)" id="contact">
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
            <div className="space-y-6">
              {[
                { icon: MapPin, key: 'address' },
                { icon: Phone, key: 'phone' },
                { icon: Mail, key: 'email' },
              ].map(({ icon: Icon, key }) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="size-10 border border-(--color-border) flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-(--cyan)" />
                  </div>
                  <div>
                    <div className="text-xs text-(--silver) uppercase tracking-wider mb-1 font-[family-name:var(--font-display)]">
                      {t(`info.${key}.label`)}
                    </div>
                    <div className="text-sm text-(--light)">{t(`info.${key}.value`)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={150}>
            {submitted ? (
              <div className="border border-(--cyan) p-8 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-lg font-semibold text-(--cyan) mb-2 font-[family-name:var(--font-display)] uppercase">
                  {t('successTitle')}
                </h3>
                <p className="text-sm text-(--mist)">{t('successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('name')}
                      placeholder={t('field.name')}
                      className="w-full bg-(--panel) border border-(--color-border) px-4 py-3 text-sm text-(--white) placeholder:text-(--silver) focus:outline-none focus:border-(--cyan) transition-colors"
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{t('required')}</p>}
                  </div>
                  <div>
                    <input
                      {...register('company')}
                      placeholder={t('field.company')}
                      className="w-full bg-(--panel) border border-(--color-border) px-4 py-3 text-sm text-(--white) placeholder:text-(--silver) focus:outline-none focus:border-(--cyan) transition-colors"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder={t('field.email')}
                      className="w-full bg-(--panel) border border-(--color-border) px-4 py-3 text-sm text-(--white) placeholder:text-(--silver) focus:outline-none focus:border-(--cyan) transition-colors"
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{t('required')}</p>}
                  </div>
                  <div>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder={t('field.phone')}
                      className="w-full bg-(--panel) border border-(--color-border) px-4 py-3 text-sm text-(--white) placeholder:text-(--silver) focus:outline-none focus:border-(--cyan) transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder={t('field.message')}
                    className="w-full bg-(--panel) border border-(--color-border) px-4 py-3 text-sm text-(--white) placeholder:text-(--silver) focus:outline-none focus:border-(--cyan) transition-colors resize-none"
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{t('required')}</p>}
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
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
