import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Home } from './Home';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('<Home />', () => {

  const mockStore = {
  };

  const props = {
    getCodes: jest.fn(),
    codes: []
  }

  const store = createStore(browserHistory, client, mockStore);
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <Home {...props} />
    </Provider>
  );

  const component = connectedComponent.find(Home);

  it('should render correctly', () => {expect(component.exists()).to.be.true});

  it('should render div with class home', () => {
    const home = component.find('.home');
    expect(home).to.have.length(1);
    expect(home.name()).to.equal('div');
  });

  it('should render image', () => {
    expect(component.find('img').exists()).to.be.true;
  });

  it('should render proper text under image', () => {
    expect(component.find('a').text()).to.equal('Already a member?');
  });

  it('should render h1 element', () => {
    expect(component.find('h1')).to.have.length(1);
  });
});
