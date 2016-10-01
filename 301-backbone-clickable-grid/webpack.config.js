var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',

    output: {
        filename: 'main.js'
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            //.js 文件使用 jsx-loader 来编译处理
            {
                test: /\.js$/,
                loader: 'jsx-loader?harmony'
            },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },


    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
};