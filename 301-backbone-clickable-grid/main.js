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

	'use strict';

	$(function () {
	    var GridModelConstrustor = __webpack_require__(1);
	    var GridViewConstrustor = __webpack_require__(2);

	    var gridModel = new GridModelConstrustor();
	    var gridView = new GridViewConstrustor({model: gridModel});
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Backbone.Model.extend({
	    defaults: {
	        rowNum: 5
	    },

	    validate: function (attrs) {
	        if (attrs.rowNum < 1 || attrs.rowNum > 50) {
	            return '数字只能在1-50范围内，不然不方便显示~';
	        }
	    }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 引入辅助函数模块
	var tool = __webpack_require__(3);

	module.exports = Backbone.View.extend({
	    el: $('#container'),
	    // 引入定义在html文件中的模板
	    template: _.template($('#template').html()),

	    // 初始化时监听模型变动，同时运行一次render
	    initialize: function () {
	        this.listenTo(this.model, 'change', this.render);
	        this.model.on('invalid', this.showMessage, this);
	        this.render();
	    },

	    render: function () {
	        var rowNum = this.model.get('rowNum');
	        var fontSize = rowNum < 32 ? (300 / rowNum) + 'px' : '1px';
	        // 引入模板
	        var html = this.template({rowNum: rowNum});
	        // 生成格子
	        this.$el.find('#box').html(html);
	        // 根据格子数调整字体大小
	        this.$el.find('#box').css('fontSize', fontSize);
	        // 根据方块行数决定容器宽度是否扩展
	        if (rowNum > 32) {
	            this.$el.addClass('max-width');
	        } else {
	            this.$el.removeClass('max-width');
	        }
	        // 使input文本被选中
	        this.letInputSelect(this.$el.find("input#row-num"));
	    },

	    events: {
	        // 监听的元素必须在el范围内
	        // 监听输入变动
	        'change input#row-num': 'inputChanged',
	        // 监听输入框按键动作
	        'keyup input#row-num': 'inputKeyUp',
	        // 监听格子上的点击事件
	        'click .item': 'printGridNum',
	        // 监听「自动演示」按钮的点击事件
	        'click button.auto-play': 'autoPlay'
	    },

	    printGridNum: function (event) {
	        tool.printElementText($(event.target));
	    },

	    inputChanged: function (event) {
	        // 使用num保证输入框为空时网格内不会没有任何显示
	        var num = $(event.target).val() ? $(event.target).val() : 1;
	        var data = {rowNum: num};
	        // 只有在数据确实发生变动后才写入新数据
	        if (num !== parseInt(this.model.getRowNum)) {
	            this.model.set(data, {validate: true});
	        }
	    },

	    inputKeyUp: function (event) {
	        // 数字键、小键盘数字键、退格键才会触发inputChanged
	        if (tool.isNumKey(event.keyCode, {backspaceKey: true})) {
	            this.inputChanged(event);
	        }
	    },

	    // 使输入框总延迟500ms后被选中，方便修改数值的同时，不影响快速输入多位数字
	    letInputSelect: function ($element) {
	        tool.runAfter(tool.letElementSelected, 500, $element);
	    },

	    // 行数自动递增到指定值后再递减
	    autoPlay: function () {
	        var num = 0;
	        var maxNum = 35;
	        var delay = 180;
	        var maxCount = 65;
	        var step = 1;
	        var data = {};

	        function _play(thisElem) {
	            // 行数达到上限时开始递减
	            if (num === maxNum) {
	                step = -1;
	            }
	            num += step;
	            data = {rowNum: num};
	            thisElem.model.set(data);
	            thisElem.$el.find('input#row-num').val(num);
	        }

	        tool.runRepeat(_play, delay, maxCount, this);
	    },

	    showMessage: function (model, message) {
	        tool.changeElementText(this.$el.find('.message'), message);
	        this.clearMessageAfter();
	    },

	    // 2.5秒后清空消息区
	    clearMessageAfter: function () {
	        tool.runAfter(tool.changeElementText, 2500, this.$el.find('.message'), '');
	    }
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
	 * 为view层提供工具函数
	 */

	'use strict';

	module.exports = {
	    // 控制台输出指定元素的文本内容
	    printElementText: function ($element) {
	        console.log($element.text());
	    },

	    // 判断给定的数字是否为数字键的键码（默认不包含回车键与退格键）
	    isNumKey: function (keyNum, obj) {
	        var enterKey = obj.enterKey || false;
	        var backspaceKey = obj.backspaceKey || false;

	        return (
	            // 数字小键盘区
	            (keyNum >= 96 && keyNum <= 105) ||
	                // 主键盘数字区
	            (keyNum >= 48 && keyNum <= 57) ||
	                // 退格键
	            (keyNum === 8 && backspaceKey) ||
	                // 回车键
	            (keyNum === 13 && enterKey)
	        );
	    },

	    changeElementText: function ($element, text) {
	        $element.text(text);
	    },

	    // 指定的毫秒数后运行函数
	    // func为函数名，delay为延时的毫秒数，delay之后的参数都会作为func函数的参数
	    runAfter: function (func, delay) {
	        var args = Array.prototype.slice.call(arguments, 2);
	        return setTimeout(function () {
	            return func.apply(null, args);
	        }, delay);
	    },

	    // 按照指定的次数重复执行函数
	    // func为函数名，delay为延时的毫秒数，maxCount为执行次数，之后的参数都会作为func函数的参数
	    runRepeat: function (func, delay, maxCount) {
	        var args = Array.prototype.slice.call(arguments, 3);
	        var vintervalId = null;
	        var count = 0;

	        function _doLoop() {
	            count += 1;
	            func.apply(null, args);
	            if (count >= maxCount) {
	                clearInterval(vintervalId);
	            }
	        }

	        vintervalId = setInterval(_doLoop, delay);
	        return vintervalId;
	    },

	    // 让指定元素处于选中状态
	    letElementSelected: function ($element) {
	        $element.select();
	    }
	};

/***/ }
/******/ ]);