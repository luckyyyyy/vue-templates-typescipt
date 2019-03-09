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

  const cssModules = {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
  }

  const map = {
    scss: 'sass-loader',
    styl: { loader: 'stylus-loader', options: stylusOptions },
    stylus: { loader: 'stylus-loader', options: stylusOptions },
  };

  function setCssLoader(use) {
    const a = use;
    return a[1] = { loader: 'css-loader', options: cssModules };
  }
  const cssModulesRules = ['css', 'scss', 'styl', 'stylus'].map((extension) => {
    const devLoader = extract ? MiniCssExtractPlugin.loader : 'vue-style-loader';
    let rule = {
      test: new RegExp(`\\.module.${extension}$`),
      use: [devLoader, { loader: 'css-loader', options: cssModules }, 'postcss-loader'],
    };
    if (map[extension]) {
      rule.use.push(map[extension]);
    }
    return rule;
  });
  const cssRules = ['css', 'scss', 'styl', 'stylus'].map((extension) => {
    const devLoader = extract ? MiniCssExtractPlugin.loader : 'vue-style-loader';
    let rule = {
      test: new RegExp(`\\.${extension}$`),
      exclude: new RegExp(`\\.module.${extension}$`),
      use: [devLoader, 'css-loader', 'postcss-loader'],
    };
    if (map[extension]) {
      rule.use.push(map[extension]);
    }
    return rule;
  });
  return cssRules.concat(...cssModulesRules)
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
