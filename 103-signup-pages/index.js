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
	/***
	$("selector").on("mouseover", "option", function(){
		$("option").css("background-color","rgb(255,64,0)");
	});
	***/

});
