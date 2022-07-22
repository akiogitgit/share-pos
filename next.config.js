/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  images: {
    domains: ['qiita-user-contents.imgix.net', 'cdn.sstatic.net'],
    // domains: ['*'],
    // domains: ['placeimg.com'],
    // domains: ['assets.acme.com'],
  },
}
