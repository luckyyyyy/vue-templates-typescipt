/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import { isDevelop } from '@/utils';
import commonModule, { CommonState } from './modules/common';

Vue.use(Vuex);

export default new Vuex.Store<{
  common: CommonState;
}>({
  strict: isDevelop,
  modules: {
    common: commonModule,
  },
});
