'use strict';

$(function () {
    var GridModelConstrustor = require('./gridModel').gridModel;
    var GridViewConstrustor = require('./gridView').gridView;

    var gridModel = new GridModelConstrustor();
    var gridView = new GridViewConstrustor({model: gridModel});
});