 var addEventWheel = function(){
 	var wheel = require('./mousewheel.js');

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
