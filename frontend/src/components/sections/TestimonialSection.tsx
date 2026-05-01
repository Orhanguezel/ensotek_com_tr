import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import type { FeaturedTestimonial, Review } from '@/lib/api';

interface Props {
  testimonial?: FeaturedTestimonial;
  testimonials?: Review[];
}

export function TestimonialSection({ testimonial, testimonials = [] }: Props) {
  const t = useTranslations('home.testimonial');
  const hasTestimonials = testimonials.length > 0;

  return (
    <section className="section-py bg-(--color-bg-secondary)">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {hasTestimonials ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <article className="h-full rounded-lg border border-(--color-border) bg-(--color-bg) p-6">
                  <div className="mb-5 flex gap-1 text-(--color-accent)" aria-label={`${item.rating}/5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} aria-hidden="true">
                        {i < Math.round(item.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <blockquote>
                    <p className="mb-6 text-sm leading-relaxed text-(--color-text-secondary)">
                      {item.comment}
                    </p>
                    <footer>
                      <cite className="not-italic">
                        <div className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide text-(--color-accent)">
                          {item.name}
                        </div>
                        <div className="mt-1 text-xs text-(--color-text-muted)">
                          {[item.role, item.company].filter(Boolean).join(' · ')}
                        </div>
                      </cite>
                    </footer>
                  </blockquote>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="text-center relative">
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-9xl text-(--color-accent) opacity-10 font-serif leading-none select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <blockquote className="relative z-10">
                  <p className="text-xl lg:text-2xl font-[family-name:var(--font-serif)] italic text-(--color-text-primary) leading-relaxed mb-8">
                    {testimonial?.quote ?? t('quote')}
                  </p>
                  <footer>
                    <cite className="not-italic">
                      <div className="text-sm font-semibold text-(--color-accent) tracking-wider uppercase font-[family-name:var(--font-display)]">
                        {testimonial?.author ?? t('author')}
                      </div>
                      <div className="text-xs text-(--color-text-muted) mt-1">{testimonial?.company ?? t('company')}</div>
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
