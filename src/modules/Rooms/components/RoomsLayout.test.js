import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import { Slide } from 'components';

import RoomsLayout from './RoomsLayout';
import Video from './Video';
import Controls from './Controls';
import Chat from './Chat';
import ChatIconButton from './ChatIconButton';

describe('<RoomsLayout />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<RoomsLayout />);
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

  it('should render <Video />', () => {
    expect(component.find(Video).exists()).to.be.true;
  });

  it('should render <Controls />', () => {
    expect(component.find(Controls).exists()).to.be.true;
  });

  it('should render <Slide /> with <Chat /> as child', () => {
    const slide = component.find(Slide);
    expect(slide.exists()).to.be.true;
    expect(slide.find(Chat).exists()).to.be.true;
  });


});
