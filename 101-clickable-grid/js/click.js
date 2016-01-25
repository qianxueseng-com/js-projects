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
