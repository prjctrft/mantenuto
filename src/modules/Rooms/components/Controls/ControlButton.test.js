import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import ControlButton from './ControlButton';

describe('<ControlButton />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        {}
        <ControlButton />
      </Provider>
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });
});
