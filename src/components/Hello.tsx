/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
import VueComponent from '@/components/vue-component';
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface HelloProps {
  msg?: string;
}

@Component
// export default class Hello extends VueComponent<HelloProps> {
export default class Hello extends Vue<HelloProps> {
  @Prop(String) readonly msg!: string;
  render() {
    return (
      <div class="msg">{ this.msg }</div>
    );
  }
}
