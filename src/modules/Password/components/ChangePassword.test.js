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

  it('should render container div and contents', () => {
   expect(component.find('.content').exists()).to.be.true;

   expect(component.find('h1')).has.length(1);

   expect(component.find('.formDiv').exists()).to.be.true;
   expect(component.find('form')).has.length(1);
   expect(component.find('label')).has.length(2);
   expect(component.find('input')).has.length(2);
   expect(component.find('button')).has.length(1);
  });
});
