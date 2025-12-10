import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   turbopack: {
    // ...
  },
  reactStrictMode: false,
  productionBrowserSourceMaps: true, // enable source maps in prod
 webpack(config) {
    config.devtool = 'source-map'; // emit source maps in development
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  experimental: {
   
    serverActions: {
      bodySizeLimit: '50mb' // Increased from 2mb to 50mb
    },
  }
}

export default nextConfig;
