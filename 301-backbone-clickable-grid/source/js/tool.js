// 需要jquery


module.exports = {
	changeText: function($el, text) {
		$el.text(text);
	},
	keyCodeIsNum: function(code) {
		var result = false;
		// ---- 数字键盘数字键码
		if (code > 95 && code < 106 ||

		// ---- 主键盘数字键码
			code > 47 && code < 58
			) {
			result =  true;
		} 

		return result;
	}
};