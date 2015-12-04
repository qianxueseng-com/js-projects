$(document).ready(function(){
	// 选择国家的下拉列表显示与隐藏
	$("#slideDown").on("click", function (e){
		$("#selector select").toggle();
		// 防止click往上冒泡触发document的click事件
		return false;
	});
	$(document).on("click", function (e){
		// 使用jQuery-1.9版本的会报错，改用jquery1.11解决了问题
		// 搜索了下可能是1.9版本的bug
		if(e.target.id == "selector") {
			return false;
		}else {
			$("#selector select").hide();
		}
		console.log("click!");
	});
	
	// 当鼠标悬浮在option上时，背景颜色为橙色
	$("select").on("mouseover", "option",  function(e){
			$(this).css("background-color", "rgb(255,63,0)");	
	});	
	$("select").on("mouseout", "option", function(e){
			$(this).css("background-color", "white");		
	});

	// select中被选中显示
	$("select").on("click", "option", function(e){
		$("#slideDown p").text($(this).text());
		$(this).css("background-color", "rgb(255,63,0)");
	});

	// 电话号码正则表达式
	var rePhoneNumber = /(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/g;
	// 提示输入是否是电话号码
	$("input").change(function(){
		var phoneNumber = $("input").val();
		var formInput = $("form input");
		var formAlert = $("#alert");
		if(!rePhoneNumber.test(phoneNumber)){
			formAlert.addClass("notCorrect");
			formInput.addClass("notCorrect");
		}else{
			formAlert.removeClass("notCorrect");
			formInput.removeClass("notCorrect");
		}
	});

	// 滑块验证
	var i = 0, j=0, k=0;
	var imgRec = $("#img");
	var div1 = $("#div1");
	var div2 = $("#div2");
	var confirmPic = $("#confirmPic");
	imgRec.on("mousedown", function(e){
		imgRec.css("cursor", "move");
		var offset = $(this).offset();
		// 鼠标与外层div的相对位置
		var x = e.clientX - offset.left;
	    // var y = e.clientY - offset.top;
		var proveOffset = $("#prove").offset();
		var proveX = proveOffset.left;
		// var proveY = proveOffset.top;
		console.log("mousedown"+i++);
		$(document).on("mousemove", function(ev){
			var _x = ev.clientX - x - proveX;
			// var  _y = ev.clientY - y - proveY;
			// 阻止默认行为，非常重要！
			ev.preventDefault();
			if(_x>=0 && _x<=206){
				imgRec.css("left", _x);
				div1.css("width", _x);
				console.log("mousemove" + (j++) + "left:"+_x);
			}
		});
		$(document).on("mouseup", function(e){
				imgRec.css("cursor", "default");
				$(this).off("mousemove");
				if(imgRec.css("left") != "206px"){
					imgRec.animate({left:"0px"}, 500);
					div1.animate({width:"0px"}, 500);
				}else {
					imgRec.off("mousedown");
					div2.text("验证通过");
					div2.css("color", "white");
					imgRec.attr("src", "./rt2.png");
					confirmPic.fadeIn(500);
					confirmPic.on("click" , function (eve){
						var x = eve.clientX;
						var y = eve.clientY;
						if(x>640 && x<711 && y>298 && y<345) {
							alert("验证通过！");
							confirmPic.fadeOut(500);
						}
					});
				}
				console.log("mouseup"+k++);
				//解除mouseup的绑定
				$(document).off("mouseup");
		});
	});
	// 下一步的效果
	$("#nextStep p").mouseover(function(){
		$(this).css("color", "white");
	});
	$("#nextStep p").mouseout(function(){
		$(this).css("color", "rgb(153,153,153)");
	});
});
