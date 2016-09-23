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

	//使用ES6模块写法

	var _model = __webpack_require__(1);

	var _view = __webpack_require__(2);

	var gridsModel = new _model.grid();
	var gridsView = new _view.view({ model: gridsModel });

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	//定义modal，格数为n

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var grid = Backbone.Model.extend({
	  validate: function validate(attrs) {
	    this.clearMessage();
	    if (!_.isNumber(attrs.n) || parseInt(attrs.n) != attrs.n) {
	      this.set({ n: 0 });
	      return '请输入0~20的正整数';
	    }
	    if (attrs.n < 0) {
	      this.set({ n: 0 });
	      return '请输入一个大于等于0的整数';
	    }
	    if (attrs.n > 20) {
	      this.set({ n: 0 });
	      return '请输入小于20的正整数';
	    }
	  },
	  defaults: {
	    n: 0
	  },
	  clearMessage: function clearMessage() {
	    $('.message h3').text(null);
	  }
	});

	exports.grid = grid;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var view = Backbone.View.extend({
	  el: $('.container'),
	  //初始化视图
	  initialize: function initialize() {
	    this.listenTo(this.model, 'change', this.render);
	    this.model.on('invalid', this.showInputError, this);
	    this.template = _.template($("#grids").html());
	    this.render();
	  },
	  //输入事件
	  events: {
	    'click button#n-submit': 'btnMouse',
	    'keypress input#n-size': 'btnKeyboard'
	  },
	  //获取输入的值，重新调整model
	  btnMouse: function btnMouse() {
	    var inputN = $('#n-size').val();
	    this.submitN(inputN);
	  },
	  btnKeyboard: function btnKeyboard(e) {
	    //键盘按下回车时
	    if (e.keyCode == 13) {
	      var inputN = $(e.target).val();
	      this.submitN(inputN);
	    }
	  },
	  submitN: function submitN(n) {
	    $('.message h3').text();
	    this.model.set({ n: parseInt(n) }, { "validate": true });
	  },
	  //渲染 json 化的 modal
	  render: function render() {
	    this.$('.main').html(this.template(this.model.toJSON()));
	    this.changeFontSize();
	  },
	  //更改显示字体
	  changeFontSize: function changeFontSize() {
	    var font_size = Math.ceil(150 / this.model.attributes.n) + 'px';
	    $('.main ul li').css('font-size', font_size);
	  },
	  //显示输入错误提示信息
	  showInputError: function showInputError(model, error) {
	    $('.message h3').text(error);
	  }
	});

	exports.view = view;

/***/ }
/******/ ]);