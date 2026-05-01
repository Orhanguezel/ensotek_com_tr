import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  transpilePackages: ['@ensotek/shared-ui'],

  // VPS düşük RAM build için: TS check skip (lokal build'de zaten yapılıyor)
  typescript: { ignoreBuildErrors: true },

  // Workspace root — bun hoisting nedeniyle next paketi üst dizinde çözümlenir
  turbopack: {
    root: path.resolve(import.meta.dirname, '..'),
  },

  // ✅ Image optimization config
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.ensotek.de', pathname: '/**' },
      { protocol: 'https', hostname: 'ensotek.de', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.ensotek.de', pathname: '/**' },
      { protocol: 'http', hostname: 'localhost', port: '8088', pathname: '/**' },
      { protocol: 'https', hostname: '**.vercel.app', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ✅ kaldırıyoruz: /admin/dashboard -> /admin/dashboard/default
  async redirects() {
    return [
      // İstersen eski linkleri yakalamak için tersine redirect bırakabilirsin:
      // { source: '/admin/dashboard/default', destination: '/admin/dashboard', permanent: false },
    ];
  },

  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const apiBase = (
      process.env.PANEL_API_URL ||
      process.env.NEXT_PUBLIC_PANEL_API_URL ||
      'http://localhost:8087'
    ).replace(/\/+$/, '');

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' blob: data: https://res.cloudinary.com https://images.unsplash.com https://www.ensotek.de https://ensotek.de https://cdn.ensotek.de",
      `connect-src 'self' ${apiBase} https: http://127.0.0.1:* http://localhost:* ws://127.0.0.1:* ws://localhost:*`.trim(),
      "font-src 'self' https://fonts.gstatic.com data:",
      "object-src 'none'",
      `frame-src 'self' ${apiBase} https://www.ensotek.de https://ensotek.de`.trim(),
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'same-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
          },
        ],
      },
    ];
  },

  async rewrites() {
    const origin =
      process.env.PANEL_API_URL || process.env.NEXT_PUBLIC_PANEL_API_URL || 'http://localhost:8088';

    const base = String(origin).replace(/\/+$/, '');

    return [
      {
        source: '/api/:path*',
        destination: `${base}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${base}/uploads/:path*`,
      },
      {
        source: '/storage/:path*',
        destination: `${base}/api/storage/:path*`,
      },
    ];
  },
};

export default nextConfig;
