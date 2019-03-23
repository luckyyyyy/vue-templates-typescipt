/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const moment = require('moment');
const utils = require('../utils');

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    ROUTER_MODE: process.env.ROUTER_MODE,
    // PUBLIC_PATH: process.env.PUBLIC_PATH,
    PUBLIC_PATH: '/',
    BUILD_TIME: moment().format('YMMDDHHmm'),
  },
  host: '0.0.0.0',
  port: 8080,
  autoOpenBrowser: true,
  errorOverlay: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  assetsRoot: path.resolve(__dirname, '../../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  useEslint: false,
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report,
  // CSS Sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the CSS-Loader README
  // (https://github.com/webpack/css-loader#sourcemaps)
  // In our experience, they generally work as expected,
  // just be aware of this issue when enabling this option.
  sourceMap: utils.isDevelop,
};
