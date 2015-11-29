var $box = $("#slide-box"),
    $slide_bg = $("#slide-bg"),
    $scale_text = $(".scale_text"),
    $captcha = $(".captcha-area"),
    $btn_next = $("#btn-next"),
    $captcha_img = $(".captcha-img > img"),
    $form_mobile = $(".form-mobile"),
    $form_email = $(".form-email"),
    $reg_method = $(".reg-method"),
    method = 0,
    USE_PHONE = 0,
    USE_EMAIL = 1,
    CAPTCHA_COUNT = 3,
    CLICK_RANGE = 8,
    VALIDATED = false;
pid = 0,




    slideBoxRestart = function() {
        $(document).off("mousemove")
        $box.animate({
            left: "0px"
        });
        $slide_bg.animate({
            width: "0px"
        });
    },

    showImg = function() {
        $scale_text.css("color", "#fff");
        $captcha.show();
    },

    reloadImg = function() {
        do {
            var tmp = Math.floor(100 * Math.random()) % CAPTCHA_COUNT + 1;
        } while (tmp == pid);
        pid = tmp;
    },

    getCaptcha = function() {
        if (0 === pid) {
            pid = Math.floor(100 * Math.random()) % CAPTCHA_COUNT + 1;
            $(".captcah-reload").on("click", reloadImg);
        }

        var img = "assets/captcha0" + pid + ".jpg";
        var json = 'assets/captcha0' + pid + ".json";
        var captcha = {};
        $captcha_img.attr("src", img);
        $.getJSON(json, function(result) {
            console.log("get JSON: " + json);
            var n = result.count,
                idx = Math.floor(100 * Math.random()) % n,
                d = result.data[idx],
                v = d.value;
            captcha.x = d.x;
            captcha.y = d.y;
            $scale_text.text("请点击图中\"" + v + "\"字");
        }).error(function(jqXhr, textStatus, error) {
            console.log("ERROR: " + textStatus + ", " + error);
        });

        //update captcha
        $captcha_img.on("click", function(event) {
            checkCaptcha(event, captcha);
            // if (Math.abs(event.offsetX - captcha.x) <= CLICK_RANGE && Math.abs(event.offsetY - captcha.y) <= CLICK_RANGE) {
            //     $(this).off("click");
            //     captchaVerified();
            // } else {
            //     $(".captcha-answer").text("验证码错误,请重试!");
            //     reloadImg();
            //     // $(".captcha-hint").show().text("验证码错误，请重试！"), reloadImg();
            // }
        });
    },

    checkCaptcha = function(event, captcha) {
        if (Math.abs(event.offsetX - captcha.x) <= CLICK_RANGE && Math.abs(event.offsetY - captcha.y) <= CLICK_RANGE) {
            $(this).off("click");
            captchaVerified();
        } else {
            console.log("验证码错误");
            $captcha_img.off("click");
            reloadImg();
            getCaptcha();
            $(".captcha-answer").text("验证码错误,请重试!");
        }
    },

    captchaVerified = function() {
        $captcha.hide();
        $scale_text.text("验证成功");
        $btn_next.removeClass("btn-disabled").addClass("btn-enabled");
    },

    checkValidation = function(val) {
        if (method === USE_PHONE) {
            var regEx = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
            if (!regEx.test(val)) {
                $form_mobile.find(".tip").show();
                VALIDATED = false;
            } else {
                VALIDATED = true;
            }
        } else if (method === USE_EMAIL) {
            var regEx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (!regEx.test(val)) {
                $form_email.find(".tip").show();
                VALIDATED = false;
            } else {
                VALIDATED = true;
            }
        } else {
            console.log("method error!")
            VALIDATED = false;
        }
    }

initSlideBox = function() {
        $box.on("mousedown", function(e) {
            var t = e.clientX - this.offsetLeft;
            $(document).on("mousemove", function(e) {
                var i = e.clientX - t;
                if (0 > i) {
                    i = 0
                } else if (i > 280) {
                    i = 280;
                    $(document).off("mousemove").off("mouseup");
                    $box.off("mousedown");
                    showImg();
                    getCaptcha();
                }
                $box.css("left", i + "px");
                $slide_bg.css("width", i + "px");
                console.log(i + "px");

            })
        });
        $(document).on("mouseup", function() {
            slideBoxRestart();
        })
    },

    initInputVerification = function($form) {
        var $input = $form.find("input");
        $input.on("input", function() {
            $form.find(".tip").hide();
        }).on("blur", function() {
            checkValidation(this.value);
        });
    },


    initRegMethod = function() {
        $reg_method.on("click", function(event) {
            event.preventDefault();
            if (method === USE_PHONE) {
                method = USE_EMAIL
                $form_mobile.hide();
                $form_mobile.find("input").off("blur")
                $form_email.show();
                $reg_method.text("需要通过手机注册");
            } else if (method === USE_EMAIL) {
                method = USE_PHONE
                $form_email.hide();
                $form_email.find("input").off("blur")
                $form_mobile.show();
                $reg_method.text("需要通过邮箱注册");
            } else {
                console.log("ERROR");
            }
        })
    },

    initNextButton = function() {
        $("#btn-next").on("click", function() {
            if (VALIDATED) {
                alert("验证成功，进入下一步！");
            }

        })
    }

$(document).ready(function() {
    initSlideBox();
    initInputVerification($form_email);
    initInputVerification($form_mobile);
    initRegMethod();
    initNextButton();
});
