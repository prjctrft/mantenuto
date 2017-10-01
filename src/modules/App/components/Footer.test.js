import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import Footer from './Footer';

describe('<Footer />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        {}
        <Footer />
      </Provider>
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });

  it('should render footer and contents', () => {
    expect(component.find('.footer').exists()).to.be.true;
    expect(component.find('span').exists()).to.be.true;
    expect(component.find('button')).to.have.length(2);
    expect(component.find('a')).to.have.length(2);
  });
});
