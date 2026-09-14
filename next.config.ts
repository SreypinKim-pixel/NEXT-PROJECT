import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "bell.com",
        pathname: "/",
      },
      {
        protocol: "http",
        hostname: "lowe-stevens.com",
        pathname: "/",
      },
      {
        protocol: "http",
        hostname: "www.smith.org",
        pathname: "/",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "/png-vector/**",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
      
      
      {
        protocol: "https",
        hostname: "www.smith.org",
        // pathname: "/assets/**",
      },
      //
    ],
  },
};

export default nextConfig;
