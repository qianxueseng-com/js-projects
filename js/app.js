require('./hello.js');
require('./world.js');
// // require('./bootstrap.min.js')
// require('../styles/sass/style.scss');
// // require('../sass/bootstrap.min.css');
// require('bootstrap-sass-loader');
// // require('../sass/_bootstrap.scss');
var icon_front = document.getElementById('front-intro-icon');
icon_front.src = require('../assets/icon_front.jpeg');

var icon_back = document.getElementById('back-intro-icon');
icon_back.src = require('../assets/icon_back.png');