'use client';

import { useState } from 'react';

type Props = {
  hero: string;
  thumbs: string[];
  alt: string;
};

export function ProductGallery({ hero, thumbs, alt }: Props) {
  const [active, setActive] = useState(hero);
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const isVisible = (src: string) => !hidden.has(src);
  const handleError = (src: string) => {
    setHidden((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
    if (active === src) {
      const fallback = [hero, ...thumbs].find((s) => s !== src && !hidden.has(s));
      if (fallback) setActive(fallback);
    }
  };

  if (!isVisible(active) && hidden.size >= 1 + thumbs.length) return null;

  const visibleThumbs = thumbs.filter(isVisible);

  return (
    <div className="mb-10">
      {isVisible(active) && (
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-(--color-border) bg-gradient-to-br from-(--panel) to-(--steel)">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active}
            alt={alt}
            className="h-full w-full object-contain p-6"
            loading="eager"
            onError={() => handleError(active)}
          />
        </div>
      )}
      {visibleThumbs.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {visibleThumbs.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(src)}
              className={`relative aspect-square overflow-hidden border bg-(--panel) transition-colors ${
                active === src ? 'border-(--cyan)' : 'border-(--color-border) hover:border-(--cyan)/60'
              }`}
              aria-label={`${alt} ${i + 2}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${alt} ${i + 2}`}
                className="h-full w-full object-contain p-3"
                loading="lazy"
                onError={() => handleError(src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
