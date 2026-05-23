import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const CLIENT_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

function resolveServerApiBase(): string {
  if (/^https?:\/\//i.test(CLIENT_API_BASE_URL)) return CLIENT_API_BASE_URL;
  const backend = (process.env.BACKEND_URL || 'http://127.0.0.1:8087').replace(/\/+$/, '');
  const path = CLIENT_API_BASE_URL.startsWith('/') ? CLIENT_API_BASE_URL : `/${CLIENT_API_BASE_URL}`;
  return `${backend}${path}`;
}

/** Server bundle (SSR/build) icin mutlak URL, client bundle icin relative /api. Next.js her ikisini ayri ayri derler. */
export const API_BASE_URL =
  typeof window === 'undefined' ? resolveServerApiBase() : CLIENT_API_BASE_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ensotek.com.tr';

export function absoluteAssetUrl(value?: string | null): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  const normalized = value.startsWith('/') ? value : `/${value}`;
  return `${API_BASE_URL.replace(/\/api\/?$/, '')}${normalized}`;
}

/** Backend static path'leri Next.js rewrites ile proxy edilir (/uploads/, /storage/).
 *  Absolute URL'ler olduğu gibi döner. Diğerleri kök-relative kalır. */
export function resolvePublicAssetUrl(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return normalized;
}
