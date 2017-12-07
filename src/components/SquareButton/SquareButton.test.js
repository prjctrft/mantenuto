import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SquareButton from './';

describe('<SquareButton />', () => {
  const props = {
    content: 'Foobar!',
    className: 'one two',
    onClick: () => null
  };

  const component = shallow(
    <SquareButton {...props} />
  );

  it('should render correctly', () => {
    expect(component.exists()).to.be.true;
  });

  it('should render with correct message', () => {
    expect(component.text()).to.equal(props.content);
  });

  it('should render the correct default className', () => {
    expect(component.hasClass('SquareButton')).to.be.true;
  });

  it('should render the correct className prps', () => {
    const classNames = props.className.split(' ');
    expect(component.hasClass(classNames[0])).to.be.true;
    expect(component.hasClass(classNames[1])).to.be.true;
  });
});
