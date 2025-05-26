import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lighterapi.devdiaries.work",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.70.25",
        pathname: "/uploads/**",
      },
    ],
  },

  // ✅ این فقط برای رفع اخطار Cross-Origin هست
  allowedDevOrigins: [
    "192.168.70.25",
    "10.200.253.66",
    "lighterapi.devdiaries.work",
  ],
};

export default nextConfig;
