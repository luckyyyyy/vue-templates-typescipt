/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  render() {
    return (
      <div class="app">
        <router-view></router-view>
      </div>
    );
  }
}
