/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : perfma (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
const path = require('path');

const fullPath = s => path.join(__dirname, s);

module.exports = {
  entry: {
    app: fullPath('src/main.ts'),
  },
  // autoOpenBrowser: false,
};
