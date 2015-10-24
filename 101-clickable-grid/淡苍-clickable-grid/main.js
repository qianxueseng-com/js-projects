$('#n-submit').on('click', function() {
  //清除main的所有子元素，清除绑定事件
  $('.main').empty().undelegate();

  //获取n的值
  var n = parseInt($('#n-size').val());

  //添加格子
  for(var i = 1; i <= n; i++){
    var line = " ";
    for(var j = 1; j <= n; j++){
      var number = (i - 1) * n + j;
      line = line
          + '<li id="' + number + '">'
          + number
          + '</li>';
    }
    $('.main').append(
      '<ul>' + line + '</ul>'
    );
  }

  //根据n值调整字体大小
  var font_size = Math.ceil(150 / n) + 'px';
  $('li').css('font-size', font_size);

  //为格子注册事件
  $(".main").delegate("li", "click", function(){
    var elementId = $(this).attr('id');
    console.log(elementId);
  });
});
