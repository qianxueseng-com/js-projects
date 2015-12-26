var Grid = function() {}

Grid.prototype.init = function(id) {
	var that = this;

	this.n = null;
	this.id = $(id);
	this.gridinput = $('#gridInput');
	this.gridtips = $('.grid-tips');
	this.gridwrap = $('#gridWrap');

	this.id.click(function() {
		that.changeGrid();
		that.changeStyle();
	})
	this.gridinput.click(function() {
		that.gridinput.val('');
		that.gridtips.html('');
	})
}

Grid.prototype.changeGrid = function() {
	this.gridwrap.html('');

	this.n = parseInt(this.gridinput.val())

	if (this.n > 9 || this.n < 1) {
		this.gridtips.html('Please input the number between 1~9!')
		return false;
	}

	var i;


	for (i = 1; i <= this.n*this.n; i++) {
		var appendGrid = '<div class="grid">'+ '<p>' + i + '</p>'+ '</div>';
		$(appendGrid).appendTo(this.gridwrap);
	}
}

Grid.prototype.changeStyle = function() {
	var grids = $('.grid');
	grids.css('width', this.gridwrap.width() / this.n);

	grids.css('font-size', this.gridwrap.width() / [this.n*2]);

	this.gridwrap.on('click', 'div', function() {
		console.log(this.innerText);
	})
}

var grid = new Grid();
grid.init('#gridSubmit');
