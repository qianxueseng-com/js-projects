'use strict';
var AV = require('leanengine');
module.exports = function bootstrap() {
  AV.init({
    appId: process.env.LEANCLOUD_APP_ID,
    appKey: process.env.LEANCLOUD_APP_KEY,
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
  });

  // 如果不希望使用 masterKey 权限，可以将下面一行删除
  AV.Cloud.useMasterKey();
};
