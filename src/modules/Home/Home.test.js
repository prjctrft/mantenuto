import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Home } from './Home';

describe('<Home />', () => {
  let component;

  const props = {
    getCodes: jest.fn(),
    codes: []
  }

  beforeEach(() => {
    component = shallow(<Home {...props} />);
  })

  it('should render', () => {
    expect(component.exists()).to.be.true
  });

  it('should render div with class home', () => {
    const home = component.find('.home');
    expect(home).to.have.length(1);
    expect(home.name()).to.equal('div');
  });

  it('should render image', () => {
    expect(component.find('img').exists()).to.be.true;
  });

});
