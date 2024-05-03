/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asset.brandfetch.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
