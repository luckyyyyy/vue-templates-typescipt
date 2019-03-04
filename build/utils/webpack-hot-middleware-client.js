/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

(function() {
  var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

  function onSubscribe(event) {
    if (event.action === 'reload') {
      window.location.reload();
    }
  };
  hotClient.subscribe(onSubscribe);
})();
