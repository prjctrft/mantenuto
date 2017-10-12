import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import EventEmitter from 'events';

import { TryAuthComponent } from './TryAuth';

describe('<TryAuth />', () => {
  let props;
  beforeEach(() => {
    props = {
      children: [<div key='1' />, <div key='2' />],
      tryRestAuth: jest.fn(),
      tryRestAndSocketAuth: jest.fn()
    };
    global.socket = new EventEmitter();
  });

  it('should render correctly', () => {
    const component = mount(
      <TryAuthComponent {...props} />
    );
    expect(component.exists()).to.be.true
  });

  it('should render children correctly', () => {
    const component = mount(
      <TryAuthComponent {...props} />
    );
    expect(component.find('div').children()).to.have.length(2);
  });

  it('should run `tryRestAuth` once on the server', () => {
    global.__SERVER__ = true;
    global.__CLIENT__ = false;
    mount(
      <TryAuthComponent {...props} />
    );
    expect(props.tryRestAuth.mock.calls).to.have.length(1);
  });

  it('should run `tryRestAndSocketAuth` once on the client', () => {
    global.__SERVER__ = false;
    global.__CLIENT__ = true;
    mount(
      <TryAuthComponent {...props} />
    );
    expect(props.tryRestAndSocketAuth.mock.calls).to.have.length(1);
  });

});
