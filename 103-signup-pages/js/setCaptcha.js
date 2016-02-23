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
				var backUps = [{
						"data": [{
							"value": "当",
							"xl": "102",
							"yt": "122",
							"xr": "124",
							"yb": "145"
								}, {
							"value": "缩",
							"xl": "160",
							"yt": "231",
							"xr": "182",
							"yb": "253"	
								}, {
							"value": "快",
							"xl": "261",
							"yt": "234",
							"xr": "283",
							"yb": "255"	
								}, {
							"value": "收",
							"xl": "35",
							"yt": "245",
							"xr": "57",
							"yb": "266"	
								}]
						},{
						"data": [{
							"value": "内",
							"xl": "168",
							"yt": "48",
							"xr": "190",
							"yb": "69"
								},{
							"value": "工",
							"xl": "156",
							"yt": "99",
							"xr": "178",
							"yb": "119"
								},{
							"value": "鲁",
							"xl": "194",
							"yt": "223",
							"xr": "216",
							"yb": "243"
								},{
							"value": "大",
							"xl": "231",
							"yt": "82",
							"xr": "253",
							"yb": "105"
								}]
						},{
						"data": [{
							"value": "女",
							"xl": "151",
							"yt": "104",
							"xr": "173",
							"yb": "128"
								},{
							"value": "至",
							"xl": "200",
							"yt": "113",
							"xr": "222",
							"yb": "137"
								},{
							"value": "比",
							"xl": "174",
							"yt": "190",
							"xr": "196",
							"yb": "214"
								},{
							"value": "般",
							"xl": "221",
							"yt": "277",
							"xr": "243",
							"yb": "299"
								}]
						}
					];
				var data = backUps[captchaIndex].data;

					captcha = data[Math.floor(Math.random()*data.length)];
				
				$target.attr("src", './source/captcha/captcha0'+captchaIndex+".png");
				$text.text('静态网络(测试码)，请点击图中的“'+captcha.value+'”字');

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