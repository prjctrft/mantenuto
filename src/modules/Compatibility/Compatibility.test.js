import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { CompatibilityComponent } from './';

describe('<CompatibilityComponent />', () => {
  let component;
  const props = {
    pathname: '/foobar'
  }
  beforeEach(() => {
    component = shallow(<CompatibilityComponent {...props} />);
  })

  it('should render', () => {  
    expect(component.exists()).to.be.true
  });

});
