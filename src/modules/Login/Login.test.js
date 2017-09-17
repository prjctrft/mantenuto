import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Login } from './Login';

describe('<Login />', () => {

  let component;
  let props = {
    notifSend: jest.fn(),
    login: jest.fn(),
    push: jest.fn()
  }
  beforeEach(() => {
    component = shallow(<Login {...props} />);
  })

  it('should render correctly', () => {expect(component.exists()).to.be.true});

  it('should render with the .login className', () => {
    expect(component.hasClass('login')).to.be.true;
  });

});
