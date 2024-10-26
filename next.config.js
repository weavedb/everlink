const arnext = require("arnext/config")
const { webpack } = require("next/dist/compiled/webpack/webpack")
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      fs: false,
    }

    return config
  },
}
module.exports = arnext(nextConfig)
