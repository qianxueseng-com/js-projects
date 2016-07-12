'use strict';
var AV = require('leanengine');

module.exports = function handleLeancloudMiddleware(app) {
  // 加载云引擎中间件
  // 云引擎项目在部署启动时，部署服务会对新启动的应用进行 ping 监测
  // （每隔 1 秒请求一次，一共 15 次），请求 URL 为 /__engine/1/ping，
  // 如果响应的 statusCode 为 200 则认为新的节点启动成功，整个部署才会成功；
  // 否则会收到 应用启动检测失败 类型的错误信息，导致部署失败。
  app.use(AV.express());
};
