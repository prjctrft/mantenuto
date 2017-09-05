import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Login from './Login';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('<Login />', () => {

  const mockStore = {
    // put any variables needed here
  };

  const store = createStore(browserHistory, client, mockStore);
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <Login />
    </Provider>
  );

  const component = connectedComponent.find(Login);

  it('should render correctly', () => {expect(component.exists()).to.be.true});

  it('should render with the .login className', () => {
    expect(component.hasClass('login')).to.be.true;
  });

});
