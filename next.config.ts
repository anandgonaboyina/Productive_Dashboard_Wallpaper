import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['10.57.83.230'],
  async rewrites() {
    return [
      {
        source: '/api/session',
        destination: '/api/session',
      },
      {
        source: '/api/update',
        destination: '/api/update',
      },
      {
        source: '/api/media',
        destination: '/api/media',
      },
      {
        source: '/api/wallpapers',
        destination: '/api/wallpapers',
      },
      {
        source: '/api/alarms',
        destination: '/api/alarms',
      },
      {
        source: '/api/:path*',
        destination: 'https://dashboard-cloud-nu.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;
