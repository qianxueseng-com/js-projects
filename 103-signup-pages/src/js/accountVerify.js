'use strict';

module.exports = function () {
    // 手机号和邮箱的正则表达式匹配规则
    var phoneReg = /^(1(3|4|5|7|8)[0-9])[0-9]{8}$/;
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    var $input = $(':input:visible');
    var id = $input.attr('id');
    var $parent = $input.parent();
    var errMsg = '';

    // 隐藏错误信息
    $parent.find('.errMsg').remove();
    $input.removeClass('err');

    if (id === 'phone-num') {
        // 验证手机号
        if ($input.val() === '') {
            errMsg = '请输入你的手机号码';
        } else if (!phoneReg.test($input.val())) {
            errMsg = '手机号码格式不正确，请重新输入';
        }
    } else if (id === 'email') {
        // 验证邮箱
        if ($input.val() === '') {
            errMsg = '请输入你的邮箱';
        } else if (!emailReg.test($input.val())) {
            errMsg = '邮箱格式不正确，请重新输入';
        }
    }

    if (errMsg !== '') {
        // 输出错误信息
        $input.addClass('err');
        $parent.append('<span class="errMsg"> <span class="iconfont">&#xe605;</span>' + errMsg + '</span>');
        return false;
    }
    return true;
};