import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/talks/:slug',
        destination: '/talks/:slug/index.html',
      },
    ];
  },
};

export default nextConfig;
