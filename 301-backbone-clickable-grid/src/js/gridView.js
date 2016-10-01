'use strict';

// 引入辅助函数模块
var tool = require('./tool');

module.exports = Backbone.View.extend({
    el: $('#container'),
    // 引入定义在html文件中的模板
    template: _.template($('#template').html()),

    // 初始化时监听模型变动，同时运行一次render
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.model.on('invalid', this.showMessage, this);
        this.render();
    },

    render: function () {
        var rowNum = this.model.get('rowNum');
        var fontSize = rowNum < 32 ? (300 / rowNum) + 'px' : '1px';
        // 引入模板
        var html = this.template({rowNum: rowNum});
        // 生成格子
        this.$el.find('#box').html(html);
        // 根据格子数调整字体大小
        this.$el.find('#box').css('fontSize', fontSize);
        // 根据方块行数决定容器宽度是否扩展
        if (rowNum > 32) {
            this.$el.addClass('max-width');
        } else {
            this.$el.removeClass('max-width');
        }
        // 使input文本被选中
        this.letInputSelect(this.$el.find("input#row-num"));
    },

    events: {
        // 监听的元素必须在el范围内
        // 监听输入变动
        'change input#row-num': 'inputChanged',
        // 监听输入框按键动作
        'keyup input#row-num': 'inputKeyUp',
        // 监听格子上的点击事件
        'click .item': 'printGridNum',
        // 监听「自动演示」按钮的点击事件
        'click button.auto-play': 'autoPlay'
    },

    printGridNum: function (event) {
        tool.printElementText($(event.target));
    },

    inputChanged: function (event) {
        // 使用num保证输入框为空时网格内不会没有任何显示
        var num = $(event.target).val() ? $(event.target).val() : 1;
        var data = {rowNum: num};
        // 只有在数据确实发生变动后才写入新数据
        if (num !== parseInt(this.model.getRowNum)) {
            this.model.set(data, {validate: true});
        }
    },

    inputKeyUp: function (event) {
        // 数字键、小键盘数字键、退格键才会触发inputChanged
        if (tool.isNumKey(event.keyCode, {backspaceKey: true})) {
            this.inputChanged(event);
        }
    },

    // 使输入框总延迟500ms后被选中，方便修改数值的同时，不影响快速输入多位数字
    letInputSelect: function ($element) {
        tool.runAfter(tool.letElementSelected, 500, $element);
    },

    // 行数自动递增到指定值后再递减
    autoPlay: function () {
        var num = 0;
        var maxNum = 35;
        var delay = 180;
        var maxCount = 65;
        var step = 1;
        var data = {};

        function _play(thisElem) {
            // 行数达到上限时开始递减
            if (num === maxNum) {
                step = -1;
            }
            num += step;
            data = {rowNum: num};
            thisElem.model.set(data);
            thisElem.$el.find('input#row-num').val(num);
        }

        tool.runRepeat(_play, delay, maxCount, this);
    },

    showMessage: function (model, message) {
        tool.changeElementText(this.$el.find('.message'), message);
        this.clearMessageAfter();
    },

    // 2.5秒后清空消息区
    clearMessageAfter: function () {
        tool.runAfter(tool.changeElementText, 2500, this.$el.find('.message'), '');
    }
});
