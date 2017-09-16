import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import EventEmitter from 'events';

import { TryAuth } from './TryAuth';

describe('<TryAuth />', () => {
  let props;
  beforeEach(() => {
    props = {
      children: [<div key='1' />, <div key='2' />],
      tryRestAuth: jest.fn(),
      socketAuth: jest.fn()
    };
    global.socket = new EventEmitter();
  });

  it('should render correctly', () => {
    const component = mount(
      <TryAuth {...props} />
    );
    expect(component.exists()).to.be.true
  });

  it('should render children correctly', () => {
    const component = mount(
      <TryAuth {...props} />
    );
    expect(component.children('div')).to.have.length(2);
  });

  it('should run `tryRestAuth` once on the server', () => {
    global.__SERVER__ = true;
    global.__CLIENT__ = false;
    const component = mount(
      <TryAuth {...props} />
    );
    expect(props.tryRestAuth.mock.calls).to.have.length(1);
  });

  it('should run `tryRestAuth` once on the client', () => {
    global.__SERVER__ = false;
    global.__CLIENT__ = true;
    const component = mount(
      <TryAuth {...props} />
    );
    expect(props.tryRestAuth.mock.calls).to.have.length(1);
  });

  it('should run `socketAuth` on the client on "connect" event if already authed', () => {
    global.__SERVER__ = false;
    global.__CLIENT__ = true;
    const newProps = { user: '1234', triedSocketAuth: false };
    const component = mount(
      <TryAuth {...{...props, ...newProps}} />
    );
    const listeners = global.socket.eventNames();
    global.socket.emit('connect');
    expect(listeners).to.have.length(1);
    expect(listeners[0]).to.equal('connect');
    expect(props.socketAuth.mock.calls).to.have.length(1);
  });

});
