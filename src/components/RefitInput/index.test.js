import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RefitInput from './';

describe('<RefitInput />', () => {

  let component;

  beforeEach(() => {
    component = shallow(
      <RefitInput input={{}} meta={{}} />
    );
  })

  it('should render correctly', () => {
    expect(component.exists()).to.be.true;
  });

  it('should render with "is-valid" class after form is "touched" and "valid"', () => {
    component.setProps({meta: {touched: true, valid: true}});
    expect(component.find('.form-control').hasClass('is-valid')).to.be.true;
  });

  it('should render with "is-valid" class after form is "touched" and "valid"', () => {
    component.setProps({meta: {touched: true, valid: true}});
    expect(component.find('.form-control').hasClass('is-valid')).to.be.true;
  });

  it('should render with "is-invalid" class after form is "touched" and "error"', () => {
    component.setProps({meta: {touched: true, error: 'Some nasty thing!'}});
    expect(component.find('.form-control').hasClass('is-invalid')).to.be.true;
  });

  // TODO:
  // test "disabled" prop
  // test "size" prop
  // test "labelRequired" prop
  // test "glyphicon-ok"
  // test "glyphicon-remove"



});
