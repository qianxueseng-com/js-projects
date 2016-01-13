var util = require('./util');

module.exports = function() {
	var $emailInput = $('#email-input');

	var emailValidate = function() {
		var emailAddress = emailInput.val();
		var _true = util.isEmail(emailAddress);
		if (!_true) {
			$('.email-tip').html('请输入正确的邮箱地址');
			$('.email-text').css('border', '1px solid #ff3f13' )
		}
		else {
			$('.email-tip').html('');
		}
	}

	$emailInput.on('blur', emailValidate);

}
