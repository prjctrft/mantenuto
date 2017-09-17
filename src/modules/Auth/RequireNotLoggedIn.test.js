import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { RequireNotLoggedInComponent } from './RequireNotLoggedIn';

describe('<RequireNotLoggedIn />', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      children: [<div key='1' />, <div key='2' />],
      push: jest.fn(),
    }
    component = mount(
      <RequireNotLoggedInComponent {...props} />
    );
  });

  it('should render correctly', () => {
    expect(component.exists()).to.be.true
  });

  it('should render children correctly', () => {
    expect(component.children('div')).to.have.length(2);
  });

  it('should push route "/" if user is authenticated', () => {
    const newProps = {authenticated: true};
    component.setProps(newProps);
    expect(props.push.mock.calls).to.have.length(1);
    expect(props.push.mock.calls[0][0]).to.equal('/');
  });

  it('should push route "/" if user is authenticating', () => {
    const newProps = {tryingAuth: true};
    component.setProps(newProps);
    expect(props.push.mock.calls).to.have.length(1);
    expect(props.push.mock.calls[0][0]).to.equal('/');
  });


  it('should not redirect "/" if user is not authed', () => {
    const newProps = {authenticated: false};
    component.setProps(newProps);
    expect(props.push.mock.calls).to.have.length(0);
  })

  it('should not redirect "/" unless user is trying to auth', () => {
    const newProps = {tryingAuth: false};
    component.setProps(newProps);
    expect(props.push.mock.calls).to.have.length(0);
  })

});
