window.onload = function(){
  var gen_button = document.getElementById("generate");
  gen_button.onclick = generateHandler;
}

var generateHandler = function(){
  var canvas = document.getElementById("main");
  var context = c.getContext("2d");
  var number = document.getElementById("integer").value;
  if (0 < number && number < 21){
    drawGrid(number,canvas);
  }
  else{
    alert("Plese enter an integer between 1 to 20!");
  }
}

var drawGrid = function(number,canvas){
  alert("success")
}
