'use client';

import { useState } from 'react';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

interface Props {
  images: string[];
  alt: string;
}

export function GalleryGrid({ images, alt }: Props) {
  const [active, setActive] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-(--color-border)">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className="aspect-video relative overflow-hidden bg-(--color-bg-panel) cursor-zoom-in group"
            aria-label={`${alt} ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading={i < 3 ? 'eager' : 'lazy'}
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
