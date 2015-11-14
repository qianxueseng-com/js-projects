function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080'); // not deploy our dev server in production
    }
    return sources;
}

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
    // HtmlPlugin = require('./plugins/html-plugin'),



module.exports = {
    entry: {
        'bundle-js': './js/app.js',
        'bundle-css': './styles/sass/index.scss'
            // 'bundle_css': './sass/HelloForm.scss'
    },
    output: {
    	filename: 'dist/[name].js',
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }, {
            test: /\.(png|jpg|jpeg|ico)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000'
        }]

    },
    plugins: [
        new ExtractTextPlugin('dist/[name].css', {
            allChunks: true
        })
    ]
}
