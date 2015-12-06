var Grid = function() {}

Grid.prototype.init = function(id) {
	var that = this;
	this.n = null;
	this.id = $(id);
	this.id.click(function() {
		that.changeGrid();
		that.changeStyle();
	})
	$('#gridInput').click(function() {
		$('#gridInput').val('');
		$('.grid-tips').html('');
	})
}

Grid.prototype.changeGrid = function() {
	$('#gridWrap').html('');

	this.n = parseInt($('#gridInput').val())

	if (this.n > 9 || this.n < 1) {
		$('.grid-tips').html('Please input the number between 1~9!')
		return false;
	}

	var i;
	for (i = 1; i <= this.n*this.n; i++) {
		$('<div class="grid">'
		+ '<p>' + i + '</p>'
		+ '</div>' ).appendTo('#gridWrap');
	}
}

Grid.prototype.changeStyle = function() {
	$('.grid').css('width', $('#gridWrap').width() / this.n);

	$('.grid').css('font-size', $('#gridWrap').width() / [this.n*2]);

	$('#gridWrap').delegate('div', 'click', function() {
		console.log(this.innerText);
	})
}

var grid = new Grid();
grid.init('#gridSubmit');
