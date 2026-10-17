import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Talks are static decks in public/talks/<slug>/ with relative asset
        // paths, so they must be served from .../index.html (a rewrite would
        // keep the URL at /talks/<slug> and resolve assets against /talks/).
        source: '/talks/:slug',
        destination: '/talks/:slug/index.html',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
