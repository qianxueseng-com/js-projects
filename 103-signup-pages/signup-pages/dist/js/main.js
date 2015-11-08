var $box = $('.slide-box');
var $picture = $('.show-picture');
//可随机的照片数
var pictureCount = 3;
//当前显示图片编号
var pid = 0;
//标记，是否已通过图片验证
var flag = 0;
//当前验证方式
var method = 1;

//当验证码点击错误或要求更换时不再随机(数量大可以再选择随机), 直接选择下一张
var nextPicture = function(){
  pid = pid + 1;
  if(pid > pictureCount) pid = 1;
  getPictureAndWord();
};

//图片验证成功
var checkPictureSuccess = function(){
  $picture.hide();
  $box.html('<img src="./dist/images/yes.png" />');
  $('#boxhint').css('margin-left', '24%').text('验证成功');
  $('#submit').css('background-color', 'red').css('color', '#fff');
};

//随机图片和文字，注册相应事件
var getPictureAndWord = function(){
  var pictureX, pictureY;

  $('#boxhint').text('验证图片生成中...');
  
  //清除之前的点击事件
  $('#verify').unbind("click");

  //当前还未获取过验证图片
  if(pid == 0){
    pid = Math.floor(Math.random() * 100) % pictureCount + 1;
    $('#changepicture').on('click', nextPicture);
  }

  //获取验证图片
  var picturePath = './dist/images/' + pid + '.png';
  $('#verify').attr('src', picturePath).on('click', function(e){
    var x = e.offsetX;
    var y = e.offsetY;

    //设置一定的点击范围
    if(Math.abs(pictureX - x) <= 8 && Math.abs(pictureY - y) <= 8){
      flag = 1;
      $(this).unbind("click");
      checkPictureSuccess();
    }else{
      $('#pictureHint').show().text('验证码点击错误，请重试!');
      nextPicture();
    }
  });

  //读取文字数据
  var dataPath = './data/picture/' + pid + '.json';
  $.getJSON(dataPath, function(data){
    var wordCount = data[0]['count'];
    var wordData = data[0]['data'];

    //随机图片中的文字，作为需要用户点击的文字
    var wordId = Math.floor(Math.random() * 100) % wordCount + 1;
    var wordValue = wordData[wordId].value;
    pictureX = wordData[wordId].x;
    pictureY = wordData[wordId].y;
    $('#boxhint').text('请点击图片中的 ' + wordValue + ' 字');
  });
};

//显示图片
var showPicture = function(){
  $('#boxhint').css('margin-left', '3%')
      .css('color', 'white');
  $box.html('<img src="./dist/images/no.png" />');
  getPictureAndWord();
  $picture.show();
};

//还原拖动Box
var boxinit = function(){
  $(document).unbind("mousemove");
  $box.animate({
    left: '0px'
  });
  $('.slide-show').animate({
    width: '0px'
  });
};

//Box拖动
var moveSlideBox = function(){
  //鼠标在box内按下触发
  $box.mousedown(function (e){
    var x = e.clientX - this.offsetLeft;
    //这里mousemove与mouseup均注册到document，适应鼠标快速移动
    $(document).mousemove(function(e){
      var left = e.clientX - x;
      if(left < 0){
        left = 0;
      }
      //拖动到底后，去除拖动相关，显示图片
      if(left > 272){
        left = 272;
        $(document).unbind("mousemove").unbind("mouseup");
        $box.unbind("mousedown");
        showPicture();
      }
      $box.css('left', left + 'px');
      $('.slide-show').css('width', left + 'px');
    });
  });

  $(document).mouseup(function(){
    //鼠标释放，还原
    boxinit();
  });
};

var checkPhoneNumber = function(number){
  if(number == ''){
    $('#numberHint').show().text('请输入您的手机号码');
    return;
  }
  var phoneReg = /^1[358]\d{9}$/;
  if(phoneReg.test(number)){
    $('#numberHint').hide();
    return 1;
  }else{
    $('#numberHint').show().text('手机号码格式不正确, 请重新输入');
    return 0;
  }
};

var checkEmail = function(email){
  if(email == ''){
    $('#emailHint').show().text('请输入您的邮箱');
    return;
  }
  var emailReg = /^[._\-a-z0-9]+@[._\-a-z0-9]+(\.[._\-a-z0-9]+)+$/;
  if(emailReg.test(email)){
    $('#emailHint').hide();
    return 1;
  }else{
    $('#emailHint').show().text('邮箱格式不正确, 请重新输入');
    return 0;
  }
};

$(document).ready(function(){
  moveSlideBox();

  $('#phoneNumber').on('blur', function(){
    var number = $('#phoneNumber').val();
    checkPhoneNumber(number);
  });

  $('#submit').on('click', function(){
    if(flag){
      if(method == 1){
        var number = $('#phoneNumber').val();
        if(checkPhoneNumber(number) && flag){
          $('#numberHint').hide();
          alert('第一步成功!');
        }
      }
      if(method == 2){
        var email = $('#email').val();
        if(checkEmail(email) && flag){
          $('#numberHint').hide();
          alert('第一步成功!');
        }
      }
    }
  });

  //验证方式的切换
  $('#regMethod').on('click', function(){
    if(method == 1){
      $('#show-phone').hide();
      $('#show-email').show();
      $('#phoneNumber').unbind('blur');
      $('#email').on('blur', function(){
        var email = $('#email').val();
        checkEmail(email);
      });
      $(this).text('个人用户可以使用手机号注册>>');
      method = 2;
    } else {
      if(method == 2){
        $('#show-email').hide();
        $('#show-phone').show();
        $('#email').unbind('blur');
        $('#phoneNumber').on('blur', function(){
          var number = $('#phoneNumber').val();
          checkPhoneNumber(number);
        });
        $(this).text('需要通过邮箱注册');
        method = 1;
      }
    }
  });
});
