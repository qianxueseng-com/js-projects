var fs = require('fs');
var path = require('path');

function bootstrapNotFound() {
  var msg = 'Could not find path to bootstrap-sass. Check to see that it is in a parent ' +
    'directory of config file containing node_modules/bootstrap-sass';
  console.error('ERROR: ' + msg);
  throw new Error(msg);
}

function createTestParentPath(configPath, nLevelsUp) {
  var parentPath;
  var i;
  var levelsUp = configPath;
  for (i = 0; i < nLevelsUp; i++) {
    levelsUp += '/..';
  }
  parentPath = path.resolve(levelsUp);
  if (parentPath === '/') {
    bootstrapNotFound();
  }

  return path.resolve(path.join(levelsUp, 'node_modules', 'bootstrap-sass'));
}

module.exports = {
  getPath: function(configPath) {
    var bootstrapSassParentPath;
    var i = 0;
    do {
      bootstrapSassParentPath = createTestParentPath(configPath, i);
      i += 1;
    } while (!fs.existsSync(bootstrapSassParentPath) && i < 10);

    if (i === 10) {
      bootstrapNotFound();
    }
    return path.join(bootstrapSassParentPath, 'assets');
  }
};
