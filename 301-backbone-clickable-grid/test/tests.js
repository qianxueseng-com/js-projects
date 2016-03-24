// ---- 测试脚本---- //
var tool = require('./tool.js');


// ----  Chai 引入---- //
// 设置断言模式为 expect 模式
var expect = require('../../node_modules/chai/lib/chai.js').expect();  

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