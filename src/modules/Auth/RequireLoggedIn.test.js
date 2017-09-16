import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { RequireLoggedIn } from './RequireLoggedIn';

describe('<RequireLoggedIn />', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      children: [<div key='1' />, <div key='2' />],
      push: jest.fn(),
    }
    component = mount(
      <RequireLoggedIn {...props} />
    );
  });

  it('should render correctly', () => {
    expect(component.exists()).to.be.true
  });

  it('should render children correctly', () => {
    expect(component.children('div')).to.have.length(2);
  });

  it('should not redirect to "/login" if user is authenaticating', () => {
    const newProps = {tryingAuth: true, authenticated: false, triedAuth: false};
    component.setProps(newProps);
    expect(props.push.mock.calls).to.have.length(0);
  })

  it('should not redirect to "/login" if user is authenticated', () => {
    const newProps = {tryingAuth: false, authenticated: true, triedAuth: true};
    component.setProps(newProps);
    expect(props.push.mock.calls).to.have.length(0);
  })

  it('should push route "/login" if authentication has been tried', () => {
    const newProps = {tryingAuth: false, authenticated: false, triedAuth: true};
    component.setProps(newProps);
    expect(props.push.mock.calls).to.have.length(1);
    expect(props.push.mock.calls[0][0]).to.equal('/login');
  })



});
