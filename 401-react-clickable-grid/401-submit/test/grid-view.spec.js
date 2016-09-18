import React from 'react';
import { shallow, render } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import GridComponent from '../src/js/grid-view';

describe('<GridElement />', () => {

  it('renders 4 <li></li> components', () => {
    const props = {
      n: 2
    };
    const $ = render(<GridComponent {...props} />);
    expect($.find('li')).to.have.length(props.n * props.n);
  });

  it('renders 100 <li></li> components', () => {
    const props = {
      n: 10
    };
    const $ = render(<GridComponent {...props} />);
    expect($.find('li')).to.have.length(props.n * props.n);
  });

});
