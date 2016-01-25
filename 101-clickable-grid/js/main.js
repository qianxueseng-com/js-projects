function contain(parent, target) {
	if(parent.contains) {
		return parent.contains(target);

	} else if (parent.compareDocumentPosition) {

		return !!parent.compareDocumentPosition(target) & 16;
	}
}
function addEvent(ele, type, handler, bubble) {
	return ele.addEventListener ? ele.addEventListener(type, handler, bubble || false) : 
	   ele.attachEvent.call(ele, ["on"+type, handler]);
}

function Square(obj) {
	this.obj = obj;
	this.num = 0;
	

}

Square.prototype = {

	setContent: function(target) {
		
		
		// 设置方块内容
		target.innerHTML = target.index;

		
		// 设置方块的字体大小
		target.style.fontSize = this.obj.offsetWidth / (this.num*5)   +'px';


	},

	init: function(num) {
		var i, j, len;
		var temp, uls, lis;

		if(typeof num !== 'number') {
			console.log(num + " 不是数字\n"	);
			return;
		}

		this.num = num;
		this.obj.innerHTML = '';
		
		temp = document.createDocumentFragment();
		for (i=0, len=num; i<len; i++){
			uls = document.createElement('ul');
			for (j=0; j<len; j++) {
				lis = document.createElement('li');

				// 保存方块当前顺序
				lis.index = i*num + j+1;

				this.setContent(lis);
				
				uls.appendChild(lis);
			}
			temp.appendChild(uls);
		}
		
		this.obj.appendChild(temp);
	}
	
};


window.onload = function() {
	

	var te = document.getElementById('text'),
		button = document.getElementById('btn'),
		message = document.getElementById('message'),
		square = new Square(document.getElementById('square'));

	var num;

	addEvent(te, 'keydown',function(event) {
		event = event|| window.event;
		var code = event.keyCode || event.which;
		if (code === 13) {
			button.onclick();
		}
	});

	addEvent(button, 'click', function () {
		var num,

		//  忽略前导零
			reg = /^(?:0*)(\d{1,2})$/,
			arr = te.value.match(reg);


		// 输入为空则 arr 为 null
		num = arr ? parseInt(arr[0]) : null;

		// 每次点击按钮后清空 message
		message.innerHTML = '';
		message.style.display = 'none';

		// 提示信息
		if ( !num) {
			message.innerHTML = "<h3>要求不高，就两位数以内的正整数</h3>";
			message.style.display = 'block';
			te.select();

			return ;
		} else if(num > 20) {
			message.innerHTML = "<h4>温馨提示： "+ num +"超过20了</h4>";
			message.style.display = 'block';
			te.select();
			return ;
		}

		
		// 对DOM元素 初始化
		square.init(num);
		addEvent(document, 'click', function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;

			if ( contain(square.obj, target) || target.nodeName === 'LI') {
				message.innerHTML = '<p>当前小方块的是第'+target.index+'块，数值是<span>'+target.innerHTML+'</span></p>';
				message.style.display = 'block';
				console.log('当前小方块的是第'+target.index+'块，数值是'+target.innerHTML+ '\n');
			}
		});


	})
		
};