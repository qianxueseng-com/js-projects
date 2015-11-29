module.exports = {
	watch: true,
	entry: {
		index: [ 'webpack-dev-server/client?http://localhost:8080',
		'./entry.js'],
	},
	output: {
		path: require('path').resolve('dist/'),
		filename: 'dist/[name].js'
	}
}