/* 
 * @Author: hefei
 * @Date:   2015-12-21 10:09:36
 * @Last Modified by:   hefei
 * @Last Modified time: 2015-12-21 21:11:59
 */

'use strict';
jQuery(document).ready(function($) {
	var phoneNumPattern = /\d{11}/;
	$('#phoneNumber').change(function(event) {
		var phoneNum = $('#phoneNumber').val().toString();
		if (phoneNum != '') {
			if (!phoneNumPattern.test(phoneNum)) {
				$('#phoneWrong').css("display", "inline");
			} else {
				$('#phoneWrong').css("display", "none");
			}
		}
	});
	$('#nextStep').click(function() {

	});
});