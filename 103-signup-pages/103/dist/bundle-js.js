/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var mobile = __webpack_require__(1);
	var changeBorder = __webpack_require__(3);
	var email = __webpack_require__(4);
	var slider = __webpack_require__(5);
	var switcher = __webpack_require__(6);
	var captcha = __webpack_require__(7);
	captcha();
	switcher();
	slider();
	mobile();
	email();
	changeBorder();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		isEmail: function (emailStr) {
		    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
		},


		isMobilePhone: function (phone) {
		    return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
		}
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	module.exports = function() {
		$('input').on('focus', function() {
			$('.email-text').css('border', '1px solid #e8e8e8' );
			$('.mobile-text').css('border', '1px solid #e8e8e8');
		})
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(2);

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


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);