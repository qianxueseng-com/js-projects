'use strict';
// 真正的代码
var app = require('./app');

// 终于开始运行
var PORT = 3000;
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
});
