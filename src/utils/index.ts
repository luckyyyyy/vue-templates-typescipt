/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

export const isDevelop = process.env.NODE_ENV !== 'production';

const cloneR = (obj, cache = new Map()) => {
  // check if obj has already cloned before (circular)
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  // new clone
  let newObj = obj;
  const type = typeof obj;
  if (type === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      newObj = [];
      cache.set(obj, newObj);
      obj.forEach((v, i) => {
        newObj[i] = cloneR(v, cache);
      });
    } else {
      newObj = {};
      cache.set(obj, newObj);
      Object.keys(obj).forEach((k) => {
        newObj[k] = cloneR(obj[k], cache);
      });
    }
  }
  return newObj;
};
export const clone = obj => cloneR(obj);

// export const clone = obj => JSON.parse(JSON.stringify(obj));

export const decodeJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
};

export const encodeJson = obj => JSON.stringify(obj);
