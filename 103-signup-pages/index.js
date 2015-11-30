$(document).ready(function(){
	//选择国家的下拉列表显示与隐藏

	$("#slideDown").on("click",function (e){
		$("#selector select").toggle();
		//必须加这一句，不然报错（原因不明?）
		return false;
		
	});
	$(document).on("click",function (e){
		//使用jQuery-1.9版本的会报错，改用jquery1.11解决了问题
		//搜索了下可能是1.9版本的bug
		if(e.target.id == "#slide") {
			return false;
		}else {
			$("#selector select").hide();
		}
		console.log("click!");
	});

	//当鼠标悬浮在option上时，背景颜色为橙色
	$("select").on("mouseover","option", function(e){
			$(this).css("background-color","rgb(255,63,0)");	
	});	
	$("select").on("mouseout","option", function(e){
			$(this).css("background-color","white");		
	});

	//select中被选中显示
	$("select").on("click","option",function(e){
		$("#slideDown p").text($(this).text());
		$(this).css("background-color","rgb(255,63,0)");
	});

	//电话号码正则表达式
	var rePhoneNumber = /(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/g;
	//提示输入是否是电话号码
	$("input").change(function(){
		var phoneNumber = $("input").val();
		if(!rePhoneNumber.test(phoneNumber)){
			$("form #alert").css("display","inline-block")
			$("form input").css("border-color","rgb(255,63,0)");
		}else{
			$("form #alert").css("display","none");
			$("form input").css("border-color","rgb(220,220,220)");
		}
	});

	//滑块验证
	var i = 0, j=0, k=0;
	$("#img").on("mousedown",function(e){
		$("#img").css("cursor","move");
		var offset = $(this).offset();
		//鼠标与外层div的相对位置
		var x = e.clientX - offset.left;
	   // var y = e.clientY - offset.top;
		var proveOffset = $("#prove").offset();
		var proveX = proveOffset.left;
		//var proveY = proveOffset.top;
		console.log("mousedown"+i++);
		$(document).on("mousemove",function(ev){
			var _x = ev.clientX - x - proveX;
			//var  _y = ev.clientY - y - proveY;
			 //阻止默认行为，非常重要！
			ev.preventDefault();
			if(_x>=0 && _x<=206){
				$("#img").css("left",_x);
				$("#div1").css("width",_x);
				console.log("mousemove"+(j++)+"left:"+_x);
			}
		});
		$(document).on("mouseup",function(e){
				$("#img").css("cursor","default");
				$(this).off("mousemove");
				if($("#img").css("left") != "206px"){
					$("#img").animate({left:"0px"},500);
					$("#div1").animate({width:"0px"},500);
				}else {
					$("#img").off("mousedown");
					$("#div2").text("验证通过");
					$("#div2").css("color","white");
					$("#img").attr("src","./rt2.png");
					$("#confirmPic").fadeIn(500);
					$("#confirmPic").on("click" , function (eve){
						var x = eve.clientX;
						var y = eve.clientY;
						if(x>640 && x<711 && y>298 && y<345) {
							alert("验证通过！");
							$("#confirmPic").fadeOut(500);
						}
					});
				}
				console.log("mouseup"+k++);
				//解除mouseup的绑定
				$(document).off("mouseup");
		});
	});
	//下一步的效果
	$("#nextStep p").mouseover(function(){
		$(this).css("color","white");
	});
	$("#nextStep p").mouseout(function(){
		$(this).css("color","rgb(153,153,153)");
	});
});
