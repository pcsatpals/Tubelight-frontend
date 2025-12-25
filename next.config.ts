import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Config for Turbopack (next dev --turbopack)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: { icon: true },
          },
        ],
        as: '*.js',
      },
    },
  },
  // Config for Webpack (next dev --webpack or next build)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
