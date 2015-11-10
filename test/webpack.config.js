// function getEntrySources(sources){
// 	if(process.env.NODE_ENV !== 'production'){
// 		sources.push('webpack-dev-server/client?http://localhost:8080')  // not deploy our dev server in production
// 	}
// 	 return sources;
// }


var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	entry: {
		'helloWorld': ['webpack-dev-server/client?http://localhost:8080',
					 './js/helloWorld',
					]
		// 'bundle_css': './sass/HelloForm.scss'
	},
	output:{
		filename:  'public/[name].js'
	},
	module: {
        loaders: [
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") }
        ]
    },
	 plugins: [
	    new ExtractTextPlugin('public/style.css', {
	      allChunks: true
	    })
	  ]
}