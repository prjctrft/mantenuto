import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import ListenerNotFound from './ListenerNotFound';

describe('<ListenerNotFound />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        {}
        <ListenerNotFound />
      </Provider>
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });
});
