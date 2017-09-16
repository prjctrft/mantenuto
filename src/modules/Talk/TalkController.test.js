import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import EventEmitter from 'events';

import { TalkController } from './TalkController';

describe('<TalkController />', () => {

  let component;
  beforeEach(() => {
    global.socket = new EventEmitter();
    component = mount(<TalkController />);
  });

  it('should render self and <Talk />', () => {
    expect(component.exists()).to.be.true;
    expect(component.name()).to.equal('TalkController');
    expect(component.find('Talk')).to.have.length(1);
  })

  it('should render with "pipeline" set to "looking"', () => {
    expect(component.state('pipeline')).to.equal('looking');
  });

  it('should register three event listeners', () => {
    const expectedEvents = ["listener found","room ready", "listener not found"];
    const listeners = global.socket.eventNames();
    expect(listeners).to.have.length(expectedEvents.length);
    expect(listeners).to.have.members(expectedEvents)
  });

  it('"listener found" event should set "pipeline" to "listenerFound"', () => {
    global.socket.emit('listener found');
    expect(component.state('pipeline')).to.equal('listenerFound');
  });

  it('"room ready" event should set "pipeline" to "roomReady"', () => {
    global.socket.emit('room ready');
    expect(component.state('pipeline')).to.equal('roomReady');
  });

  it('"listener not found" event should set "pipeline" to "listenerNotFound"', () => {
    global.socket.emit('listener not found');
    expect(component.state('pipeline')).to.equal('listenerNotFound');
  });

});
