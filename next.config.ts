import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ این فقط برای رفع اخطار Cross-Origin هست
  allowedDevOrigins: [
    "192.168.70.25",
    "10.200.253.66"
  ],
};

export default nextConfig;
