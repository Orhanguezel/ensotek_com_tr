'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  alt?: string;
}

export function ImageLightbox({ images, index, onClose, onIndexChange, alt }: Props) {
  const total = images.length;
  const current = images[index];
  const hasPrev = total > 1;
  const hasNext = total > 1;

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + total) % total);
  }, [index, total, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % total);
  }, [index, total, onIndexChange]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && hasPrev) goPrev();
      else if (e.key === 'ArrowRight' && hasNext) goNext();
    };
    window.addEventListener('keydown', handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext, hasPrev, hasNext]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
      >
        <X size={28} />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      <div
        className="relative max-w-[92vw] max-h-[88vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
          alt={alt ?? `Image ${index + 1} of ${total}`}
          className="max-w-full max-h-[82vh] object-contain"
        />
        {total > 1 && (
          <div className="mt-3 text-xs uppercase tracking-wider text-white/70">
            {index + 1} / {total}
          </div>
        )}
      </div>

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors"
        >
          <ChevronRight size={36} />
        </button>
      )}
    </div>
  );
}
