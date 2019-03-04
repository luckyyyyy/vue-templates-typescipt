/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

module.exports = {
  presets: [
    require('@babel/preset-env'),
    require('@babel/preset-typescript')
  ],
  plugins: [
    require('@babel/plugin-syntax-jsx'),
    require('babel-plugin-transform-vue-jsx'),
    require('@babel/plugin-syntax-dynamic-import'),
  ],
};

