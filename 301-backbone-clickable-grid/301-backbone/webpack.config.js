module.exports = {
  entry: './src/js/main.js',

  output: {
    filename: 'main.js',
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.js$/,
        exclude: /(node_modules|bower_components)\//,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
