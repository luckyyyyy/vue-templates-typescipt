/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const utils = require('./index.js');

const cacheLoader = (path) => {
  return {
    loader: 'cache-loader',
    options: { cacheDirectory: utils.fullPath(`./node_modules/.cache/cache-loader/${path}`) },
  };
};

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
  const devLoader = extract ? {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // only enable hot in development
      hmr: utils.isDevelop,
      // if hmr does not work, this is a forceful method.
      // reloadAll: true,
    },
  } : 'vue-style-loader';
  const cssModulesRules = ['css', 'scss', 'styl', 'stylus'].map((extension) => {
    let rule = {
      test: new RegExp(`\\.module.${extension}$`),
      use: [
        devLoader,
        cacheLoader('css-loader'),
        { loader: 'css-loader', options: cssModules },
        'postcss-loader'
      ],
    };
    if (map[extension]) {
      rule.use.push(map[extension]);
    }
    return rule;
  });
  const cssRules = ['css', 'scss', 'styl', 'stylus'].map((extension) => {
    let rule = {
      test: new RegExp(`\\.${extension}$`),
      exclude: new RegExp(`\\.module.${extension}$`),
      use: [
        devLoader,
        cacheLoader('css-loader'),
        'css-loader',
        'postcss-loader'
      ],
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
  use: [
    cacheLoader('vue-loader'),
    {
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
    }
  ]
}];

const scriptLoaders = () => {
  const includes = [
    utils.fullPath('config'),
    utils.fullPath('src'),
    utils.fullPath('test'),
  ];
  return [
    {
      test: /\.m?jsx?$/,
      use: [cacheLoader('babel-loader'), 'babel-loader'],
      include: includes,
    },
    {
      test: /\.ts$/,
      include: includes,
      use: [
        cacheLoader('ts-loader'),
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    {
      test: /\.tsx$/,
      include: includes,
      use: [
        cacheLoader('ts-loader'),
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            appendTsxSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    // {
    //   test: /\.(js|tsx?)$/,
    //   loader: 'babel-loader',
    //   include: [
    //     utils.fullPath('config'),
    //     utils.fullPath('src'),
    //     utils.fullPath('test'),
    //     utils.fullPath('node_modules/cube-ui'),
    //   ],
    // },
    // {
    //   test: /\.tsx?$/, // 保障 .vue 文件中 lang=ts
    //   loader: 'ts-loader',
    //   options: {
    //     appendTsSuffixTo: [/\.vue$/],
    //     appendTsxSuffixTo: [/\.vue$/],
    //   },
    // },
  ];
};


const eslintLoaders = options => [{
  test: /\.(js|vue|ts|jsx|tsx)$/,
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
exports.scriptLoaders = scriptLoaders;
