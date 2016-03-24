module.exports= Backbone.View.extend({
	tagName: 'div',
	template: _.template($('#template').html()),
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.show();
		return this;
	},
	initialize: function() {
		this.el.className = this.model.get('class');
		this.render();
		$('#warped').append(this.el);
		this.$el.hide();
	},
	events: {
		"click a": "score"
	},
	score: function(event) {
		var $target = $(event.target),
			$els = this.$el.find('a'),
			index = $els.index($target);
		
		this.model.setScores(index);
	}
});