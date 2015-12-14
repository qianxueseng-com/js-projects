'use strict'

//定义modal，格数为n
var grid = Backbone.Model.extend({
  validate: function(attrs) {
    this.clearMessage();
    if(!_.isNumber(attrs.n) || parseInt(attrs.n) != attrs.n){
      this.set({ n: 0 });
      return '请输入0~20的正整数';
    }
    if(attrs.n < 0){
      this.set({ n: 0 });
      return '请输入一个大于等于0的整数';
    }
    if(attrs.n > 20){
      this.set({ n: 0 });
      return '请输入小于20的正整数';
    }
  },
  defaults: {
    n: 0
  },
  clearMessage: function() {
    $('.message h3').text(null);
  }
});

export { grid };
