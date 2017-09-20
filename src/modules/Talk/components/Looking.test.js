import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import Looking from './Looking';

describe('<Looking />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    // const handleSubmit = jest.fn();
    component = mount(
      <Provider store={store}>
        {}
        <Looking />
      </Provider>
    );
  });

  it('should render', () => {
  	expect(component.exists()).to.be.true;
  });
});