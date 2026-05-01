import type { NextConfig } from 'next';
import path from 'node:path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  turbopack: {
    root: path.resolve(process.cwd(), '..'),
  },

  async redirects() {
    return [
      { source: '/', destination: '/tr', permanent: false },
      { source: '/tr/products/:path*', destination: '/tr/urunler/:path*', permanent: true },
      { source: '/tr/references/:path*', destination: '/tr/referanslar/:path*', permanent: true },
      { source: '/tr/contact', destination: '/tr/iletisim', permanent: true },
      { source: '/tr/gallery/:path*', destination: '/tr/galeri/:path*', permanent: true },
    ];
  },

  async rewrites() {
    const backendBase = (
      process.env.BACKEND_INTERNAL_URL ||
      process.env.BACKEND_URL ||
      'http://127.0.0.1:8088'
    ).replace(/\/api\/?$/, '');

    return [
      { source: '/tr/urunler/:path*', destination: '/tr/products/:path*' },
      { source: '/tr/referanslar/:path*', destination: '/tr/references/:path*' },
      { source: '/tr/iletisim', destination: '/tr/contact' },
      { source: '/tr/galeri/:path*', destination: '/tr/gallery/:path*' },
      { source: '/uploads/:path*', destination: `${backendBase}/uploads/:path*` },
      { source: '/media/:path*',   destination: `${backendBase}/media/:path*` },
      { source: '/storage/:path*', destination: `${backendBase}/storage/:path*` },
    ];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'ensotek.com.tr' },
      { protocol: 'https', hostname: 'www.ensotek.com.tr' },
      { protocol: 'http' as const, hostname: 'localhost', port: '8088' },
      { protocol: 'http' as const, hostname: '127.0.0.1', port: '8088' },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'sonner', '@tanstack/react-query'],
  },

  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      ...(isProd
        ? [{
            source: '/_next/static/(.*)',
            headers: [
              { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
          }]
        : []),
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  compress: true,
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
