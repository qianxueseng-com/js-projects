/*!
 *淘宝注册页demo 主js
 * 依赖：jQuery2.1.1
 * 包含：定义输入框失焦后行为的函数    inputVerify()
 *      账号验证函数                accountVerify()
 *      切换到邮箱/手机注册的函数     selectRegWay()
 *      定义验证滑块行为的函数        verifyArrow()
 *      显示验证码并绑定点击事件的函数 showCaptcha()
 *      滑块验证成功时调用的函数      verifySuccess()
 *      滑块验证失败时调用的函数      verifyFail()
 * */

$(window).load(inputVerify);
$(window).load(selectRegWay);
$(window).load(verifyArrow);

function inputVerify() {
    // 输入框失焦后验证输入
    "use strict";
    $(':input').on('blur', accountVerify);
}

function accountVerify() {
    "use strict";
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
}

function selectRegWay() {
    // 设置点击'需要邮箱注册'链接之后的行为
    "use strict";
    var $selectReg = $('div.mail-reg').find('a');
    var $stepAreaLi = $('div.step-area').find('li:eq(2)');
    var $stepArea = $stepAreaLi.parent();

    $selectReg.on('click', function () {
        if ($stepArea.hasClass('in-mail-reg')) {
            $('div.phone').show();
            $('div.email').hide();
            $stepAreaLi.show();
            $stepArea.removeClass('in-mail-reg');
            $selectReg.text('需要通过邮箱注册');
            $selectReg.attr('href', 'mailReg.html');
        } else {
            $('div.phone').hide();
            $('div.email').show();
            $stepAreaLi.hide();
            $stepArea.addClass('in-mail-reg');
            $selectReg.text('个人用户可以使用手机号注册>');
            $selectReg.attr('href', 'index.html');
        }
        return false;
    })
}

function verifyArrow() {
    // 设置验证滑块的行为
    "use strict";
    // 箭头
    var $verifyArea = $('div.verify-area');
    var $arrow = $verifyArea.find('span.arrow');
    // 箭头向右拖动后露出的背景
    var $bg = $verifyArea.find('div.bg');
    // 鼠标在滑块上按下键才可以拖动，dragging为是否可以拖动的标志变量
    var dragging = false;
    // 标志滑块是否到达最右端的变量
    var reached = false;
    var iX;

    $arrow.on('mousedown', function (e) {
        dragging = true;
        iX = e.clientX - this.offsetLeft;
        return false;
    });

    // mousemove，mouseup要绑定在document上
    // 如果只绑定在箭头图片上，箭头的移动就会不顺畅
    $(document).on('mousemove', function (e) {
        if (dragging && !reached) {
            if ($arrow.position().left > -5) {
                if ($arrow.position().left < 260) {
                    var oX = e.clientX - iX;
                    $arrow.css('left', oX + 'px');
                    $bg.css('width', oX + 1 + 'px');
                } else {
                    reached = true;
                }
            }
        }
    });

    $(document).on('mouseup', function () {
        dragging = false;
        if (!reached) {
            $arrow.animate({'left': '0'}, 400);
            $bg.animate({'width': '0'}, 400);
        } else {
            showCaptcha();
            // 滑块到达指定位置后解绑鼠标事件，以免多次触发showCaptcha()
            $(document).off();
            $arrow.off();
        }
    })
}

function showCaptcha() {
    "use strict";
    // 生成验证码图片
    // 确保只出现一张验证码图片
    if ($(document).find('#captcha-area').length < 1) {
        $('span.verify-area-text').text('');
        $('div.bg').text('请点击图中的「前学僧」字样');
        $('div.verify-area').append('<div id="captcha-area">' +
            '<span class="captcha-text"></span>' +
            '<a href="" class="captcha-refesh">看不清？换一张</a>' +
            '<div class="captcha-img"><img src="src/captcha1.png" alt="captcha"/></div>' +
            '</div>');
    }

    var $img = $('div.captcha-img').find('img');
    // 去掉图片路径中非数字字符，得到图片序号
    var imgNum = $img.attr('src').replace(/\D*/g, '');
    // 预定义的正确点击位置 x1，x2分别为x坐标的上下限，y坐标同理
    var correctSite = [{x1: 36, x2: 145, y1: 60, y2: 92}, {x1: 120, x2: 226, y1: 186, y2: 220}];

    // 给图片绑定鼠标点击事件
    // 点击到指定的位置验证通过
    $('#captcha-area').find('img').on('mouseup', function (e) {
        // 获取鼠标点击位置相对于图片左上方的坐标
        var iX = e.clientX - $(this).offset().left;
        var iY = e.clientY - $(this).offset().top;

        if (iX > correctSite[imgNum - 1].x1 && iX < correctSite[imgNum - 1].x2
            && iY > correctSite[imgNum - 1].y1 && iY < correctSite[imgNum - 1].y2) {
            verifySuccess();
        } else {
            verifyFail();
        }
    });

    // 给「看不清？换一张」绑定点击事件：刷新验证码
    $('a.captcha-refesh').on('click', function () {
        var newImgNum = 1;
        if (imgNum == '1') {
            newImgNum = 2;
        }
        imgNum = newImgNum;
        $img.attr('src', 'src/captcha' + newImgNum + '.png');
        return false;
    })
}

function verifySuccess() {
    // 显示通过提示，「下一步」按钮添加样式，绑定点击事件
    "use strict";
    $('div.bg').text('验证通过！');
    // 原箭头滑块替换成表示完成的对勾
    $('div.verify-area').find('.arrow').addClass('iconfont icon-duihao').css('background', 'none');
    $(document).find('#captcha-area').remove();
    $('div.next').addClass('succeed')
        .on('click', function () {
            if (accountVerify()) {
                $('div.next').find('a').text('并没有下一步...');
            }
        })

}

function verifyFail() {
    "use strict";
    $('span.captcha-text').text('验证码点击错误，请重试');
}
