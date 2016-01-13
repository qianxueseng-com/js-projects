var util = require('./util');

module.exports = function() {
	var $mobileInput = $('#mobile-input');
	var mobileValidate = function() {
		var phoneNums = mobileInput.val();
		var _true = util.isMobilePhone(phoneNums);
		
		if (!_true) {
			$('.mobile-tip').html('请输入正确的电话号码');
			$('.mobile-text').css('border', '1px solid #ff3f13')
		}
		else {
			$('.mobile-tip').html('');
		}
	}
	$mobileInput.on('blur', mobileValidate);

}
