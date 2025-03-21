import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: config => {
    // Add custom alias for unfetch
    config.resolve.alias = {
      ...config.resolve.alias,
      unfetch: path.resolve(__dirname, 'node_modules/unfetch/dist/unfetch.mjs'),
    };

    return config;
  },
};

export default nextConfig;
