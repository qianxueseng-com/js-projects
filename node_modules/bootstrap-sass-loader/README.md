bootstrap-sass-loader
=================

Bootstrap configuration and loading package for webpack, using the npm packages `bootstrap-sass` and `sass-loader`.

Install from [bootstrap-sass-loader on npm](https://www.npmjs.com/package/bootstrap-sass-loader).

If you're looking for the less version, see [bootstrap-webpack](https://github.com/gowravshekar/bootstrap-webpack). This project
is based on that version for less, with some minor differences, the main one being how the configuration file specifies
two sass files for customization.

In a nutshell:

1. You've got the sass-loader to process Sass files to CSS.
2. The npm bootstrap-sass package places the bootstrap files in `/node_modules/bootstrap-sass/assets`.
3. You could simply create your own sass file to pick up bootstrap from this location, and you could require the js
   files here for the Bootstrap JavaScript code. See the [sass-loader](https://github.com/jtangelder/sass-loader) for
   instructions on configuring the directories.
4. Or you could use this loader and load a js file that configures Bootstrap.

You can find an example of using this:

[shakacode/bootstrap-sass-loader-example](https://github.com/shakacode/bootstrap-sass-loader-example)

Note, `bootstrap-sass` must be installed locally inside of `../node_modules` or a parent directories `node_modules`
directory relative to the loaded config file.

Bootstrap Version
---
The version of sass-bootstrap used is listed in peerDependencies, so you should be able to use whichever version you like.

Simply specify that version of `bootstrap-sass` in your `package.json`, like this:

    "bootstrap-sass": "~3.3.1"


Usage
-----

### 1.a Complete Bootstrap

To use the complete bootstrap package including styles and scripts with the default settings:

``` javascript
require("bootstrap-sass-loader");
```

The disadvantage to using this setup is that you can't:

1. Customize the bootstrap variables: [Bootstrap Customization](http://getbootstrap.com/customize/)
2. You can't use the bootstrap variables for your own sass stylesheets.

### 1.b Customized Bootstrap

1. Copy the file `bootstrap-sass.config.js` to your project. You will specify the file path in the `require` statement.
2. Open that file to customize the location of a file for any Bootstrap variable overrides (`preBootstrapCustomizations`
   and `bootstrapCustomizations`, and your main Sass file that can depend on Bootstrap variables, plus your customizations.
   Any of these 3 files are optional. You may also remove any Sass or Js modules that you don't need.

Next, you should specify this as an entry point:

```
module.exports = {
  entry: [
    "bootstrap-sass!./path/to/bootstrap-sass.config.js"
  ]
```

Or a dependency within a file, like you'd specify other webpack dependencies:

```javascript
require("bootstrap-sass!./path/to/bootstrap-sass.config.js");
```


#### `bootstrap-sass.config.js`

Here's a sample configuration file. The file included in the [bootstrap-sass-loader git repo](https://github.com/shakacode/bootstrap-sass-loader/blob/master/bootstrap-sass.config.js)
has many more options. The two customization files, `bootstrapCustomizations`
and `mainSass` are optional.

``` javascript
module.exports = {
  bootstrapCustomizations: "./bootstrap-customizations.scss",
  mainSass: "./main.scss", // path to your main SASS file (optional)
  verbose: true, // print out your custom files used
  debug: false, // print out the full generated scss file
  styleLoader: "style-loader!css-loader!sass-loader", // see example for the ExtractTextPlugin
  scripts: {
    // add every bootstrap script you need
    'transition': true
  },
  styles: {
    // add every bootstrap style you need
    "mixins": true,

    "normalize": true,
    "print": true,

    "scaffolding": true,
    "type": true,
  }
};
```

### Font Configuration
Bootstrap use some fonts. You need to configure the correct loaders in your `webpack.config.js`.

Take a look at example https://github.com/shakacode/react-webpack-rails-tutorial which uses custom fonts with the
bootstrap-sass-loader. You'll need to create define a font-face like this:

```scss
@font-face {
  font-family: 'OpenSans-Light';
  src: url('assets/fonts/OpenSans-Light.ttf') format('truetype');
}
```

### Example Loaders Configuration:

``` javascript
module.exports = {
  module: {
    loaders: [
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  }
};
```

## extract-text-plugin Notes
* If you don't run webpack like this, you might get a very obscure error:
```
PATH=$(npm bin):$PATH webpack --config webpack.rails.config.js
```

Alternate, you can put $(npm bin) in your path. Basically if you run `type webpack` and the path is your global one, then
you may have issues.

* You can configure the output file of the created CSS file by using a relative path to the output directory. For example:
```
  plugins: [
    new ExtractTextPlugin("../stylesheets/bootstrap-and-customizations.css")
  ]
```

### Based on:
* [bootstrap-webpack](https://github.com/bline/bootstrap-webpack).
* DylanLukes/bootstrap-sass-webpack

# Known Issues
1. Automatic Dependency loading is currently problematic. If you "touch" either of the customization files listed in
   your config file (bootstrapCustomizations, mainSass), then that will trigger a rebuild of the Sass files. This is a
   known issue with the sass-loader. I work around this issue by "touching" one of the 3 sass config files.


Testing Changes in the Bootstrap Sass Loader
=======================================================
1. See this article [Debugging NodeJs and Webpack Loaders](http://forum.railsonmaui.com/t/debugging-nodejs-and-webpack-loaders/142)
2. Clone both this project and https://github.com/shakacode/bootstrap-sass-loader-example
3. Use the npm link command per step #1 (see article)
4. Be sure to run `npm i bootstrap-sass` in the directory where you have the `bootstrap-sass-loader`. This is because
   the location of bootstap-sass is found relative to the `bootstrap-sass-loader` and if you linked it and it's not not
   there, then you'll bet this error: "Error: Could not find path to bootstrap-sass. Check to see that it's in a parent
   directory of config file containing node_modules/bootstrap-sass".

Then in the bootstrap-sass-loader-example project:

1. Make some changes in the loader, put in some print statements maybe, then run `gulp webpack` to invoke the loader.
2. Then run `gulp build` and open the resulting file dist/index.html in the browser.
3. Run `gulp test` to confirm the changes work.


Pull requests are welcome!

For more info see: http://www.railsonmaui.com and http://forum.railsonmaui.com.

Code Inspection and ESLint
======================================================
1. If using Webstorm import the inspection file in /jetbrains-inspection and inspect all files
2. Command line: `eslint .`

Publishing to NPM
======================================================
1. Install the [release-it npm](https://github.com/webpro/release-it) program
2. Merge fixes to master
3. Run command `release-it`
4. Take defaults, except for last one to publish changes (answer Y)
