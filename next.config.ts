import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // unsplash.com
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', 
      },
      // flagcdn.com
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
            {
        protocol: 'https',
        hostname: 'www.figma.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  devIndicators: false
};

export default nextConfig;
