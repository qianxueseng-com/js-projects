'use strict';

var inputVerify = require('./inputVerify');
var selectRegWay = require('./selectRegWay');
var verifyArrow = require('./verifyArrow');

// ʹ��script-loaderȫ������һ��jQuery throttle/debounce���
require('script!./jquery.ba-throttle-debounce.min.js');

$(document).ready(inputVerify);
$(document).ready(selectRegWay);
$(document).ready(verifyArrow);