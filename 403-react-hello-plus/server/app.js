'use strict';
var path = require('path');
var express = require('express');
var app = express();

// 前端文件所在目录
var frontendFolderPath = path.join(__dirname, '../build');
app.use(express.static(frontendFolderPath));

module.exports = app;
