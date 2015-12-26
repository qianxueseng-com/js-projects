/* 
 * @Author: hefei
 * @Date:   2015-12-21 10:09:36
 * @Last Modified by:   hefei
 * @Last Modified time: 2015-12-26 22:22:19
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
	var moveBoxLeft = $('#showbox').offset().left;
	$('#showbox').mousedown(function(event) {
		var moveBox = $('#showbox');
		var initX = moveBox.offset().left;
		var mouseX = event.pageX;
		moveBox.mousemove(function(event) {
			var len = parseInt(event.pageX) - parseInt(mouseX)
			if (event.pageX >= moveBoxLeft + 18 && event.pageX <= moveBoxLeft + 245) {
				var temX = len + parseInt(initX);
				moveBox.css("left", temX + "px");
				$('#showleft').css({
					"width": len + "px",
					"height": "35px"
			});
			}
			if(event.pageX >= moveBoxLeft + 240){
				showImg();
			}
		}).mouseup(function(event) {
			moveBox.unbind('mousemove');
		}).mouseleave(function(event) {
			moveBox.unbind('mousemove');
		});
	});
	function showImg (argument) {
		var img = '<img src="img/showImg.png"/>'
		$('#showImg').show();
		$('#showbox').empty().append(img);
		$('#showbox').unbind('mousemove');
	}

	$('#freshImg').click(function(event) {
		var random = (Math.ceil(Math.random() * 3)).toString();
		$('#verifyImg').attr({
			src: "img/" + random + '.jpg'
		});
	})

	$('#nextStep').click(function() {

	});
});