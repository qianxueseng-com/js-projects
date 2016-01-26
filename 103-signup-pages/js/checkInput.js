function checkInput() {
	var $parent = $(".list.need");
	var $target = $parent.find("input");
	var $message = $parent.find(".msg");

	// 正则格式
	var PhonePattern = /^1\d{10}$/;
	var EmailPattern = /^[a-zA-z\d]+([\.\_\-][a-zA-z\d]+)*\@[a-zA-z\d]+(\.[a-zA-Z]{2,5})+$/;
	// 错误提示
	var errorText = '';

	if($target.val() === '') {

		errorText = "你在逗我？";

	} else if($target.hasClass("Email-input")) {

		if (!EmailPattern.test($target.val())) {

			errorText = "邮箱格式不正确";
		}

	} else if (!PhonePattern.test($target.val())) {

			errorText = "号码格式不正确";
	
	}
	// 错误提示不为空，说明有错误
	if (errorText) {
		$target.addClass("fail");
		$message.addClass("fail").text(errorText);
		return false;
	} else {
		$message.addClass("ok");
		return true;
	}

}

module.exports = checkInput;