/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  images: {
    domains: ['localhost'],
    // domains: ['*'],
    // domains: ['placeimg.com'],
    // domains: ['assets.acme.com'],
  },
}
