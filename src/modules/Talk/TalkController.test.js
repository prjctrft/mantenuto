import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import EventEmitter from 'events';

import { TalkController } from './TalkController';

describe('<TalkController />', () => {

  describe('constructor', () => {
    let controller;

    beforeAll(() => {
      controller = new TalkController();
    })

    it('should register "talk" service', () => {
      expect(controller.service.path).to.equal('talk');
    });

  });

  let component;
  beforeEach(() => {
    component = mount(<TalkController />);
    const instance = component.instance();
    instance.service = new EventEmitter();
    instance.registerSocketListeners();
  });

  it('should render "null"', () => {
    expect(component.exists()).to.be.true;
    expect(component.name()).to.equal('TalkController');
    expect(component.isEmptyRender()).to.be.true;
  })

  it('should render with "pipeline" set to "null"', () => {
    expect(component.state('pipeline')).to.equal(null);
  });

  it('should register three event listeners', () => {
    const expectedEvents = [
      "created",
      "listener found",
      "room ready",
      "listener not found"
    ];
    const listeners = component.instance().service.eventNames();
    expect(listeners).to.have.length(expectedEvents.length);
    expect(listeners).to.have.members(expectedEvents)
  });

  it('"listener found" event should set "pipeline" to "listenerFound"', () => {
    component.instance().service.emit('listener found');
    expect(component.state('pipeline')).to.equal('listenerFound');
  });

  it('"room ready" event should set "pipeline" to "roomReady"', () => {
    component.instance().service.emit('room ready');
    expect(component.state('pipeline')).to.equal('roomReady');
  });

  it('"listener not found" event should set "pipeline" to "listenerNotFound"', () => {
    component.instance().service.emit('listener not found');
    expect(component.state('pipeline')).to.equal('listenerNotFound');
  });

});
