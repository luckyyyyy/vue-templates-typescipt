/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import Hello from '@/components/Hello';

@Component
export default class Index extends Vue {
  private msg: string = 'hello world vue in typescript';

  public render(): VNode {
    return (
      <div class="view">
        <Hello msg={this.msg} />
        <button onClick={this.onClick}> switch text </button>
      </div>
    );
  }

  private onClick(): void {
    this.msg = 'switch text done !!!';
  }
}
