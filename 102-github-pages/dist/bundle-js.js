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

	

	window.onload = function() {
		var wheel = __webpack_require__(1);
		var common  = __webpack_require__(3);

		var oBody = document.getElementsByTagName('body')[0];
		var warp = document.getElementById('warp');

		var selection = warp.getElementsByTagName('section');
		var portrait = common.getByClass(warp,'portrait')[0];
		var footer = common.getByClass(document, 'footer')[0];

		var front = common.getByClass(portrait, 'front')[0];
		var back = common.getByClass(portrait, 'back')[0];

		var selecL = selection.length;
		var scrollHeight = parseInt(common.getStyle(selection[0], 'height'));
		
		portrait.front = true;
		portrait.turn = false;
		warp.down = true;
		flag = true;
		
		warp.index = 0;


		wheel(window, 'mousewheel', function(event){
			if (flag) {
				flag = !flag;
				if(event.delta < 0) {
					warp.down = true;
				} else if (event.delta > 0){
					warp.down = false;
				}

				warp.down ? warp.index++ : warp.index--;

				warp.index = warp.index > selecL-1 ? 0 : warp.index;
				warp.index = warp.index < 0 ? selecL-1 : warp.index;

				// IE,chrome出现BUG， 原因是top未初始化，getStyle 获得 auto,导致函数无限执行。解决办法，css初始化top属性,(未改进js算法)
				common.move(warp,{top:-scrollHeight*warp.index}, function(){
																	flag = !flag;
																});
			}
		});

		document.onmouseover = function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;

			if ( common.contain(footer, target) || warp.index === selecL-1) {

				common.removeClass(footer, 'small');
				common.move(footer, {height: 150});

			} else {
				common.addClass(footer, 'small');
				common.move(footer, {height: 50});
			}
		};

		document.onclick = function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;

			if (!portrait.turn) {
				if ( common.contain(portrait, target) ) {
					portrait.turn = !portrait.turn;

					if(portrait.front) {
						common.move(front, {opacity:0}, function (){
							common.move(back,{opacity:100}, function (){
								portrait.turn = !portrait.turn;
								portrait.front = !portrait.front;
							});
						});

					} else {
						common.move(back,{opacity:0}, function (){
							common.move(front, {opacity:100}, function (){
								portrait.turn = !portrait.turn;
								portrait.front = !portrait.front;
							});
						});
					}

				}
			}
		};

	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	 var addEventWheel = function(){
	 	var wheel = __webpack_require__(2);

		if (window.addEventListener) {
			return function(el, type, handler, capture) {
				if (type === 'mousewheel' && document.mozHidden !== undefined) {
					type = 'DOMMouseScroll';
				}
				
				el.addEventListener(type, function(event) {
					handler.call(el, wheel(event));
				}, capture || false);
			};
		} else if (window.attachEvent) {
			return function(el, type, handler) {
				el.attachEvent("on" + type, function(event){
					handler.call(el, wheel(event));
					
				});
			};
		}

		console.log('抱歉，您的浏览器不支持鼠标滑轮事件');

	};

	module.exports = addEventWheel();


/***/ },
/* 2 */
/***/ function(module, exports) {

	var a = function wheel(event) {

			event = event || window.event;

			var type = event.type;

			if (type === 'DOMMouseScroll' || type === 'mousewheel') {
				// 滑轮滚动向着身体方向， FireFox的判断属性是detail 变化基数是（-3） 其它浏览器是wheelDelta 变化基数是120
				event.delta = event.wheelDelta ? event.wheelDelta/120 : -(event.detail || 0)/3;
			}

			if (!event.target && event.srcElement) {
				event.target = event.srcElement;
			}
			// 阻止浏览器默认动作
			if(!event.preventDefault && event.returnValue !== undefined) {
				event.preventDefault =  function () {
					event.returnValue = false;
				};
			}

			return event;
		};

	module.exports = a;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function contain(parent, target) {
		if(parent.contains) {
			return parent.contains(target);

		} else if (parent.compareDocumentPosition) {

			return !!parent.compareDocumentPosition(target) & 16;
		}
	}
	function hasClass(target, Name) {
	    
	    
	    var pattern = new RegExp("\\s\*"+Name+"\\s\*"); 
	    
	    return pattern.test(target.className);
	       
	    
	}

	function removeClass(target, name) {
		
	    var pattern = new RegExp("\\s\*"+name+"\\s\*");

	    if(hasClass(target, name)) {
	    	target.className = target.className.replace(pattern, '');
	    }
	}

	function addClass(target, name) {
		var pattern = new RegExp("\\s\*"+name+"\\s\*");

	    if(!hasClass(target, name)) {
	    	target.className += " "+name;
		}
	}

	function toggleClass(target, name) {
		var pattern = new RegExp("\\s\*"+name+"\\s\*");
		hasClass(target, name) ? removeClass(target, name) : addClass(target, name);

	}

	function getByClass(oParent, Name) {
	    var Elems = oParent.getElementsByTagName("*");
	    var Result = [];
	    var check = false;
	    var pattern = new RegExp("\\s\*"+Name+"\\s\*"); 
	    for (var i=0; i< Elems.length; i++) {
	        
	        check = pattern.test(Elems[i].className);
	       
	        if (check === true) {
	            Result.push(Elems[i]);
	        }
	    }
	    return Result;
	}

	function getStyle(obj, name) {

	    if (obj.currentStyle) {
	        return obj.currentStyle[name];

	    } else if(window.getComputedStyle){

	        
	        return getComputedStyle(obj, null)[name];

	    }
	    console.log("无法获取 "+obj+" 的样式");
	}

	function move(obj, Style, fn) {
		    clearInterval(obj.timer);
		    obj.timer = setInterval(function  () {
		    
		        var stop = true;

		        for(var attr in Style)  {
		            var curr = 0;
		            if (attr === 'opacity') {
		    
		                curr = Math.round(parseFloat(getStyle(obj, attr))*100);
		            } else {
		    
		                curr = parseInt(getStyle(obj, attr));
		            }
		           
		            var speed = (Style[attr] - curr)/5;
		            speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
		        	
		            if (Style[attr] != curr) {
		                stop = false;
		            }

		            if (attr === 'opacity'){
		                obj.alpha += speed;
		                obj.style.filter = 'aplha(opacity:'+ (curr+speed) + ')';
		                obj.style.opacity = (curr + speed)/100;
		            } else {
		                obj.style[attr] = curr + speed + "px";
		                
		            }
		            
		        }

		        if(stop) {
		            clearInterval(obj.timer);
		            if(fn) {
		                fn();
		            }
		        }

		    }, 30);
		}

	module.exports = {
		contain: contain,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		getStyle: getStyle,
		getByClass: getByClass,
		move: move
	};

/***/ }
/******/ ]);