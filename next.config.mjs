/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i2.seadn.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
