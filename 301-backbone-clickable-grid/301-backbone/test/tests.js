'use strcit';

var show = function(value){
  $('#n-size').val(value);
  $("#n-submit").trigger("click");
}

var should = chai.should();
describe('grids-input-right', function () {
  for(var i = 1; i <= 20; i++){
    (function(i){
      it('should equal ' + i + '*' + i + ' when click n === ' + i, function () {
        show(i);
        $('.main ul').length.should.equal(i);
        $(".main li").length.should.equal(i * i);
      });
    })(i);
  }
});

describe('grids-input-error', function () {
  var input = ['test', '$#$%%', -1, -100000, 21, 100000];
  var error = ['请输入0~20的正整数', '请输入一个大于等于0的整数', '请输入小于20的正整数'];
  var errorList = [error[0], error[0], error[1], error[1], error[2], error[2]];

  for(var i = 0; i < input.length; i++){
    (function(i){
      it('error should equal ' + errorList[i] + ' when click n === ' + input[i], function () {
        show(input[i]);
        $(".main ul").length.should.equal(0);
        $(".main li").length.should.equal(0);
        $(".message h3").text().should.equal(errorList[i]);
      });
    })(i);
  }
});
