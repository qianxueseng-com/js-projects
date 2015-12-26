function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080'); 
    }
    return sources;
}

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'bundle-js': './js/index.js',
        'bundle-css': './css/index.scss'

    },
    output: {
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }, {
            test: /\.(png|jpg|jpeg|ico)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
}
