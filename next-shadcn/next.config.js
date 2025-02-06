const arnext = require("arnext/config")
const webpack = require("webpack")

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      buffer: require.resolve("buffer/"),
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        const mod = resource.request.replace(/^node:/, "")
        switch (mod) {
          case "buffer":
            resource.request = "buffer"
            break
          default:
            break
        }
      })
    )

    return config
  },
}
module.exports = arnext(nextConfig)
