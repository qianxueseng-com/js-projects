// ---- 测试脚本---- //
var tool = require('./tool.js');

// ----  Chai 引入---- //
// 设置断言模式为 expect 模式
var expect = require('../../node_modules/chai/lib/chai.js').expect;  

// ----  TEST ---- //
describe('数字键码判定测试', function() {
	it('小键盘数字键，键码在96~~105 应该返回true', function() {
		for(var i = 96; i< 106; i++) {
			expect(tool.keyCodeIsNum(i)).to.be.ok;
		}
	});
	it('主键盘数字键，键码在48~~57 应该返回true', function() {
		for(var i= 48;i< 58; i++){
			expect(tool.keyCodeIsNum(i)).to.be.ok;
		}
	});
	it('其它键码时返回false', function() {
		for(var i=0; i<223; i++) {
			if(i >47 && i<58 || i>95 && i <106) {
				continue;
			}
			expect(tool.keyCodeIsNum(i)).to.be.not.ok;
		}
	});
});

describe('生成网格数量测试', function() {
	var $input = $('#input-text'),
		$button = $('#input-button');
		$message = $('#message');

	it('正确输入1~~20范围，生成对应网格', function() {
		for (var i=1; i<21; i++) {
			$input.val(i);
			$button.trigger('click');

			expect($('#square ul').length).to.be.equal(i);
			expect($('#square li').length).to.be.equal(i*i);
			expect($message.text()).have.length.to.be.empty;

		}
	});
	it('输入值不在1~~20范围内，提示范围错误', function() {
		for(var i=-100; i< 100; i++) {
			
			if( i>0 && i < 21) {
				continue;
			}

			$input.val(i);
			$button.trigger('click');
			expect($message.text()).have.length.to.be.not.empty;
		}
	});

	it('输入字符错误，不可能发生的错误', function() {
		var arr =['1 2', '  ', 'sadkh', '"', '\/\//'];

		for(var i=arr.lentgh-1; i> -1; i--) {
			$input.val(i);
			$button.trigger('click');
			expect($message.text()).have.length.to.be.equal('输入值不合法，请输入数字'.length);
		}
	});
});
