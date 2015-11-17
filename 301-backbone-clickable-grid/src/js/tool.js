/*
 * 为view层提供工具函数
 */

'use strict';

module.exports = {
    // 控制台输出指定元素的文本内容
    printElementText: function ($element) {
        console.log($element.text());
    },

    // 判断给定的数字是否为数字键的键码（默认不包含回车键与退格键）
    isNumKey: function (keyNum, obj) {
        var enterKey = obj.enterKey || false;
        var backspaceKey = obj.backspaceKey || false;

        return (
            // 数字小键盘区
            (keyNum >= 96 && keyNum <= 105) ||
                // 主键盘数字区
            (keyNum >= 48 && keyNum <= 57) ||
                // 退格键
            (keyNum === 8 && backspaceKey) ||
                // 回车键
            (keyNum === 13 && enterKey)
        );
    },

    changeElementText: function ($element, text) {
        $element.text(text);
    },

    // 指定的毫秒数后运行函数
    // func为函数名，delay为延时的毫秒数，delay之后的参数都会作为func函数的参数
    runAfter: function (func, delay) {
        var args = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, delay);
    },

    // 按照指定的次数重复执行函数
    // func为函数名，delay为延时的毫秒数，maxCount为执行次数，之后的参数都会作为func函数的参数
    runRepeat: function (func, delay, maxCount) {
        var args = Array.prototype.slice.call(arguments, 3);
        var vintervalId = null;
        var count = 0;

        function _doLoop() {
            count += 1;
            func.apply(null, args);
            if (count >= maxCount) {
                clearInterval(vintervalId);
            }
        }

        vintervalId = setInterval(_doLoop, delay);
        return vintervalId;
    },

    // 让指定元素处于选中状态
    letElementSelected: function ($element) {
        $element.select();
    }
};