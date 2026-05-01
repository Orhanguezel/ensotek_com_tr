'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

type Props = {
  number?: string;
  message?: string;
};

function cleanWhatsAppNumber(value: string): string {
  return value.replace(/\D/g, '').replace(/^00/, '');
}

export function WhatsAppFloating({ number, message }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const finalNumber = number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+90 531 880 31 51';
  const cleanNumber = cleanWhatsAppNumber(finalNumber);
  if (!cleanNumber || !visible) return null;

  const text = message ? `?text=${encodeURIComponent(message)}` : '';

  return (
    <a
      href={`https://wa.me/${cleanNumber}${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-8 left-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition-transform duration-300 hover:scale-110 active:scale-95 md:left-8"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
