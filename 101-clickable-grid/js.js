window.onload = function(){
	oSure.addEventListener("click", function(){
		update();
	});
};
var oNum = document.getElementById("num"),
	oSure = document.getElementById("sure"),
	oGrid = document.getElementById("grid"),
	oResult = document.getElementById("result");
function update(){
	var rowNum = oNum.value;
	for(var i=0; i<rowNum; i++){
		var oRow = document.createElement("div");
		oRow.setAttribute("class","row");
		oGrid.appendChild(oRow);
		for(var j=0; j<rowNum;j++){
			var oItem = document.createElement("div");
			oItem.setAttribute("class","item");
			oItem.setAttribute("cell" , i*rowNum+j+1);
			oRow.appendChild(oItem);
			oItem.addEventListener("click", function(){
				oResult.innerHTML= this.attributes["cell"].value;
			});
		};
	};
};

