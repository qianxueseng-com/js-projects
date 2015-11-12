'use strict';

module.exports = function () {
    // 设置点击'需要邮箱注册'链接之后的行为
    var $selectReg = $('div.mail-reg').find('a');
    var $stepAreaLi = $('div.step-area').find('li:eq(2)');
    var $stepArea = $stepAreaLi.parent();

    $selectReg.on('click', function () {
        if ($stepArea.hasClass('in-mail-reg')) {
            $('.phone').show();
            $('.email').hide();
            $stepAreaLi.show();
            $stepArea.removeClass('in-mail-reg');
            $selectReg.text('需要通过邮箱注册');
            $selectReg.attr('href', 'mailReg.html');
        } else {
            $('.phone').hide();
            $('.email').show();
            $stepAreaLi.hide();
            $stepArea.addClass('in-mail-reg');
            $selectReg.text('个人用户可以使用手机号注册>');
            $selectReg.attr('href', 'index.html');
        }
        return false;
    });
};