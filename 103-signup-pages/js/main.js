var $box = $("#slide-box"),
	$slide_bg = $("#slide-bg"),
	$scale_text = $(".scale_text"),
	$captcha = $(".captcha-area"),
	$btn_next = $("#btn-next"),
	$captcha_img = $(".captcha-img > img"),
	CAPTCHA_COUNT = 3,
	CLICK_RANGE = 8,
	pid = 0,




	slideboxInit = function() {
		$(document).off("mousemove")
		$box.animate({
			left: "0px"
		});
		$slide_bg.animate({
			width: "0px"
		});
	},

	showImg = function() {
		$scale_text.css("color", "#fff").text("请点击图中");
		getCaptcha()	
	},

	reloadImg = function() {
		do{
			var tmp = Math.floor( 100 * Math.random()) % CAPTCHA_COUNT + 1;
		}while( tmp == pid);

		pid = tmp;
	}

	getCaptcha = function() {
		0 === pid && (pid = Math.floor( 100 * Math.random()) % CAPTCHA_COUNT + 1 );
		var img = "assets/captcha0" + pid + ".jpg";
		var json = 'assets/captcha0' + pid + ".json";
		var captcha;

		$.getJSON(json).done(function(result){
			var n = result.count,
				d = i.data,
				idx = Math.floor( 100 * Math.random()) % n,
				v = d[idx].value;
			captcha.x = d[idx].x,
			captcha.y = d[idx].y;
			$(".captcha-hint").show().text("请点击图中\"" + v + "\"字");
		})

		$captcha_img.attr("src", "assets/captcha1.png");
		$(".captcah-reload").on("click", reloadImg);
		$captcha_img.attr("src", img).on("click", function(e){
			checkCaptcha(e, captcha);
		});
		$captcha.show();
	},

	checkCaptcha = function( event, captcha ) {
		if(Math.abs( event.offsetX - captcha.x ) <= CLICK_RANGE && Math.abs( event.offsetY - captcha.y) <= CLICK_RANGE){
			$(this).off("click");
			captchaVerified();
		}else{
			console.log("验证码错误"), reloadImg();
			// $(".captcha-hint").show().text("验证码错误，请重试！"), reloadImg();
		}
	},

	captchaVerified = function(){
		$captcha.hide();
		$(".captcha-hint").text("验证成功");
		$btn_next.removeClass("btn-disabled").addClass("btn-enabled");
	},

	moveSlidebox = function() {
		$box.on("mousedown", function(e){
			var t = e.clientX - this.offsetLeft;
			$(document).on("mousemove", function(e){
				var i = e.clientX - t;
				0 > i && (i = 0),
				i > 260 && (i = 260, 
					$(document).off("mousemove").off("mouseup"),
					$box.off("mousedown"), setTimeout(function(){
					showImg()}, 100));
				$box.css("left", i + "px");
				$slide_bg.css("width", i + "px");
				// console.log(i + "px" );
				
			})
		});
		$(document).on("mouseup",function(){
			slideboxInit();
		})
	};

$(document).ready(function(){
	moveSlidebox();
});

