var tool = require('./tool');

module.exports = Backbone.View.extend({
	el: document,

	template: _.template($('#template').html()),

	render: function() {
		var rows = this.model.get('rows'),
			html = this.template({rows:rows});
		this.square.css({fontSize: 300/rows});
		this.square.html(html);
	},

	initialize: function() {

		this.model.on('change', this.render, this);
		this.model.on('invalid', this.alertMessage, this);

		this.square = this.$el.find('#square');
		this.input = this.$el.find('#input-text');
		this.message = this.$el.find('#message');
		this.timer = null;

		this.render();
	},
	events: {
		
		'click li': 'showLi',				// 点击方块显示文本内容
		'click #input-button': 'updata',
		'keyup #input-text': 'updata',		// 输入验证
		'keydown #input-text': 'changeNum'	// 监测键码改变数值
	},
	changeNum: function(event) {
		var code = event.keyCode,
			$input = this.input,
			updata = false;

		

		// 可操作键码
		if(			
			// ---- 数字键 ---- //
			tool.keyCodeIsNum(code) ||

			// ---- 左右方向键 ---- //
			(code === 37 || code === 39) ||

			// ---- 回车 ---- // 
			(code === 13 || code === 100) || 

			// ---- 退格键 ---- //
			(code === 8)
			) {
			updata = true;

		// 额外控制数值大小功能
		} else if(code === 38) { 			// up
			$input.val($input.val()-0+1);

		} else if(code === 40) {			// down
			$input.val($input.val()-1);
		}
		

		// ---- 阻止其它键码输入 以及 keyup事件
		if(!updata) {
			event.preventDefault();
			event.returnValue = false;
		}
	},

	// ---- 更新model数据
	updata: function () {

		var current = this.model.get('rows'),	// 当前数据
			num = this.input.val();	// 输入数据

		if (num != current) {
			this.model.set({rows: num}, {validate: true});
		}	
	},
	showLi: function(event) {
		this.showMessage("当前方块值为"+event.target.innerText);
	},
	alertMessage: function(model, error) {
		var $message = this.message;

		$message.addClass('alert');
		
		setTimeout(function(){
			$message.removeClass('alert');
		}, 1000);

		this.showMessage(error);
	},
	showMessage: function (message) {

		var $message = this.message;
		tool.changeText($message, message);
		
		clearTimeout(this.timer);
		this.timer = setTimeout(function() {
			tool.changeText($message, '');
		}, 1000);
	}

});