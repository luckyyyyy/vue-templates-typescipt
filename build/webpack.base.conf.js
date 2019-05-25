/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintBarePlugin = require('stylelint-bare-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin'); // 连这种东西都需要一个插件 SX
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const utils = require('./utils');
const loader = require('./utils/loader');
const config = require('./config');
const splitChunks = require('./config/splitChunks');

const ts = require('typescript');
console.log('TypeScript Version: ' + ts.version );

// HTML plugin
// #1669 html-webpack-plugin's default sort uses toposort which cannot
// handle cyclic deps in certain cases. Monkey patch it to handle the case
// before we can upgrade to its 4.0 version (incompatible with preload atm)
const chunkSorters = require('html-webpack-plugin/lib/chunksorter');
const depSort = chunkSorters.dependency;
chunkSorters.auto = chunkSorters.dependency = (chunks, ...args) => {
  try {
    return depSort(chunks, ...args)
  } catch (e) {
    // fallback to a manual sort if that happens...
    return chunks.sort((a, b) => {
      // make sure user entry is loaded last so user CSS can override
      // vendor CSS
      if (a.id === 'app') {
        return 1
      } else if (b.id === 'app') {
        return -1
      } else if (a.entry !== b.entry) {
        return b.entry ? -1 : 1
      }
      return 0
    })
  }
}

const webpackConfig = {
  entry: config.entry,
  stats: {
    // https://webpack.js.org/configuration/stats/
    entrypoints: false,
    children: false,
  },
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime', // webpack runtime
    },
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/113
    // 无解
    splitChunks,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': utils.fullPath('src'),
      ':': utils.fullPath('static'),
    },
    modules: ['node_modules'],
  },
  module: {
    rules: [
      ...loader.styleLoaders(true),
      ...loader.vueLoaders(),
      ...loader.scriptLoaders(),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: utils.assetsPath('img/[hash:32].[ext]'),
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: utils.isDevelop,
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('media/[hash:32].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('fonts/[hash:32].[ext]'),
        },
      },
    ],
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new VueLoaderPlugin(),
    new WebpackBar(),
    new webpack.ContextReplacementPlugin(
      /moment[\\/]locale$/,
      /^\.\/(zh-cn)$/,
    ),
    new webpack.DefinePlugin({
      'process.env': (() => {
        const env = {};
        Object.keys(config.env).forEach((k) => {
          env[k] = JSON.stringify(config.env[k]);
        });
        return env;
      })(),
    }),
    new webpack.HashedModuleIdsPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.index,
      template: utils.fullPath('index.html'),
      inject: true,
      // favicon: utils.fullPath('src/assets/favicon.ico'),
    }),
    // Silence mini-css-extract-plugin generating lots of warnings for CSS ordering.
    // We use CSS modules that should not care for the order of CSS imports, so we
    // should be safe to ignore these.
    //
    // See: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }),
  ],
};

if (config.useEslint) {
  webpackConfig.module.rules.push(
    ...loader.eslintLoaders({
      cache: true,
      emitWarning: true,
      failOnError: false,
    }),
  )
}

if (config.useStyleLint) {
  new StylelintBarePlugin({
    configFile: '.stylelintrc.js',
    files: [
      'src/**/*.vue',
      'src/**/*.css',
      'src/**/*.less',
      'src/**/*.sass',
      'src/**/*.scss',
      '!**/iconfont.css',
    ],
    fix: true,
    cache: true,
    cacheLocation: './node_modules/.cache/.stylelintcache',
    // emitErrors: true,
    emitWarning: true,
    failOnError: false,
  });
}

module.exports = webpackConfig;
