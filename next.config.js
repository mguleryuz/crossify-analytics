/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
}
