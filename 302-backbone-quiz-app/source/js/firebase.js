var DEFAULT_ROOT_URL = 'backbone-quiz.firebaseIO.com';
var DATA_PATH = 'data';

var Firebase = require("firebase");

var myFirebaseRef = new Firebase(DEFAULT_ROOT_URL);
var myDataRef = myFirebaseRef.child(DATA_PATH);



module.exports = myDataRef;