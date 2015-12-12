var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'bundle-js': './js/script.js',
    'bundle-css': './css/stylesheet.scss'
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
