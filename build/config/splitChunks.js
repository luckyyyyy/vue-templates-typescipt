/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
const utils = require('../utils');

module.exports = {
  // chunks: 'initial', // initial all async
  cacheGroups: {
    styles: {
      test: m => m.constructor.name === 'CssModule',
      name: 'commons',
      minChunks: 2,
      chunks: 'all',
      reuseExistingChunk: true,
      // enforce: true,
    },
    vue: {
      filename: utils.assetsPath('js/vue-family-bundle.js'),
      name: 'vue-family-bundle',
      test: /[\\/]node_modules[\\/](vue|vue-router|vuex|vuex-router-sync)[\\/]/,
      chunks: 'initial',
    },
    route: {
      filename: utils.assetsPath('js/route.[hash:24].js'),
      name: 'route',
      test: /[\\/]src[\\/](router)[\\/]/,
      chunks: 'initial',
    },
    store: {
      filename: utils.assetsPath('js/store.[hash:24].js'),
      name: 'store',
      test: /[\\/]src[\\/](store)[\\/]/,
      chunks: 'initial',
    },
    vendor: {
      filename: utils.assetsPath('js/vendor.[hash:24].js'),
      name: 'vendor',
      test: /node_modules/,
      chunks: 'initial',
      priority: -10,
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true,
    },
  },
};
