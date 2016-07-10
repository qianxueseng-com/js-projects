'use strict';
// LeanEngine特有的初始化
require('./utils/leancloud-bootstrap')();
var handleLeancloudMiddleware = require('./utils/handle-leancloud-middleware');
var handleServerErrors = require('./utils/handle-server-errors');
var handleUncaughtErrors = require('./utils/handle-uncaught-errors');

// 真正的代码
var app = require('./app');

// leancloud需要的健康监测等中间件
handleLeancloudMiddleware(app);

// 处理常见错误例如404等
handleServerErrors(app);

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);

// 终于开始运行
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);

  // 处理异常
  handleUncaughtErrors();
});
