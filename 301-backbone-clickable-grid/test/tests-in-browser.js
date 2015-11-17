var should = chai.should();

describe('tool 模块测试', function () {
    describe('tool.isNumKey', function () {
        it('键码范围：48~57', function () {
            for (var i = 48; i < 58; i++) {
                    tool.isNumKey(i, {}).should.equal(true);
                }
            });
        it('键码范围：96~105', function () {
            for (var i = 96; i < 106; i++) {
                tool.isNumKey(i, {}).should.equal(true);
            }
        });
        it('键码为退格键且设置参数为包含退格键时', function () {
                tool.isNumKey(8, {backspaceKey:true}).should.equal(true);
        });
        it('键码为退格键且没有设置参数为包含退格键时', function () {
            tool.isNumKey(8, {}).should.equal(false);
        });
        it('键码为回车键且设置参数为包含回车键时', function () {
            tool.isNumKey(13, {enterKey:true}).should.equal(true);
        });
        it('键码为回车键且没有设置参数为包含回车键时', function () {
            tool.isNumKey(13, {}).should.equal(false);
        });
        it('键码为其它键时', function () {
            for(var i = 0; i < 200; i++) {
                if((i >= 96 && i <= 105) ||(i >= 48 && i <= 57) ||(i === 8) ||(i === 13)) {
                    continue;
                }
                tool.isNumKey(i, {}).should.equal(false);
            }
        });
        });

    describe('tool.changeElementText', function () {
        it('是否改变了文本内容', function () {
            var $div = $('<div></div>');
            tool.changeElementText($div, 'test');
            $div.text().should.equal('test');
        });
    });

    describe('tool.runAfter', function () {
        it('是否在指定时间后运行任务', function (done) {
            tool.runAfter(function () {
                done();
            }, 200);
        });
    });

    describe('tool.runRepeat', function () {
        it('是否在指定时间后运行任务', function (done) {
            tool.runRepeat(function () {
                done();
            }, 200, 1);
        });
    });

    describe('tool.letElementSelected', function () {
        it('是否选中了指定元素', function () {
            var $input = $('<input type="text" style="visibility: hidden;" value="test"/>');
            $('body').append($input);
            tool.letElementSelected($input);
            $('input:selected').should.not.equal('undefined');
            $('input').remove();
        });
    });
    });