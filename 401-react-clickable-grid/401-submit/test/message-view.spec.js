import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import MessageComponent from '../src/js/message-view';

describe('<MessageComponent />', () => {

  it('render <MessageView /> component', () => {
    const expected = '<div class="message"><h3>请输入0~20的正整数</h3></div>';
    const props = {
      message: '请输入0~20的正整数'
    };
    const $ = shallow(<MessageComponent {...props} />);
    const output = $.html();

    expect(output).to.equal(expected);
  });

});
