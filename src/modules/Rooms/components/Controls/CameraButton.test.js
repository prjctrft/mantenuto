import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CameraButtonComponent } from './CameraButton';

describe('<CameraButtonComponent />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<CameraButtonComponent />);
  })

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

});
