/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

import axios from 'axios';
import { MessageBox, Notification } from 'element-ui';

const onRequest = (req) => {
  return req;
};
const onRequestError = (err) => {
  return Promise.reject(err);
};

const onResponse = (res) => {
  return Promise.resolve(res);
};
const onResponseError = (err) => {
  if (!err.response) {
    // network error
    MessageBox({
      message: '请检查你的网络，点击确定刷新页面。',
      title: '未知错误',
      type: 'error',
    }).then(() => {
      window.location.reload();
    });
  } else if (err.response.status === 401) {
    // Authorization failed
    MessageBox({
      message: '您没有登录，无权操作。',
      title: '未授权',
      type: 'error',
    }).then(() => {
      window.location.href = '/login';
    });
    // return window.location.href = `${AUTH_URL}?redirect_uri=${encodeURIComponent(window.location.href)}`;
  } else if (err.response.status >= 500) {
    MessageBox({
      message: '服务器错误，请联系管理员。',
      title: '服务器错误',
      type: 'error',
    });
  } else if (err.response.status === 403) {
    MessageBox({
      message: err.response.data.errmsg ? err.response.data.errmsg : '您的权限不足，无法执行此操作。',
      title: '权限不足',
      type: 'error',
    }).then(() => {
      window.location.href = '/login';
    });
  } else if (parseInt(err.response.data.errcode, 10) !== err.response.status) {
    return Promise.reject(err);
  } else if (err.config.message !== false) {
    MessageBox({
      title: `操作失败 (${err.response.data.errcode})`,
      message: err.response.data.errmsg ? err.response.data.errmsg : '操作失败，请联系管理员。',
      type: 'error',
    });
    if (err.response.data.data) {
      Notification({
        type: 'error',
        title: '发生错误',
        message: JSON.stringify(err.response.data.data),
      });
    }
  }
  return Promise.reject(err);
};

export const createAxios = () => {
  const config = {
    baseURL: '/api',
    // timeout: 5000,
    withCredentials: true,
  };
  const http = axios.create(config);
  http.interceptors.request.use(onRequest, onRequestError);
  http.interceptors.response.use(onResponse, onResponseError);
  return http;
};

export const http = createAxios();
