require('./hello.js');
require('./world.js');
// require('./bootstrap.min.js')
require('../sass/style.scss');
// require('../sass/bootstrap.min.css');
require('bootstrap-sass-loader');
// require('../sass/_bootstrap.scss');
var icon = document.getElementById('intro-icon');
icon.src = require('../assets/icon.jpeg');