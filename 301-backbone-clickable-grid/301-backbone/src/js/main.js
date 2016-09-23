'use strict'

//使用ES6模块写法
import { grid } from './model';
import { view } from './view';

var gridsModel = new grid();
var gridsView = new view({ model: gridsModel });
