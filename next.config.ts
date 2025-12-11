import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',  // Critical: must be *.js not *.jsx [web:12][web:29]
      },
    },
  },
};

export default nextConfig;
