import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(config) {
    return config;
  },

  images: {
    domains: ['img.icons8.com','upload.wikimedia.org'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '', 
        pathname: '/**', 
        search: '',
      },
    ],
  },
};

export default nextConfig;
