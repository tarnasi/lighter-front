import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ این فقط برای رفع اخطار Cross-Origin هست
  allowedDevOrigins: [
    "http://192.168.70.25:3001",
    "http://192.168.70.25:4000",
    "http://localhost:3000",
  ],
};

export default nextConfig;
