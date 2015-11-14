var scripts = [
  'transition',
  'alert',
  'button',
  'carousel',
  'collapse',
  'dropdown',
  'modal',
  'tooltip',
  'popover',
  'scrollspy',
  'tab',
  'affix'
];

var bootstrapSassPath = require('./bootstrapSassPath');
var path = require('path');

module.exports = function() {
};


// Create a list of require('path/to/bootstrap.js');
module.exports.pitch = function(configPath) {
  var pathToBootstrapSass = bootstrapSassPath.getPath(this.context);
  var config = require(configPath);
  this.cacheable(true);
  return scripts.filter(function(script) {
    return config.scripts[script];
  }).map(function(script) {
    var pathToBootstrapJsFile = JSON.stringify(path.join(pathToBootstrapSass, 'javascripts',
        'bootstrap', script));
    return 'require(' + pathToBootstrapJsFile + ');';
  }).join('\n');
};
