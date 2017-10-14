import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { RequireLoggedInComponent } from './RequireLoggedIn';

describe('<RequireLoggedInComponent />', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      children: [<div key='1' />, <div key='2' />],
      push: jest.fn(),
      authenticated: true,
      tryingAuth: false,
      triedAuth: false
    }
    component = mount(
      <RequireLoggedInComponent {...props} />
    );
  });

  it('should render correctly when "authenticated"', () => {
    expect(component.exists()).to.be.true;
    expect(component.find('div').children()).to.have.length(2);
  });

  it('should render correctly when "tryingAuth"', () => {
    const authenticated = false;
    const tryingAuth = true;
    props = {...props, authenticated, tryingAuth};
    component = mount(
      <RequireLoggedInComponent {...props} />
    );
    expect(component.exists()).to.be.true
    // TODO: change to spinner
    expect(component.find('h1')).to.have.length(1);
  });

  it('should render correctly when "triedAuth"', () => {
    const authenticated = false;
    const triedAuth = true;
    props = {...props, authenticated, triedAuth};
    component = mount(
      <RequireLoggedInComponent {...props} />
    );
    expect(component.exists()).to.be.true
    expect(component.isEmptyRender()).to.be.true;
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
