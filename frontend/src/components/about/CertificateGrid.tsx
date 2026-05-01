'use client';

import { useState } from 'react';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

interface Props {
  images: string[];
  alt: string;
}

export function CertificateGrid({ images, alt }: Props) {
  const [active, setActive] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className="relative aspect-[3/4] overflow-hidden border border-(--color-border) bg-(--color-bg-panel) hover:border-(--color-accent)/60 transition-colors cursor-zoom-in"
            aria-label={`${alt} ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="h-full w-full object-contain p-4"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {active !== null && (
        <ImageLightbox
          images={images}
          index={active}
          alt={alt}
          onClose={() => setActive(null)}
          onIndexChange={setActive}
        />
      )}
    </>
  );
}
