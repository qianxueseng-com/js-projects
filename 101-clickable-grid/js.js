/* Event delegation.
** Event delegation allows us to attach a single event listener, to a parent element, 
** that will fire for all descendants matching a selector, whether those descendants exist now or are added in the future.
** For instance, if we were to click our newly added item, nothing would happen. 
** This is because of the directly bound event handler that we attached previously. 
** Direct events are only attached to elements at the time the .on() method is called. 
** In this case, since our new item did not exist when .on() was called, it does not get the event handler.
**
** Event Propagation
** Any time one of our item tags is clicked, a click event is fired for that item, 
** and then bubbles up the DOM tree, triggering each of its parent click event handlers.
*/

$(function(){
	generate();
	clear();
	logNumber();
});

function generate() {
	$("#generateButton").on("click", function() {
		var value = parseInt($("#size").val());
		if(value > 20 || value < 1) {
			alert("Please select a number betweeen 1 and 20!");
			return;
		}
		var content = "";
		var num = 1;
		for(var i = 1; i <= value; i++) {
			for(var j = 1; j <= value; j++) {
				if(j === 1) {
					content += "<div class='row'><div class='grid'>" + num +"</div>";
				} else if(j === value) {
					content += "<div class='grid'>" + num +"</div></div>";
				} else {
					content += "<div class='grid'>" + num +"</div>";
				}
				num++;
			}
		}
		$("#grids").html(content);
	});
}

//Event delegation
function logNumber() {
	$("#grids").on("click", ".grid", function (){
		var value = $(this).text();
		console.log("You click ", value);
	});
}

function clear() {
	$("#clearButton").on("click", function() {
		$("#grids").html(" ");
	});
}