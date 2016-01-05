var btn=document.getElementsByClassName("comfirmButton")[0];
var container=document.getElementById("container");
var anum=document.getElementById("num");
var item=document.getElementsByClassName("item");
var word=document.getElementById("word");

btn.addEventListener("click",function(){update()});

function update(){
	var num=anum.value;
	var value=parseInt(num,10);
	container.innerHTML="";
	for (var i=0;i<value;i++){
		var row=document.createElement("div");
		row.setAttribute("class","row")
		container.appendChild(row);
		for (var j=0;j<value;j++){
			var newItem=document.createElement("div");
			newItem.setAttribute("class","item");
			newItem.setAttribute("name", i*value+j+1);
			newItem.addEventListener("mouseover", function(){var self=this;show(self)});
			newItem.addEventListener("mouseout", function(){hide()});
			row.appendChild(newItem);
		}
	};
	function show(self){
		var text=self.getAttribute("name");
		var textNode=document.createTextNode(text);
		word.appendChild(textNode);
    }
	function hide(){
		word.innerHTML="";
    }
}

