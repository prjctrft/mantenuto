import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import Chat from './Chat';

describe('<Chat />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        {}
        <Chat />
      </Provider>
    );
  });

  it('should render', () => {
  	expect(component.exists()).to.be.true;
  });
});