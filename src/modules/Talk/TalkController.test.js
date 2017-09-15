import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

const io_server = require('socket.io').listen(5000);
const io = require('socket.io-client');

import { TalkController } from './TalkController';

describe('TalkController', () => {
  let socket;
  let component;
  beforeAll((done) => {
    socket = io('http://localhost:5000');
    socket.on('connect', () => {
      global.socket = socket;
      component = mount(<TalkController />);
      done();
    });
  });

  afterAll((done) => {
    // Cleanup
    if(socket.connected) {
      socket.disconnect();
    }
    io_server.close();
    done();
  });

  it('should render self and <Talk />', () => {
    expect(component.name()).to.equal('TalkController');
    expect(component.find('Talk')).to.have.length(1);
  })

  it('should render with "pipeline" set to "looking"', () => {
    expect(component.state('pipeline')).to.equal('looking');
  });

  it('"this.listenerFound" should set "pipeline" to "listenerFound"', () => {
    component.instance().listenerFound();
    expect(component.state('pipeline')).to.equal('listenerFound');
  });

  it('"this.roomReady" should set "pipeline" to "roomReady"', () => {
    component.instance().roomReady();
    expect(component.state('pipeline')).to.equal('roomReady');
  });

  it('"this.listenerNotFound" should set "pipeline" to "listenerNotFound"', () => {
    component.instance().listenerNotFound();
    expect(component.state('pipeline')).to.equal('listenerNotFound');
  });

});
