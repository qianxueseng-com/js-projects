$(document).ready(function(){
	//选择国家的下拉列表显示与隐藏
	$("#slide").on("click",function (e){
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
	});
	//当鼠标悬浮在option上时，背景颜色为橙色
	$("select").on("mouseover","option", function(e){
			$(this).css("background-color","rgb(255,63,0)");		
	});
	$("select").on("mouseout","option", function(e){
			$(this).css("background-color","white");		
	});
	//select中被选中的背景颜色为橙色
	$(":selected").css("background-color","rgb(255,63,0)");
	//电话号码正则表达式
	var rePhoneNumber = /(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/g;
	//提示输入是否是电话号码
	$("input").change(function(){
		var phoneNumber = $("input").val();
		if(!rePhoneNumber.test(phoneNumber)){
			$("#input p").css("display","inline-block")
		}else{
			$("#input p").css("display","none");
		}
	});
	//滑块验证
	$(funtion(){
		$("slider").slider({
			range:false,
			min:0,
			max:500,
			values:0;
		});
	});
	
	


	$("#nextStep p").mouseover(function(){
		$(this).css("color","white");
	});
	$("#nextStep p").mouseout(function(){
		$(this).css("color","rgb(153,153,153)");
	});
});
