/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const utils = require('./utils');
const loader = require('./utils/loader');
const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf');

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'production',
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
  },
  module: {
    rules: [
      // ...loader.eslintLoaders({
      //   cache: true,
      //   emitWarning: true,
      //   failOnError: true,
      // }),
      ...loader.styleLoaders(true),
    ],
  },
  devtool: false,
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash].css',
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.fullPath(config.assetsSubDirectory),
        to: config.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
    // new SWPrecachePlugin({
    //   cacheId: 'SWPrecachePlugin',
    //   filename: 'service-worker.js',
    //   minify: true,
    //   dontCacheBustUrlsMatching: /./,
    //   staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
    //   runtimeCaching: [
    //     {
    //       urlPattern: /\/(m\/static)/,
    //       handler: 'networkFirst',
    //     },
    //   ],
    // }),
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


if (config.productionGzip) {
  webpackConfig.plugins.push(new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(`\\.(${config.productionGzipExtensions.join('|')})$`),
    threshold: 10240,
    minRatio: 0.8,
  }));
}

module.exports = webpackConfig;
