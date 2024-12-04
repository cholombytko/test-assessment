import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/countries',
        permanent: true, // Permanent redirect (301)
      },
    ]
  },
};

export default nextConfig;
