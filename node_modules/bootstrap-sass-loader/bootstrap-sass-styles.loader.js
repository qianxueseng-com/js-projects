var partials = [
  'mixins',

  'normalize',
  'print',
  'glyphicons',

  'scaffolding',
  'type',
  'code',
  'grid',
  'tables',
  'forms',
  'buttons',

  'component-animations',
  'dropdowns',
  'button-groups',
  'input-groups',
  'navs',
  'navbar',
  'breadcrumbs',
  'pagination',
  'pager',
  'labels',
  'badges',
  'jumbotron',
  'thumbnails',
  'alerts',
  'progress-bars',
  'media',
  'list-group',
  'panels',
  'wells',
  'responsive-embed',
  'close',

  'modals',
  'tooltip',
  'popovers',
  'carousel',

  'utilities',
  'responsive-utilities'
];
var path = require('path');
var bootstrapSassPath = require('./bootstrapSassPath');
var logger = require('./logger');

function addImportReturnDependency(loader, config, propertyName) {
  var fileNameResolved;
  var fileName = config[propertyName];
  if (fileName && fileName.length > 0) {
    fileNameResolved = path.relative(loader.context, fileName);

    logger.verbose(config, 'fileName for %s: %s', propertyName, fileNameResolved);
    loader.addDependency(fileNameResolved);
    return '@import \'' + fileNameResolved + '\';\n';
  }
}

module.exports = function(content) {
  var source;
  var config = this.exec(content, this.resourcePath);
  var pathToBootstrapSass = bootstrapSassPath.getPath(this.context);
  var relativePathToBootstrapSass = path.relative(this.context, pathToBootstrapSass);
  var start = '';
  // This needs to be relative
  var iconFontPath = '$icon-font-path: \'' + path.join(relativePathToBootstrapSass, 'fonts/bootstrap/') + '\';';
  this.cacheable(true);
  logger.verbose(config, 'bootstrap-sass location: %s', relativePathToBootstrapSass);
  logger.verbose(config, 'Setting: %s', iconFontPath);

  if (config.preBootstrapCustomizations) {
    start += addImportReturnDependency(this, config, 'preBootstrapCustomizations');
  }
  start +=
    // Absolute paths as these are created at build time.
    '@import \'' + path.join(relativePathToBootstrapSass,
      'stylesheets/bootstrap/variables') + '\';\n' + iconFontPath + '\n';

  if (config.bootstrapCustomizations) {
    start += addImportReturnDependency(this, config, 'bootstrapCustomizations');
  }

  source = start + partials.filter(function(partial) {
      return config.styles[partial];
    }).map(function(partial) {
      return '@import \'' + path.join(relativePathToBootstrapSass, 'stylesheets/bootstrap',
          partial) + '\';';
    }).join('\n');

  if (config.mainSass) {
    source += '\n' + addImportReturnDependency(this, config, 'mainSass');
  }

  source = source.replace(/\\/g, '/');

  logger.debug(config, 'Generated scss file is:\n' + source);

  return source;
};
