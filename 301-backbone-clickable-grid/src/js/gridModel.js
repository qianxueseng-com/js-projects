'use strict';

module.exports = {
    gridModel: Backbone.Model.extend({
        defaults: {
            rowNum: 5
        },

        validate: function (attrs) {
            if (attrs.rowNum < 1 || attrs.rowNum > 50) {
                return '数字只能在1-50范围内，不然不方便显示~';
            }
        },

        getRowNum: function () {
            return this.get('rowNum');
        }
    })
};