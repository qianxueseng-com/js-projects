function getEntrySources(sources){
	if(process.env.NODE_ENV !== 'production'){
		sources.push('webpack-dev-server/client?http://localhost:8080')  // not deploy our dev server in production
	}
}


var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	entry: {
		helloWorld: ['webpack-dev-server/client?http://localhost:8080',
					 './js/helloWorld',
					]
	},
	output:{
		filename:  'public/[name].js'
	} 
	module: {
		loaders: [
			{
				// test: /\.scss$/,
				// loaders: ['style', 'css', 'sass']
					test: /.\css$/,
					loader: "style!css"
			}
		]
	},
	// plugins: [
	// 	new ExtracTextPlugin('public/style.css',{
	// 		allChunks: true;
	// 	})
	// ]
}