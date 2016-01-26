var setCaptcha = require("./setCaptcha");

function scrollLoading() {
	var $parent = $("#scroll"),
		$target = $parent.children(".square"),
		$bg = $parent.children(".bg"),
		$text = $parent.children(".scroll-text");
		$captcha = $(".captcha");
	// 移动的最大范围
	var MAX_Width = parseInt($parent.css("width"))-parseInt($target.css("width"));

	$target.on("mousedown", function(event) {
		var $self = $(this);
		var reached = false;
		var DisX;
		
		event = event || window.event;
		
		// 获取鼠标点下时，鼠标 与 $target 的相对位置
		DisX = event.clientX - parseInt($target.css("left"));

		// 捕捉 mousemove事件, 防止事件失效
		$(document).on("mousemove", function(event){

			var currentX;
			event = event || window.event;

			if(!reached) {
				currentX = event.clientX - DisX;

				if (currentX < 0) {
					currentX = 0;
				}
				if (currentX > MAX_Width) {
					currentX = MAX_Width;

					// 成功到达边界
					$self.off("mousedown").addClass("loading");
					$text.text("加载中").addClass("active");

					// 显示验证面板
					$captcha.addClass('active');

					// 验证生成
					setCaptcha($captcha);

					// 解除委托在 document 事件上的对应函数
					$(this).off("mousemove");
					$(this).off("mouseup");
				}

				$self.css({left: currentX+"px"});
				$bg.css({width: currentX+"px"});
			}
		});

		// 不要把 up 事件移入 move 事件中， 多重绑定要命啊
		$(document).on("mouseup", function() {
				
			// $target 未到达边界，恢复原样
			$self.animate({left: 0});
			$bg.animate({width: 0});

		});

		//window.event ? (event.cancelBubble = false) : event.stopPropagation();
		// 阻止冒泡，拒绝蓝条， JQ 已封装事件，return false 即可达到 阻止冒泡和默认行为的效果

		return false;
	});
}

module.exports = scrollLoading;