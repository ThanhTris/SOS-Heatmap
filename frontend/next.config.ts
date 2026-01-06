import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,             // Quét file mỗi 1 giây
      aggregateTimeout: 300,  // Gom thay đổi
      ignored: /node_modules/
    };
    return config;
  },
};

export default nextConfig;