import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import Navigation from './Navigation';

describe('<Navigation />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

  it('should contain Navbar and NavigationHeader component', () => {
    expect(component.find('Navbar')).to.have.length(1);

    expect(component.find('NavigationHeader')).to.have.length(1);
    expect(component.find('NavigationHeader').props().user).to.be.defined;
  });

  it('should not contain NavigationCollapse component by default', () => {
    expect(component.find('NavigationCollapse').exists()).to.be.false;
  });

  // Looking for a way to render NavigationCollapse component
});
