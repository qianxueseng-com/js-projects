
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	// entry 文件打包， 按数组顺序依次打包
	entry: {
		'bundle-js': './js/index.js',
		'bundle-css': './css/index.scss'
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
			},{
				test: /\.(png|jp(e)?g|bmp|gif)$/,
				loader:'url-loader?limit=8192'
			}, {
				// 以下是bootstrap.css, font-awesome.css 内部需要加载的模块 
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d\.\d\.\d)?$/, 
				loader: 'file-loader'
			}

		]
	},

	plugins: [
		// 将将css等文件集中放入一个样式链表，便于浏览器缓存
		new ExtractTextPlugin('[name].css', {
			allChunks: true
		})
	],

	resolve: {
		root: './js',
		extensions: ['', '.js', '.json']
	}
};

