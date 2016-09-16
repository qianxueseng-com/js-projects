'use strict';

var inputVerify = require('./inputVerify');
var selectRegWay = require('./selectRegWay');
var verifyArrow = require('./verifyArrow');

// 使用script-loader全局运行一次jQuery throttle/debounce插件
require('script!./jquery.ba-throttle-debounce.min.js');

$(document).ready(inputVerify);
$(document).ready(selectRegWay);
$(document).ready(verifyArrow);