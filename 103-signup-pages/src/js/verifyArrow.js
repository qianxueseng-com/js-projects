'use strict';

var captcha = require('./captcha');

module.exports = function () {
    // 设置验证滑块的行为
    // 箭头
    var $verifyArea = $('div.verify-area');
    var $arrow = $verifyArea.find('span.arrow');
    // 箭头向右拖动后露出的背景
    var $bg = $verifyArea.find('div.bg');
    // 鼠标在滑块上按下键才可以拖动，dragging为是否可以拖动的标志变量
    var dragging = false;
    // 标志滑块是否到达最右端的变量
    var reached = false;
    var iX,
        oX;

    $arrow.on('mousedown', function (e) {
        dragging = true;
        iX = e.clientX - this.offsetLeft;

        // 在箭头上按下鼠标才为document绑定mousemove
        // mousemove，mouseup要绑定在document上，适应快速移动
        // $.throttle为jQuery throttle/debounce插件提供的函数，用来控制函数连续执行的时间间隔
        $(document).on('mousemove', $.throttle(45, function (evt) {
            if (dragging && !reached) {
                if ($arrow.position().left > -5) {
                    if ($arrow.position().left < 260) {
                        oX = evt.clientX - iX;
                        $arrow.css('left', oX + 'px');
                        $bg.css('width', oX + 1 + 'px');
                    } else {
                        reached = true;
                    }
                }
            }
        }));

        return false;
    });

    $(document).on('mouseup', function () {
        dragging = false;
        if (!reached) {
            $arrow.animate({left: '0'}, 400);
            $bg.animate({width: '0'}, 400);
            // 即使没有到达，鼠标按键抬起后也解绑mousemove
            $(document).off('mousemove');
        } else {
            // 生成验证码
            captcha.generate($('.verify'));
            captcha.addEve(captcha.getImgNum());
            // 滑块到达指定位置后解绑鼠标事件，以免多次触发showCaptcha()
            $(document).off();
            $arrow.off();
        }
    });
};