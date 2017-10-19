import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Navigation from './Navigation';

describe('<Navigation />', () => {
  let component;
  beforeEach(() => {
    component = mount(<Navigation />);
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

  it('should be called "Navigation"', () => {
    expect(component.name()).to.equal('Navigation')
  });

  it('should contain "Navbar" and "NavbarBrand" component', () => {
    expect(component.find('Navbar NavbarBrand')).to.have.length(1);
  });

  it('should render with default state "isOpen" set to "false"', () => {
    expect(component.state('isOpen')).to.be.false;
  });

  it('should have method "toggle" that toggles state property "isOpen"', () => {
    component.instance().toggle();
    expect(component.state('isOpen')).to.be.true;
    component.instance().toggle();
    expect(component.state('isOpen')).to.be.false;
  });

  it('should have method "hideNavigation" that returns "false" when on "/" and user not authenticated ', () => {
    component.setProps({ pathname: '/', authenticated: false });
    expect(component.instance().hideNavigation()).to.be.true;
    component.setProps({ pathname: '/', authenticated: true });
    expect(component.instance().hideNavigation()).to.be.false;
    component.setProps({ pathname: '/profile', authenticated: true });
    expect(component.instance().hideNavigation()).to.be.false;
  });

  describe('when "authenticated"', () => {
    beforeEach(() => {
      component.setProps({authenticated: true })
    });

    it('should render "NavbarToggler"', () => {
      expect(component.find('NavbarToggler')).to.have.lengthOf(1);
    });

    it('should render "NavbarCollapse"', () => {
      expect(component.find('NavbarCollapse')).to.have.lengthOf(1);
    })

  });
});
