

module.exports= Backbone.Collection.extend({
	model: require('./model'),

	// ---- 计算总得分 ---- //
	calculate: function () {
		var scores = 0;
		
		this.each(function(model) {
			scores +=(model.get('scores')-0);
		});
		return scores;
	}

});