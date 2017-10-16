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

  it('should render with "has-feedback" class after form is "touched"', () => {
    component.setProps({meta: {touched: true}});
    expect(component.find('.form-group').hasClass('has-feedback')).to.be.true;
  });

  it('should render with "has-success" class after form is "touched" and "valid"', () => {
    component.setProps({meta: {touched: true, valid: true}});
    expect(component.find('.form-group.has-feedback').hasClass('has-success')).to.be.true;
  });

  it('should render with "has-error" class after form is "touched" and "error"', () => {
    component.setProps({meta: {touched: true, error: 'Some nasty thing!'}});
    expect(component.find('.form-group.has-feedback').hasClass('has-error')).to.be.true;
  });

  // TODO:
  // test "size" prop
  // test "labelRequired" prop
  // test "glyphicon-ok"
  // test "glyphicon-remove"



});
