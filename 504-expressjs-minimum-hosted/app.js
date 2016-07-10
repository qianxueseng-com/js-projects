'use strict';
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 前端文件所在目录
app.use(express.static('public'));

// 处理form post和cookie所必须
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 真正的逻辑
app.get('/', function(req, res) {
  res.render('index', { currentTime: new Date() });
});

module.exports = app;
