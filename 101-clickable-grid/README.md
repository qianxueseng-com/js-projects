#总结
- **请周老师review**
- 关于垂直居中的历史遗留问题最后还是用flex解决了
 - align-items: center;
 - justify-content: center;
 
- 用box-sizing将border定在元素中 
- 写了个不伦不类的面向对象（不知道是不是）的代码
 - jquery还没学，简单了看下API，还是要好好努力学啊。
 - 关于生成grid直接 
 
 ```var i;
	for (i = 1; i <= this.n*this.n; i++) {
		$('<div class="grid">'
		+ '<p>' + i + '</p>'
		+ '</div>' ).appendTo('#gridWrap');
	}
 ```

 - 设置了字体大小、grid宽度自动变化
 - 还为了省事，设置了只能输入1~9
- 因为比较渣，然后参考了 @crosskend的代码，再次表示感谢，以及感谢各位前学僧们的帮助。