'use strict'

var view = Backbone.View.extend({
  el: $('.container'),
  //初始化视图
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.model.on('invalid', this.showInputError, this);
    this.template = _.template($("#grids").html());
    this.render();
  },
  //输入事件
  events: {
    'click button#n-submit': 'btnMouse',
    'keypress input#n-size': 'btnKeyboard'
  },
  //获取输入的值，重新调整model
  btnMouse: function() {
    var inputN = $('#n-size').val();
    this.submitN(inputN);
  },
  btnKeyboard: function(e) {
    //键盘按下回车时
    if (e.keyCode == 13){
      var inputN = $(e.target).val();
      this.submitN(inputN);
    }
  },
  submitN: function(n) {
    $('.message h3').text();
    this.model.set({ n: parseInt(n) },{ "validate": true });
  },
  //渲染 json 化的 modal
  render: function() {
    this.$('.main').html(this.template(this.model.toJSON()));
    this.changeFontSize();
  },
  //更改显示字体
  changeFontSize: function() {
    var font_size = Math.ceil(150 / this.model.attributes.n) + 'px';
    $('.main ul li').css('font-size', font_size);
  },
  //显示输入错误提示信息
  showInputError: function(model, error) {
    $('.message h3').text(error);
  }
});

export { view };
