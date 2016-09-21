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

	var _collection = __webpack_require__(1);

	var _startView = __webpack_require__(3);

	var _aboutView = __webpack_require__(4);

	var _cardView = __webpack_require__(5);

	var _endView = __webpack_require__(6);

	//import { data } from './data';

	//var cardlist = new cardList(data);

	var myFirebaseRef = new Firebase("https://shining-heat-1411.firebaseio.com");
	myFirebaseRef.on("value", function (data) {
	  var cardlist = new _collection.cardList(data.val());

	  var Router = Backbone.Router.extend({
	    routes: {
	      '': 'start',
	      'start': 'start',
	      'about': 'about',
	      'card/:id/:select': 'card',
	      'end/:select': 'end'
	    },
	    initialize: function initialize() {
	      this.startView = new _startView.startView({ model: cardlist.models[0] });
	      this.aboutView = new _aboutView.aboutView({ model: cardlist.models[1] });
	      this.cardView = [];
	      this.endView = [];
	      for (var i = 2; i <= 6; i++) {
	        if (i <= 4) {
	          this.cardView.push(new _cardView.cardView({ model: cardlist.models[i] }));
	        } else {
	          this.endView.push(new _endView.endView({ model: cardlist.models[i] }));
	        }
	      }
	    },
	    start: function start() {
	      this.startView.render();
	    },
	    about: function about() {
	      this.aboutView.render();
	    },
	    card: function card(id, select) {
	      //每当第一个问题时，初始化countSelect
	      if (id === '1') {
	        this.countSelect = 0;
	      }
	      if (select === '1') {
	        this.countSelect++;
	      }
	      this.cardView[id - 1].render();
	    },
	    end: function end(select) {
	      if (select === '1') {
	        this.countSelect++;
	      }
	      //三张牌拥有任意二张就是忠实玩家
	      if (this.countSelect >= 2) {
	        this.endView[0].render();
	      } else {
	        this.endView[1].render();
	      }
	    }
	  });

	  var router = new Router();
	  Backbone.history.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cardList = undefined;

	var _model = __webpack_require__(2);

	var cardList = Backbone.Collection.extend({
	  model: _model.card
	});

	exports.cardList = cardList;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var card = Backbone.Model.extend({
	  defaults: {
	    question: "",
	    imageURL: "",
	    answerA: "",
	    answerB: ""
	  }
	});

	exports.card = card;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var startView = Backbone.View.extend({
	  el: $('#container'),
	  initialize: function initialize() {
	    this.template = _.template($("#start-template").html());
	  },
	  render: function render() {
	    this.$el.html(this.template(this.model.toJSON()));
	  }
	});

	exports.startView = startView;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var aboutView = Backbone.View.extend({
	  el: $('#container'),
	  initialize: function initialize() {
	    this.template = _.template($("#about-template").html());
	  },
	  render: function render() {
	    this.$el.html(this.template(this.model.toJSON()));
	  }
	});

	exports.aboutView = aboutView;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var cardView = Backbone.View.extend({
	  el: $('#container'),
	  initialize: function initialize() {
	    this.template = _.template($("#card-template").html());
	  },
	  render: function render() {
	    this.$el.html(this.template(this.model.toJSON()));
	  }
	});

	exports.cardView = cardView;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var endView = Backbone.View.extend({
	  el: $('#container'),
	  initialize: function initialize() {
	    this.template = _.template($("#end-template").html());
	  },
	  render: function render() {
	    this.$el.html(this.template(this.model.toJSON()));
	  }
	});

	exports.endView = endView;

/***/ }
/******/ ]);