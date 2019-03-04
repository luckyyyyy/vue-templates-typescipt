/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const merge = require('webpack-merge');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const utils = require('./utils');
const loader = require('./utils/loader');
const webpackBaseConfig = require('./webpack.base.conf');

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: utils.assetsPath('js/[name].[hash].js'),
  },
  module: {
    rules: [
      // ...loader.eslintLoaders({
      //   cache: true,
      //   emitWarning: true,
      //   failOnError: false,
      // }),
      ...loader.styleLoaders(true),
    ],
  },
  // cheap-module-eval-source-map is faster for localhost dev
  devtool: '#source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash].css',
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
});

// add hot-reload related code to entry chunks
Object.keys(webpackConfig.entry).forEach((name) => {
  webpackConfig.entry[name] = [
    'eventsource-polyfill',
    './build/utils/webpack-hot-middleware-client',
  ].concat(webpackConfig.entry[name]);
});

module.exports = webpackConfig;
