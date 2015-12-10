var canvas = document.getElementById("main");
var context = canvas.getContext("2d");

var number; //用户输入的数字
var w; //方格边长
var space; //方格之间空隙

window.onload = function(){
  //点击“Generate”按钮
  var gen_button = document.getElementById("generate");
  gen_button.onclick = generateHandler;
  //点击“Clear”按钮
  var clear_button = document.getElementById("clear");
  clear_button.onclick = function(){clearCanvas(context,canvas);}
}

//处理“Generate”按钮
var generateHandler = function(){
  clearCanvas(context,canvas);
  number = parseInt(document.getElementById("integer").value);
  w = Math.floor(canvas.width / number) /1.03;
  space = (canvas.width-number*w)/(number+1);
  //判断用户输入数字是否在范围内
  if (0 < number && number < 27){
    drawGrid(context);
  }
  else{
    alert("Plese enter an integer between 1 to 20!");
  }
  //监听用户点击方格的位置
  canvas.addEventListener("mousedown", showPosition, false);
}

//清空canvas
var clearCanvas = function(context,canvas){
  context.fillStyle = "#92A8D1";
  context.fillRect(0,0,canvas.width,canvas.height);
}

//在canvas上画出方格及相应数字
var drawGrid = function(context){
  var i,j;
  for(i=0; i<number; i++){
    for(j=0; j<number; j++){
      //画方格
      context.fillStyle = "#F5B1B1";
      context.fillRect(i*w+(i+1)*space, j*w+(j+1)*space, w, w);
      //画数字
      context.fillStyle = "#92A8D1";
      context.textAlign = "center";
      context.font = (w/3).toString() + "px" + " Arial";
      context.fillText(number*j+i+1, i*w+(i+1)*space+w/2, j*w+(j+1)*space+w/1.6);
    }
  }
}

//找到用户点击方格的位置
var showPosition = function(event){
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  var i,j;
  for(i=0; i<=number; i++){
    for(j=0; j<=number; j++){
      if(x>=i*space+i*w && x<=i*space+(i+1)*w){
        if(y>=j*space+j*w && y<=j*space+(j+1)*w){
          console.log(number*j+i+1);
        }
      }
    }
  }
}
