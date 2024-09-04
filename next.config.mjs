/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "booksync-jerga-prod.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
