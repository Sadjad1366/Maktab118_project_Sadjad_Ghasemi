import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/images/products/images/**",
      },
      {
        protocol: "https",
        hostname: "backend-app-gamma.vercel.app",
        pathname: "/images/products/images/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
