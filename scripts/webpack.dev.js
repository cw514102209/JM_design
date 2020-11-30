/* eslint-disable */
const path = require('path')
const { merge } = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { publicPath, host, port } = require('./config')
const webpackCommonConfig = require('./webpack.common')

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath,
    contentBase: path.resolve(__dirname, '../'),
    port,
    host,
    hot: true,
    compress: true,
    inline: true,
    noInfo: true,
    quiet: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['编译成功'],
        notes: [`运行于http://${host}:${port}${publicPath}`],
      },
      clearConsole: true,
    }),
    new htmlWebpackPlugin({
      template: './src/template/index.html',
      favicon: './src/assets/favicon.ico',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
})
