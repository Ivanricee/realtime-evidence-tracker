/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['static-cdn.jtvnw.net'],
  },
}

module.exports = nextConfig
