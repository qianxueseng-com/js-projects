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
            //.js �ļ�ʹ�� jsx-loader �����봦��
            {
                test: /\.js$/,
                loader: 'jsx-loader?harmony'
            },
            //ͼƬ�ļ�ʹ�� url-loader ������С��8kb��ֱ��תΪbase64
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