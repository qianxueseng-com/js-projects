module.exports = function() {
	var $switcher = $('#sighup-switch');
	var $switchText = $switcher.find('a');
	var $email = $('.email');
	var $mobile = $('.mobile');
	var $mobileInput = $('#mobile-input');
	var $emailInput = $('#email-input');

	$switcher.on('click', function() {
		if ($switcher.hasClass('switch-email')) {
			$mobile.hide();
			$('.steps').hide();
			$('.steps-s').show();
			$email.show();
			$emailInput.val('')
					.css('border', '1px solid #e8e8e8');
			$('.email-tip').text('');
			$switcher.addClass('switch-mobile');
			$switcher.removeClass('switch-email');
		}
		else if ($switcher.hasClass('switch-mobile')) {
			$mobile.show();
			$('.steps-s').hide();
			$('.steps').show();
			$email.hide();
			$mobileInput.val('')
					.css('border', '1px solid #e8e8e8');
			$('.mobile-tip').text('');
			$switcher.addClass('switch-email');
			$switcher.removeClass('switch-mobile');
		}
	})

}
