/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Ignore ESLint errors during the build process
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
