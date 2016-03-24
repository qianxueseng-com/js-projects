var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {

	// entry 文件打包， 按数组顺序依次打包
	entry: {
		'bundle-js': 	'./source/js/main.js',
		'bundle-css': 	'./source/css/main.scss',
		'test': 		'./source/js/test.js'

	},

	// 
	output: {
		// path 打包文件存放的绝对路径, __dirname指当前目录
		path: __dirname + '/dist',

		// filename 打包后的文件名
		filename: './[name].js'
	},

	module : {
		loaders: [{
				test: /\.css$/, 
				loader: ExtractTextPlugin.extract('style-loader','css-loader')
			}, {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader')
			}

		]
	},

	plugins: [
		// 将将css等文件集中放入一个样式链表，便于浏览器缓存
		new ExtractTextPlugin('[name].css', {
			allChunks: true
		}),
		// 遍历 node_modules 自动声明全局变量
		new webpack.ProvidePlugin({
		    "_": "underscore",
		    "$": "jquery",
		    "Backbone": "backbone"
		  })
	],

	resolve: {
		root: './js',
		extensions: ['', '.js', '.json']
	}
};