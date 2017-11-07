import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import NavigationCollapse from './NavigationCollapse';

describe('<NavigationCollapse />', () => {
  let component;
  let handleLogout;
  beforeEach(() => {
    handleLogout = jest.fn();
    component = mount(
      <NavigationCollapse handleLogout={handleLogout} />
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

  it('should be called "NavigationCollapse"', () => {
    expect(component.name()).to.equal('NavigationCollapse')
  });


  it('should call "props.handleLogout" link is clicked', () => {
    component.find('.logout-link NavLink').simulate('click');
    expect(handleLogout.mock.calls).to.have.lengthOf(1);
  })

});
