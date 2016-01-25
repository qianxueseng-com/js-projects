var checkCaptcha = require("./checkCaptcha");
var checkInput = require("./checkInput");

function setCaptcha($container) {

	var $target = $container.find("img");
	var $reload = $container.find("a");
	var $tip = $container.find("span");

	var $text = $(".scroll-text");
	
	var captcha = null;
	function createCaptcha(){

		var captchaIndex, url;


		captchaIndex = Math.floor(Math.random()*3);
		
		url = "../source/captcha/captcha0"+ captchaIndex;

		$.ajax({
			url: url+".json", 

			success: function(result) {
				var data = result.data;

				captcha = data[Math.floor(Math.random()*data.length)];


				// 设置验证图片源
				$target.attr("src", url+".png");

				$text.text('请点击图中的“'+captcha.value+'”字');
				
				

			},
			error: function(){
				$text.text('网络出现问题，请点击"看不清？换一张"');
			},

			datatype: "json"
		});

	}
	createCaptcha();
	$reload.on("click", function(){
		
		createCaptcha();
		return false;
	});
	$target.on("click", function(event) {

		if (checkCaptcha(event, captcha)) {
			$text.text("验证成功！");
			
			// 验证板块作用完毕，隐藏
			$container.removeClass("active");

			//别忘了打勾
			$(".square").removeClass("loading").addClass("active");

			// 激活表单按钮
			$('.btn').removeAttr('disabled').removeClass('btn-disabled').on("click", function() {
				if (checkInput()) {
					$(this).val("模仿完成");
				}

			});

			// 事件无需再次执行，解除
			$reload.off();
			$(this).off();
		} else {
			$tip.text('验证失败，请重试');
		}
	});

}

module.exports = setCaptcha;