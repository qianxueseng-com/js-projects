

window.onload = function() {
	var wheel = require('./addMousewheelEvent');
	var common  = require('./common.js');

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
