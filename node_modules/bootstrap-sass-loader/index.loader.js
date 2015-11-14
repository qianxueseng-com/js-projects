var logger = require('./logger');

module.exports = function() {
};

module.exports.pitch = function(remainingRequest) {
  var result;
  var jsLoaderCommand;
  var styleLoaderCommand;
  var styleLoader;
  var config;
  var msg;

  // Webpack 1.7.3 uses this.resourcePath. Leaving in remaining request for possibly older versions
  // of Webpack
  var configFilePath = this.resourcePath || remainingRequest;
  this.cacheable(true);

  if (!configFilePath || configFilePath.trim() === '') {
    msg = 'You specified the bootstrap-sass-loader with no configuration file. Please specify' +
      ' the configuration file, like: \'bootstrap-sass!./bootstrap-sass.config.js\' or use' +
      ' require(\'bootstrap-sass-loader\').';
    console.error('ERROR: ' + msg);
    throw new Error(msg);
  }

  config = require(configFilePath);
  styleLoader = config.styleLoader || 'style-loader!css-loader!sass-loader';
  logger.verbose(config, 'styleLoader: %s', styleLoader);

  styleLoaderCommand = 'require(' + JSON.stringify('-!' + styleLoader + '!' +
      require.resolve('./bootstrap-sass-styles.loader.js') + '!' + configFilePath) + ');';
  jsLoaderCommand = 'require(' + JSON.stringify('-!' +
      require.resolve('./bootstrap-sass-scripts.loader.js') + '!' + configFilePath) + ');';
  result = [styleLoaderCommand, jsLoaderCommand].join('\n');
  return result;
};
