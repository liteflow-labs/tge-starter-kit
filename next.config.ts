import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
