/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import 'normalize.css';
import '@/styles/index.scss';


sync(store, router);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
