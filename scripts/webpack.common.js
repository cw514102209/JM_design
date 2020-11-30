/* eslint-disable */
const { resolve } = require('path')
const HappyPack = require('happypack')
const WebpackBar = require('webpackbar')
const { buildPath, publicPath } = require('./config')

const root = (path) => resolve(__dirname, `../${path}`)

module.exports = {
  entry: root('src/core/index.jsx'),
  output: {
    path: root(buildPath),
    publicPath: `.${publicPath}`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: root('src'),
        use: 'happypack/loader?id=jsx',
      },
      {
        test: /\.jsx?$/,
        include: root('node_modules'),
        use: 'cache-loader',
      },
      {
        test: /\.svg$/,
        use: ['cache-loader', '@svgr/webpack'],
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        include: root('src/assets'),
        use: 'url-loader?limit=true',
      },
      { test: /\.(ttf|eot|woff|woff2)$/, use: 'url-loader?limit=true' },
    ],
  },
  resolve: {
    modules: [root('src'), root('node_modules')],
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      '@': root('src'),
      assets: root('src/assets'),
      components: root('src/components'),
      utils: root('src/utils'),
    },
  },
  plugins: [
    new HappyPack({
      id: 'jsx',
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new WebpackBar(),
  ],
}
