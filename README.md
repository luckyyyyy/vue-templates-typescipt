# Vue 自用脚手架 (TypeScript)

> This repo is a boilerplate for vue-templates-typescipt project. You could use it as a base to build your own web app.

 * vue: https://vuejs.org
 * vue-ssr: https://ssr.vuejs.org
 * vuex: https://vuex.vuejs.org
 * vue-router: https://router.vuejs.org

## Features
 * 基于最新 Babel@7, Webpack@4。
 * 基于最新 vue-loader@15.x 和 vue@2.6.x。
 * 支持 JavaScript and TypeScript tsx 混写。
 * 支持 PostCSS 和 SCSS。
 * 支持 ESLint 和 StyleLint，默认关闭。

## How to use

First, clone the repo.

```bash

git clone https://github.com/luckyyyyy/vue-templates-typescipt.git <yourAppName>
cd <yourAppName>

# Second, delete the old .git history and initialize new history.
rm -rf .git
git init

# If you are in China, please modify the npm registry
npm config set registry https://registry.npm.taobao.org

# Third, install the dependencies.
npm install
