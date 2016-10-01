'use strict';

$(function () {
    var GridModelConstrustor = require('./gridModel');
    var GridViewConstrustor = require('./gridView');

    var gridModel = new GridModelConstrustor();
    var gridView = new GridViewConstrustor({model: gridModel});
});
