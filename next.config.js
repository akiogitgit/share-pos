/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  images: {
    // qiita, zenn 以外は cdn.
    domains: ['res.cloudinary.com', 'qiita-user-contents.imgix.net'],
  },
}
