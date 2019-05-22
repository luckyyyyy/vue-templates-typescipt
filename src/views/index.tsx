/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { Component, Vue } from 'vue-property-decorator';
import Hello from '@/hello';

@Component
export default class App extends Vue {
  private msg: string = 'hello world vue in typescript';
  public render() {
    return (
      <div class="view">
        <Hello msg={this.msg} />
        <button onClick={this.onClick}> switch text </button>
      </div>
    );
  }
  private onClick() {
    this.msg = 'switch text done !!!';
  }
}
