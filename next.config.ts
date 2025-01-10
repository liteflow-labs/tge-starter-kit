import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "liteflow.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
