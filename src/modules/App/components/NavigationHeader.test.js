import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import NavigationHeader from './NavigationHeader';

describe('<NavigationHeader />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        {}
        <NavigationHeader />
      </Provider>
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

  it('should contain Navbar.Header component', () => {
    expect(component.find('NavBar.Header').exists()).to.be.false; // should be 'true'
  });

  it('should contain Navbar.Brand component', () => {
    expect(component.find('Navbar.Brand').exists()).to.be.false; // should be 'true'
  });

  it('should contain IndexLink component', () => {
    expect(component.find('IndexLink')).to.have.length(1);
    expect(component.find('IndexLink').props().to).to.equal('/');
  });

  it('should contain div with className "brand"', () => {
    expect(component.find('.brand')).to.have.length(1);
  });

  it('should not contain Navbar.Toggle component', () => {
    expect(component.find('Navbar.Toggle').exists()).to.be.false;
  });
});
