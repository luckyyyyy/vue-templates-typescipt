/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const utils = require('./index.js');

// Generate loaders for standalone style files (outside of .vue)
const styleLoaders = (extract) => {
  const stylusOptions = {
    'resolve url': true,
    import: [utils.fullPath('src/global/cube-theme')],
  };
  // 没必要其实 最多加个 sourceMap 压缩的事情给别的插件负责
  // const cssOptions = {
  //   minimize: isProd,
  //   sourceMap: options.sourceMap,
  // }
  const map = {
    scss: 'sass-loader',
    styl: { loader: 'stylus-loader', options: stylusOptions },
    stylus: { loader: 'stylus-loader', options: stylusOptions },
  };
  return ['css', 'scss', 'styl', 'stylus'].map((extension) => {
    const devLoader = extract ? MiniCssExtractPlugin.loader : 'vue-style-loader';
    const rule = {
      test: new RegExp(`\\.${extension}$`),
      use: [devLoader, 'css-loader', 'postcss-loader'],
    };
    if (map[extension]) {
      rule.use.push(map[extension]);
    }
    return rule;
  });
};

const vueLoaders = () => [{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: { // https://github.com/vuejs/vue-loader/blob/62a9155d00212f17e24c1ae05445c156b31e2fbd/docs/options.md
    compilerOptions: {
      // preserveWhitespace: false, // do not enable, will cause some bug when render list
    },
    transformAssetUrls: {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: 'xlink:href',
    },
  },
}];

const eslintLoaders = options => [{
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.fullPath('src'), utils.fullPath('test')],
  options: Object.assign({
    configFile: '.eslintrc.js',
    // fix: true,
    cache: false,
    emitWarning: false,
    failOnError: true,
    formatter: eslintFriendlyFormatter,
  }, options),
}];

exports.styleLoaders = styleLoaders;
exports.vueLoaders = vueLoaders;
exports.eslintLoaders = eslintLoaders;
