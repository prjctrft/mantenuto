import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import RegisterForm from './RegisterForm';

describe('<RegisterForm />', () => {
  let component;
  beforeEach(() => {
    const store = createStore({}, {}, {});
    const props = {params: {type: 'foobar'}}
    component = mount(
      <Provider store={store}>
        {}
        <RegisterForm {...props}/>
      </Provider>
    );
  });

  it('should render', () => {
    expect(component.exists()).to.be.true;
  });
});
