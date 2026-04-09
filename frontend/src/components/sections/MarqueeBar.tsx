import { useTranslations } from 'next-intl';

const ITEMS_COUNT = 8;

export function MarqueeBar() {
  const t = useTranslations('home.marquee');

  const items = Array.from({ length: ITEMS_COUNT }, (_, i) => t(`item${i + 1}`));
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-(--color-border) bg-(--deep) py-4">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-6 whitespace-nowrap">
            <span className="size-1.5 bg-(--cyan) rotate-45 inline-block" aria-hidden="true" />
            <span className="text-xs tracking-[3px] uppercase text-(--mist) font-[family-name:var(--font-display)]">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
