import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
    }
  },
  turbopack: {},
};

export default nextConfig;