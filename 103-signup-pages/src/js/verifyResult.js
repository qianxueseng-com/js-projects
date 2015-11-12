'use strict';

var accountVerify = require('./accountVerify');

module.exports = {
    success: function ($container) {
        var $next = $('div.next');
        // 显示通过提示，「下一步」按钮添加样式，绑定点击事件
        $container.find('div.bg').text('验证通过！');
        // 原箭头滑块替换成表示完成的对勾
        $container.find('.arrow').addClass('iconfont icon-duihao').css('background', 'none');
        $container.find('#captcha-area').remove();
        $next.addClass('succeed')
            .on('click', function () {
                if (accountVerify()) {
                    $next.find('a').text('并没有下一步...');
                }
            });
    },

    fail: function($container) {
        $container.find('span.captcha-text').text('验证码点击错误，请重试');
    }
};