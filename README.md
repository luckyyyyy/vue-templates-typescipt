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

## About

由于需要了解整个Vue的生态，所以脚手架会定期更新，有好的建议欢迎PR，目前在我内部项目中广泛使用。
尽可能保证代码的干净和易读，对于希望了解生态的同学来说，还是有帮助的。

## 代码风格

```typescript
/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { Component, Vue } from 'vue-property-decorator';
import Hello from '@/components/Hello';

@Component
export default class Index extends Vue {
  private msg: string = 'hello world vue in typescript';
  public render() {
    return (
      <div class="view">
        <Hello  msg={this.msg} />
        <button onClick={this.onClick}> switch text </button>
      </div>
    );
  }
  private onClick() {
    this.msg = 'switch text done !!!';
  }
}
```
