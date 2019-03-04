/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');
const config = require('../config');
const utils = require('./utils');
const loader = require('./utils/loader');
const webpackBaseConfig = require('./webpack.base.conf');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: utils.assetsPath('js/[name].[hash].js'),
  },
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.host,
    port: PORT || config.port,
    open: config.autoOpenBrowser,
    overlay: config.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.assetsPublicPath,
    proxy: config.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.poll,
    },
  },
  module: {
    rules: [
      // ...loader.eslintLoaders({
      //   cache: true,
      //   emitWarning: true,
      //   failOnError: false,
      // }),
      ...loader.styleLoaders(false),
    ],
  },
  // cheap-module-eval-source-map is faster for localhost dev
  devtool: '#source-map',
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'static/css/[name].[chunkhash].css',
    // }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new FriendlyErrorsPlugin(),
  ],
});
chalk
utils.getLocalIps().forEach((ip) => {
  console.log('listen: ' + chalk.green('http://' + ip + ':' + webpackConfig.devServer.port));
});

module.exports = webpackConfig;

