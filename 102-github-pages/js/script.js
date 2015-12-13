$(document).ready(function() {
	$(".myimg").mouseover(function(){
		$("#myimg2").hide()
		$("#myimg1").show();
	});
	$(".myimg").mouseleave(function(){
		$("#myimg1").hide();
		$("#myimg2").show();
	});
	$(".addEvent").delegate("div", "mouseover", function(){
		$(this).css({
			"transform":"scale(1.2)",
			"-webkit-transform":"scale(1.2)",
			"-moz-transform":"scale(1.2)",
			"-o-transform":"scale(1.2)",
			"-ms-transform":"scale(1.2)"
		});
	});
	$(".addEvent").delegate("div", "mouseleave", function(){
		$(this).css({
			"transform":"scale(1)",
			"-webkit-transform":"scale(1)",
			"-moz-transform":"scale(1)",
			"-o-transform":"scale(1)",
			"-ms-transform":"scale(1)"
		});
	});		
});