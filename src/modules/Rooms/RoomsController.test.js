import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import { RoomsControllerComponent } from './RoomsController';
import RoomsLayout from './components/RoomsLayout';

describe('<RoomsControllerComponent />', () => {
  let component;
  beforeEach(() => {
    // const props = {
    //   params: {slug: 'foo'},
    //   loadRoom: jest.fn()
    // };
    component = shallow(<RoomsControllerComponent />, {disableLifecycleMethods: true});
  });

  it('should render', () => {
    
    expect(component.exists()).to.be.true;
  });

  it('should render <RoomsLayout />', () => {
    expect(component.find(RoomsLayout).exists()).to.be.true;
  });

});
