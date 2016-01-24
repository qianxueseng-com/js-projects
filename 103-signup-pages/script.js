/* 
 * @Author: hefei
 * @Date:   2015-12-21 10:09:36
 * @Last Modified by:   hefei
 * @Last Modified time: 2016-01-24 15:22:10
 */
'use strict';
jQuery(document).ready(function($) {
	var $mobile = $('#mobile'),
		$mobileWrong = $('#mobileWrong');
	var phoneNumPattern = /^\d{11}$/; //简单的手机号码正则
	//当输入框内容改变时出发检测
	$mobile.change(function(event) {
		var phoneNum = $mobile.val().toString();
		if (phoneNum != '') {
			if (!phoneNumPattern.test(phoneNum)) {
				$mobileWrong.show();
			} else {
				$mobileWrong.hide();
			}
		}
	});
});