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
/***/ function(module, exports) {

	var $box = $("#slide-box"),
		$slide_bg = $("#slide-bg"),
		$scale_text = $(".scale_text"),
		$captcha = $(".captcha-area"),
		$btn_next = $("#btn-next"),




		slideboxInit = function() {
			$(document).off("mousemove")
			$box.animate({
				left: "0px"
			});
			$slide_bg.animate({
				width: "0px"
			});
		},

		showPicture = function() {
			$scale_text.css("color", "#fff").text("请点击图中");
			// $captcha.show();
			$btn_next.removeClass("btn-disabled").addClass("btn-enabled");
		},

		moveSlidebox = function(){
			$box.on("mousedown", function(e){
				var t = e.clientX - this.offsetLeft;
				$(document).on("mousemove", function(e){
					var i = e.clientX - t;
					0 > i && (i = 0),
					i > 260 && (i = 260, 
						$(document).off("mousemove").off("mouseup"),
						$box.off("mousedown"),
						showPicture());
					$box.css("left", i + "px");
					$slide_bg.css("width", i + "px");
					console.log(i + "px" );
					
				})
			});
			$(document).on("mouseup",function(){
				slideboxInit();
			})
		};

	$(document).ready(function(){
		moveSlidebox();
	});



/***/ }
/******/ ]);