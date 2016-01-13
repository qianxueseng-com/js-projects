module.exports = function() {
	var $img = $('.cap-img').find('img');
	//validate
	$img.on('mousedown', validate);

	function validate(e) {
		var x = e.clientX - $(this).offset().left;
		var y = e.clientY -  $(this).offset().top;
		if (x > 35 && x < 130 && y > 60 && y < 90) {
			$('.captcha').hide();
			$('.slide-tip').text('验证成功');
			$('.slider').addClass('sliderS');
		}
	}

}
