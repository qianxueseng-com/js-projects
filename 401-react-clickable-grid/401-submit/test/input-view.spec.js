import React from 'react';
import {findDOMNode} from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

import AppView from '../src/js/app-view';

describe('app-view Rendering', function () {
  it('Input n and Click submit button, and render n * n grids', function () {
    var inputValue = [1, 4, 20, -2, 31, '-sfddsf'];
    var messageShow = ['', '', '', '请输入一个大于等于0的整数', '请输入小于20的正整数', '请输入0~20的正整数'];
    var liCount = [1, 16, 400, 0, 0, 0];

    const appView = TestUtils.renderIntoDocument(<AppView/>);
    const appDOM = findDOMNode(appView);
    let nInput = appDOM.querySelector('#n-size');
    let submitButton = appDOM.querySelector('#n-submit');

    for(let i = 0; i < inputValue.length; i++) {
      TestUtils.Simulate.change(nInput, {target: {value: inputValue[i]}});
      TestUtils.Simulate.click(submitButton);

      expect(appDOM.querySelector('h3').innerHTML).to.be.equal(messageShow[i]);
      expect(appDOM.querySelectorAll('li').length).to.be.equal(liCount[i]);
    }
  });
});
