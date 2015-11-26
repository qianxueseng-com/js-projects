module.exports = {
	entry: {
		index: [ 'webpack-dev-server/client?http://localhost:8080',
		'entry.js'],
	},
	output: {
		filename: 'public/[name].js'
	}
}