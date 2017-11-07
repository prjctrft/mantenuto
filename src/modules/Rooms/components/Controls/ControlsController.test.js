import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import { ControlsControllerComponent } from './ControlsController';
import ControlsComponent from './ControlsComponent';

describe('<ControlsController />', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ControlsControllerComponent />);
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

  it('should render <ControlsComponent />', () => {
    expect(component.find(ControlsComponent).exists()).to.be.true;
  });

});
