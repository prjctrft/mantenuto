import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { MicButtonComponent } from './MicButton';

describe('<MicButton />', () => {
  let component;
  beforeEach(() => {
    component = shallow(<MicButtonComponent />);
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });
});
