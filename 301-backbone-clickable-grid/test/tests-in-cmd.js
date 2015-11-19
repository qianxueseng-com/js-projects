// 不使用浏览器进行mocha test
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var tool = require('../src/js/tool');

// jsdom 模拟DOM
var jsdom = require("jsdom").jsdom;
var document = jsdom("<html><body></body></html>");
var window = document.defaultView;
var jquery = $ = require('jquery')(window);


describe('tool 模块测试', function () {
    describe('tool.isNumKey', function () {
        it('键码范围：48~57', function () {
            for (var i = 48; i < 58; i++) {
                expect(tool.isNumKey(i, {})).to.equal(true);
            }
        });
        it('键码范围：96~105', function () {
            for (var i = 96; i < 106; i++) {
                expect(tool.isNumKey(i, {})).to.equal(true);
            }
        });
        it('键码为退格键且设置参数为包含退格键时', function () {
            expect(tool.isNumKey(8, {backspaceKey: true})).to.equal(true);
        });
        it('键码为退格键且没有设置参数为包含退格键时', function () {
            expect(tool.isNumKey(8, {})).to.equal(false);
        });
        it('键码为回车键且设置参数为包含回车键时', function () {
            expect(tool.isNumKey(13, {enterKey: true})).to.equal(true);
        });
        it('键码为回车键且没有设置参数为包含回车键时', function () {
            expect(tool.isNumKey(13, {})).to.equal(false);
        });
        it('键码为其它键时', function () {
            for (var i = 0; i < 200; i++) {
                if ((i >= 96 && i <= 105) || (i >= 48 && i <= 57) || (i === 8) || (i === 13)) {
                    continue;
                }
                expect(tool.isNumKey(i, {})).to.equal(false);
            }
        });
    });

    describe('tool.changeElementText', function () {
        it('是否改变了文本内容', function () {
            var $div = $('<div></div>');
            tool.changeElementText($div, 'test');
            expect($div.text()).to.equal('test');
        });
    });

    describe('tool.runAfter', function () {
        var callBack = sinon.spy();
        var clock;

        before(function () {
            clock = sinon.useFakeTimers();
        });

        after(function () {
            clock.restore();
        });

        it('是否在指定时间内(199ms-220ms)运行任务', function () {
            tool.runAfter(callBack, 200);
            clock.tick(199);
            expect(callBack.notCalled).to.equal(true);
            clock.tick(220);
            expect(callBack.called).to.equal(true);
        });
    });

    describe('tool.runRepeat', function () {
        var callBack = sinon.spy();
        var clock;

        before(function () {
            clock = sinon.useFakeTimers();
        });

        after(function () {
            clock.restore();
        });

        it('是否在指定时间后运行任务', function () {
            tool.runRepeat(function () {
                callBack();
            }, 200, 3);
            clock.tick(600);
            expect(callBack.callCount).to.equal(3);

        });
    });

    describe('tool.letElementSelected', function () {
        it('是否选中了指定元素', function () {
            var $input = $('<input type="text" style="visibility: hidden;" value="test"/>');
            $('body').append($input);
            tool.letElementSelected($input);
            expect($('input:selected')).to.not.equal('undefined');
            $('input').remove();
        });
    });
});
