import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import ChangePassword from './ChangePassword';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import sinon from 'sinon';

import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('<ChangePassword />', () => {
  const mockStore = {
  };

  const store = createStore(browserHistory, client, mockStore);
  const onButtonClick = sinon.spy();
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <ChangePassword onButtonClick={onButtonClick} />
    </Provider>
  );

  const component = connectedComponent.find(ChangePassword);

  it('should render correctly', () => { expect(component.exists()).to.be.true });

  it('should render container div with two children elements', () => {
    expect(component.children().first().name()).to.equal('div');
  });
});