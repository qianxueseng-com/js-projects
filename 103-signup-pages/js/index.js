var scrollLoading = require('./scrollLoading');
var checkInput = require('./checkInput');

$(document).ready(function(){
	scrollLoading();

	$(".need input").on("focus", function() {

		$(this).removeClass("fail");
		$(this).siblings(".msg").removeClass("fail ok").text('');

		$(this).on("blur", checkInput);

	});

	$(".tip").on("click", function() {
		
		// 修改表单必填项目显示/隐藏状态
		$("#check").children(".list").toggleClass('need');

		// 修改流程项目显示数
		$(".steps").toggleClass("steps-4");

		if ($(this).text()=== '需要通过邮箱注册') {
			$(this).text("个人用户可以使用手机号注册>");
		} else {
			$(this).text("需要通过邮箱注册");
		}
		$(this).siblings().toggle();

		// 不要重复绑定
		$(".need input").off().on("focus", function() {

			$(this).removeClass("fail");
			$(this).siblings(".msg").removeClass("fail ok").text('');

			$(this).on("blur", checkInput);

		})

		return false;

	});
});
