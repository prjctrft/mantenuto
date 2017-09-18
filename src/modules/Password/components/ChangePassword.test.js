import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';

import client from 'app';
import ChangePassword from './ChangePassword';

describe('<ChangePassword />', () => {
  const mockStore = {
  };

  const store = createStore(browserHistory, client, mockStore);
  const onButtonClick = jest.mock();
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
