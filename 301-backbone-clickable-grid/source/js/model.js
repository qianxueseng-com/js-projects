

module.exports = Backbone.Model.extend({
	defaults: {
		rows: 3
	},
	validate: function(attrs, option) {
		var row = attrs.rows-0,
			error = '';
		if(isNaN(row)) {
			error = '输入值不合法，请输入数字';
		} else {

			if (row < 1) {
				error = '输入值小于0，请输入大于0小于20的数值';
			}
			if (row > 20) {
				error = '输入值大于20，请输入小于20大于0的数值';
			}
		}

		if (error) {
			return error;
		}
	}
});