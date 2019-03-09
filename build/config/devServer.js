/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const path = require('path');
const express = require('express')
const config = require('./index.js');
const utils = require('../utils');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = {
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
  proxy: {},
  quiet: true,
  watchOptions: {
    poll: config.poll,
  },
  before: (app) => {
    app.use('/' + config.assetsSubDirectory, express.static(utils.fullPath(config.assetsSubDirectory)))
  }
};
