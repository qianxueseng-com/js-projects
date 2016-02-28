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