/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  images: {
    // qiita, zenn 以外は res.cloudinary.com
    domains: ['res.cloudinary.com', 'qiita-user-contents.imgix.net'],
  },
  optimizeFonts: true,
}
