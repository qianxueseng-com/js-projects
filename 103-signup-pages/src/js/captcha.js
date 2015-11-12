'use strict';

var verifyResult = require('./verifyResult');

module.exports = {
    generate: function ($container) {
        // 验证码区域html
        var captchaHTML = '<div id="captcha-area"><span class="captcha-text"></span>' +
            '<a href="" class="captcha-refesh">看不清？换一张</a><div class="captcha-img">' +
            '<img src="dist/images/captcha1.png" alt="captcha"/></div></div>';

        // 生成验证码图片
        // 确保只出现一张验证码图片
        if ($container.find('#captcha-area').length < 1) {
            $container.find('span.verify-area-text').text('');
            $container.find('div.bg').text('请点击图中的「前学僧」字样');
            $container.find('div.verify-area').append(captchaHTML);
        }
    },

    getImgNum: function () {
        var $img = $('div.captcha-img').find('img');

        // 去掉图片路径中非数字字符，得到图片序号
        return parseInt($img.attr('src').replace(/\D*/g, ''), 10);
    },
    addEve: function (num) {
        var $img = $('div.captcha-img').find('img');
        var imgNum = num;
        // 预定义的正确点击位置 x1，x2分别为x坐标的上下限，y坐标同理
        var correctSite = [{x1: 36, x2: 145, y1: 60, y2: 92}, {x1: 120, x2: 226, y1: 186, y2: 220}];

        // 给图片绑定鼠标点击事件
        // 点击到指定的位置验证通过
        $img.on('mouseup', function (e) {
            // 获取鼠标点击位置相对于图片左上方的坐标
            var iX = e.clientX - $(this).offset().left;
            var iY = e.clientY - $(this).offset().top;

            if (iX > correctSite[imgNum - 1].x1 && iX < correctSite[imgNum - 1].x2 &&
                iY > correctSite[imgNum - 1].y1 && iY < correctSite[imgNum - 1].y2) {
                verifyResult.success($('.verify'));
            } else {
                verifyResult.fail($('.verify'));
            }
        });

        // 给「看不清？换一张」绑定点击事件：刷新验证码
        $('a.captcha-refesh').on('click', function () {
            var newImgNum = 1;

            if (imgNum === 1) {
                newImgNum = 2;
            }
            imgNum = newImgNum;
            $img.attr('src', 'dist/images/captcha' + newImgNum + '.png');
            return false;
        });
    }
};