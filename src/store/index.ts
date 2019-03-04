/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import { isDevelop } from '@/utils';
// globle and common
// import * as getters   from './getters'
// import * as actions   from './actions'
// import * as mutations from '@/store/mutations';

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: isDevelop,
  // state,
  // getters,
  // actions,
  // mutations,
});

// store.registerModule('common', commonModule);

export default store;
