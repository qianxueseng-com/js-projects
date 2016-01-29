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

	/*
	 * @Author: hefei
	 * @Date:   2015-12-21 10:09:36
	 * @Last Modified by:   hefei
	 * @Last Modified time: 2016-01-24 17:43:39
	 *
	 */
	'use strict';
	$(document).ready(function ($) {
	    var $mobile = $('#mobile'),
	        $mobileWrong = $('#mobileWrong'),
	        $slide_bg = $('#slide_bg'),
	        $slide_box = $('#slide_box'),
	        $slide_tip = $('#slide_tip');
	    var phoneNumPattern = /^\d{11}$/; //简单的手机号码正则
	    //当输入框内容改变时出发检测
	    $mobile.change(function (event) {
	        var phoneNum = $mobile.val().toString();
	        if (phoneNum != '') {
	            if (!phoneNumPattern.test(phoneNum)) {
	                $mobileWrong.show();
	            } else {
	                $mobileWrong.hide();
	            }
	        }
	    });

	    $slide_box.on('mousedown', function (e) {
	        var t = e.clientX - this.offsetLeft;
	        $slide_box.on("mousemove", function (e) {
	            var i = e.clientX - t;
	            if (i >= 0) {
	                $slide_box.css("left", i + "px");
	                $slide_bg.css("width", i + "px");
	            }
	            if (i >= 258) {
	                $slide_box.off("mousemove").off(
	                    "mouseup").off('mousedown');
	                showImg();
	            }
	        })
	    });

	    $slide_box.on('mouseup', function (e) {
	        $slide_box.off("mousemove")
	        $slide_box.animate({
	            left: "0px"
	        });
	        $slide_bg.animate({
	            width: "0px"
	        });
	    });
	});

	function showImg() {
	    var slide_tip = $('#slide_tip'),
	        tip = '请点击图中的"target"字',
	        imgContainer = $('.showImg'),
	        img = $('#img'),
	        targetArr = ['山', '神', '血', '之'];
	    imgContainer.show();
	    img.attr('src', 'img/0.jpg');
	    slide_tip.css("color", "#fff");
	    slide_tip.text(tip.replace('target', targetArr[0]));
	    imgContainer.find('a').on('click', function (e) {
	        var num = parseInt(img.attr('src').slice(4, 5)),
	            randomNum = Math.floor(Math.random() * 4);
	        while (randomNum === num) {
	            randomNum = Math.floor(Math.random() * 4);
	        }
	        img.attr('src', 'img/num.jpg'.replace('num', randomNum));
	        slide_tip.text(tip.replace('target', targetArr[randomNum]));
	    });
	}

/***/ }
/******/ ]);