var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'bundle-js': './js/main.js',
    'bundle-css': './css/main.scss'
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  ]
};
