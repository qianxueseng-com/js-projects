<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" Content="Text/html; charset = utf-8" >
	</head>
	<body id="body">
		<script type="text/javascript">
			var element = document.getElementById("body");
			var n = 10;
			for(var i=0; i<n; i++){
				for(var j=1; j<=n; j++){
					var para  = document.createElement("div");
					para.style.color = "red";
					para.style.height = "80px";
					para.style.width = "80px";
					para.style.background = "blue";
					para.style.float = "left";
					para.value = i*10+j;
					para.onclick = function() {
						console.log(this.value);
					}
			 		var node  = document.createTextNode(i*10+j);
			 		para.appendChild(node);
					element.appendChild(para);
					if(j == 1) {
						para.style.clear = "left";
					}
				}
			}
		 	
		</script>
	</body>

</html>
