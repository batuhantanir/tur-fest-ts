/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'emur.dev',
        pathname: '/images/*',
      },
    ],
  },
};

export default nextConfig;
