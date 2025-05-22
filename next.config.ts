import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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
    ],
  },

  // ✅ این فقط برای رفع اخطار Cross-Origin هست
  allowedDevOrigins: [
    "192.168.70.25",
    "10.200.253.66",
    "lighterapi.devdiaries.work"
  ],
};

export default nextConfig;
