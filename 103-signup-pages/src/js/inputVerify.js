'use strict';

var accountVerify = require('./accountVerify');

// 输入框失焦后进行验证
module.exports = function () {
    $(':input').on('blur', accountVerify);
};