module.exports = Backbone.Model.extend({
	defaults: {
		title		:  '',
		id			:  '',
		class 		:  'item',
		imageURL	:  '#',
		question	:  '未指定文本',
		btnClass	:  'btn',
		answers		:  [''],
		hrefs		:  ["#"],
		points		:  [0],
		scores 		:  0
	},
	setScores: function(i) {
		var score = this.get("points")[i] || 0;
		this.set({scores: score});
	}
});