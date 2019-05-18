/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./utils');
const config = require('./config');
const webpackBaseConfig = require('./webpack.base.conf');

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.fullPath('static'),
        to: config.assetsRoot,
        ignore: ['.*'],
      },
    ]),
  ],
});

webpackConfig.optimization.minimizer = [
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css(\?.*)?$/,
    cssProcessorOptions: {
      safe: true,
    },
  }),
  new MinifyPlugin({
    cache: false,
    parallel: true,
  }),
];

module.exports = webpackConfig;
