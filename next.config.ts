import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configured for Webpack to bypass Turbopack root-inference issues
  output: "export",
  basePath: "/Sitka",
  assetPrefix: "/Sitka",
  
  // Ensure images and assets work with static export
  images: {
    unoptimized: true, // Disable Next.js Image optimization for static export
  },
  
  // Ensure trailing slash for proper static file resolution
  trailingSlash: true,
};

export default nextConfig;
