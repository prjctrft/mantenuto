import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Talk from './Talk';

describe('Talk', () => {

  it('should render <Looking /> when "props.pipeline" is "looking"', () => {
    const component = shallow(<Talk pipeline='looking' />);
    expect(component.find('Looking')).to.have.length(1);
  })

  it('should render <ListenerFound /> when "props.pipeline" is "listenerFound"', () => {
    const component = shallow(<Talk pipeline='listenerFound' />);
    expect(component.find('ListenerFound')).to.have.length(1);
  });

  it('should render <RoomReady /> when "props.pipeline" is "roomReady"', () => {
    const component = shallow(<Talk pipeline='roomReady' />);
    expect(component.find('RoomReady')).to.have.length(1);
  });

  it('should render <ListenerNotFound /> when "props.pipeline" is "listenerNotFound"', () => {
    const component = shallow(<Talk pipeline='listenerNotFound' />);
    expect(component.find('ListenerNotFound')).to.have.length(1);
  });

});
