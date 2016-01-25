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

	var scrollLoading = __webpack_require__(1);
	var checkInput = __webpack_require__(4);

	$(document).ready(function(){
		scrollLoading();

		$(".need input").on("focus", function() {

			$(this).removeClass("fail");
			$(this).siblings(".msg").removeClass("fail ok").text('');

			$(this).on("blur", checkInput);

		});

		$(".tip").on("click", function() {
			
			// 修改表单必填项目显示/隐藏状态
			$("#check").children(".list").toggleClass('need');

			// 修改流程项目显示数
			$(".steps").toggleClass("steps-4");

			if ($(this).text()=== '需要通过邮箱注册') {
				$(this).text("个人用户可以使用手机号注册>");
			} else {
				$(this).text("需要通过邮箱注册");
			}
			$(this).siblings().toggle();

			// 不要重复绑定
			$(".need input").off().on("focus", function() {

				$(this).removeClass("fail");
				$(this).siblings(".msg").removeClass("fail ok").text('');

				$(this).on("blur", checkInput);

			})

			return false;

		});
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var setCaptcha = __webpack_require__(2);

	function scrollLoading() {
		var $parent = $("#scroll"),
			$target = $parent.children(".square"),
			$bg = $parent.children(".bg"),
			$text = $parent.children(".scroll-text");
			$captcha = $(".captcha");
		// 移动的最大范围
		var MAX_Width = parseInt($parent.css("width"))-parseInt($target.css("width"));

		$target.on("mousedown", function(event) {
			var $self = $(this);
			var reached = false;
			var DisX;
			
			event = event || window.event;
			
			// 获取鼠标点下时，鼠标 与 $target 的相对位置
			DisX = event.clientX - parseInt($target.css("left"));

			// 捕捉 mousemove事件, 防止事件失效
			$(document).on("mousemove", function(event){

				var currentX;
				event = event || window.event;

				if(!reached) {
					currentX = event.clientX - DisX;

					if (currentX < 0) {
						currentX = 0;
					}
					if (currentX > MAX_Width) {
						currentX = MAX_Width;

						// 成功到达边界
						$self.off("mousedown").addClass("loading");
						$text.text("加载中").addClass("active");

						// 显示验证面板
						$captcha.addClass('active');

						// 验证生成
						setCaptcha($captcha);

						// 解除委托在 document 事件上的对应函数
						$(this).off("mousemove");
						$(this).off("mouseup");
					}

					$self.css({left: currentX+"px"});
					$bg.css({width: currentX+"px"});
				}
			});

			// 不要把 up 事件移入 move 事件中， 多重绑定要命啊
			$(document).on("mouseup", function() {
					
				// $target 未到达边界，恢复原样
				$self.animate({left: 0});
				$bg.animate({width: 0});

			});

			//window.event ? (event.cancelBubble = false) : event.stopPropagation();
			// 阻止冒泡，拒绝蓝条， JQ 已封装事件，return false 即可达到 阻止冒泡和默认行为的效果

			return false;
		});
	}

	module.exports = scrollLoading;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var checkCaptcha = __webpack_require__(3);
	var checkInput = __webpack_require__(4);

	function setCaptcha($container) {

		var $target = $container.find("img");
		var $reload = $container.find("a");
		var $tip = $container.find("span");

		var $text = $(".scroll-text");
		
		var captcha = null;
		function createCaptcha(){

			var captchaIndex, url;


			captchaIndex = Math.floor(Math.random()*3);
			
			url = "../source/captcha/captcha0"+ captchaIndex;

			$.ajax({
				url: url+".json", 

				success: function(result) {
					var data = result.data;

					captcha = data[Math.floor(Math.random()*data.length)];


					// 设置验证图片源
					$target.attr("src", url+".png");

					$text.text('请点击图中的“'+captcha.value+'”字');
					
					

				},
				error: function(){
					$text.text('网络出现问题，请点击"看不清？换一张"');
				},

				datatype: "json"
			});

		}
		createCaptcha();
		$reload.on("click", function(){
			
			createCaptcha();
			return false;
		});
		$target.on("click", function(event) {

			if (checkCaptcha(event, captcha)) {
				$text.text("验证成功！");
				
				// 验证板块作用完毕，隐藏
				$container.removeClass("active");

				//别忘了打勾
				$(".square").removeClass("loading").addClass("active");

				// 激活表单按钮
				$('.btn').removeAttr('disabled').removeClass('btn-disabled').on("click", function() {
					if (checkInput()) {
						$(this).val("模仿完成");
					}

				});

				// 事件无需再次执行，解除
				$reload.off();
				$(this).off();
			} else {
				$tip.text('验证失败，请重试');
			}
		});

	}

	module.exports = setCaptcha;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function checkCaptcha(event, captcha) {
		event = event || window.event;
		if (event.offsetX > captcha.xl && event.offsetX < captcha.xr && 
			  event.offsetY > captcha.yt && event.offsetY < captcha.yb) {
			return true;
		} else {
			return false;
		}
	}
	module.exports = checkCaptcha;

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);