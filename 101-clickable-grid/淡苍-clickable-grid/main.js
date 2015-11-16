$('#n-submit').on('click', function() {
  //清除main的所有子元素，清除绑定事件
  $('.main').empty().undelegate();

  //获取n的值
  var n = parseInt($('#n-size').val());

  //添加格子
  var table = " ";
  for(var i = 1; i <= n; i++){
    line = '<ul>';
    for(var j = 1; j <= n; j++){
      var number = (i - 1) * n + j;
      line = line
          + '<li id="' + number + '">'
          + number
          + '</li>';
    }
    line = line + '</ul>';
    table = table + line;
  }

  //统一dom渲染
  $('.main').append(table);

  //根据n值调整字体大小
  var font_size = Math.ceil(150 / n) + 'px';
  $('li').css('font-size', font_size);

  //为格子注册事件
  $(".main").on("click", "li", function(){
    var elementId = $(this).attr('id');
    console.log(elementId);
  });
});
