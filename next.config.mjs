/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI,
        // Add other environment variables here
      },
};
// next.config.mjs
// next.config.js

export default nextConfig;
  