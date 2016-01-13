module.exports = function() {
	var $slider = $('#oSlider');
	var $sliderBg = $('.slide-bg');
	$slider.on('mousedown', sliderPosition);

	function sliderPosition(e) {
		var disX = e.clientX - this.offsetLeft;

		$(document).on('mousemove', startSlider)

		function startSlider(e) {
			var x = e.clientX - disX;
			if ( x < 0) {
				x = 0;
			}
			else if (x >= 260) {
				x = 260;
				$('.captcha').css('display', 'block');
				$(document).off('mousemove').off('mouseup');
				$slider.off('mousedown');
			}
			$slider.css('left', x +'px');
			$sliderBg.css('width', x + 'px');

		}
	}
	$(document).on('mouseup', function() {
		$(document).off("mousemove");
  		$slider.animate({ left: '0' }, 1000);
		$sliderBg.animate({ width: '0' }, 1000);
	})

}
