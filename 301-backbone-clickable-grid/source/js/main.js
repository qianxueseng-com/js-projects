
// ---- MAIN---- //
var app = {};

// ---- Model ---- //
app.Grild = require('./model');

// ---- View ---- //
app.GrildView = require('./view');

// ---- Insitializer ---- //
new app.GrildView({model: new app.Grild()});

