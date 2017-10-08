import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import NavigationCollapse from './NavigationCollapse';

describe('<NavigationCollapse />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        {}
        <NavigationCollapse />
      </Provider>
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

  // Test for Navbar.Collapse

  it('should contain Nav, LinkContainer and NavItem components', () => {
    expect(component.find('Nav')).to.have.length(1);
    expect(component.find('LinkContainer')).to.have.length(1);
    expect(component.find('NavItem')).to.have.length(2);
  });

  it('should have properly defined props', () => {
    expect(component.find('LinkContainer').props().to).to.be.defined;

    expect(component.find('NavItem').at(0).props().eventKey).to.be.defined;

    expect(component.find('NavItem').at(1).props().eventKey).to.be.defined;
    expect(component.find('NavItem').at(1).props().onClick).to.be.defined;
  });
});
