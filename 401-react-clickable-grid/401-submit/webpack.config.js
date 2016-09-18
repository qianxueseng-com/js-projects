module.exports = {
  // read this js file to start
  entry: './src/js/index.js',

  // generate the output js file with the following options
  output: {
    // this is used to generate URLs
    publicPath: 'http://localhost:8080/',
    filename: 'build/bundle.js'
  },

  // generate source map
  devtool: 'source-map',

  module: {
    // a list of loaders: https://webpack.github.io/docs/list-of-loaders.html
    loaders: [

      // transforms JSX and ES6(ES2015) into normal js files
      // use babel-loader for all *.js and *.jsx files
      // using two presets: react, es2015
      // https://babeljs.io/docs/plugins/
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
        ]
      },

      // load CSS
      // the order is important here
      // style loader takes CSS and actually inserts it into the page
      //     so that the styles are active on the page
      // css loader takes a CSS file and returns the CSS with
      //     imports and url(...) resolved via webpack's require functionality
      //     it doesn't actually do anything with the returned CSS
      // sass loader converst sass to css files
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style',
          'css',
          'sass'
        ]
      },

      // load images
      // url loader works like the file loader, but can return a Data Url
      //     if the file is smaller than a limit.
      // img loader minifis PNG, JPEG, GIF and SVG images with imagemin
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url',
          'img'
        ]
      }
    ]
  }
};
