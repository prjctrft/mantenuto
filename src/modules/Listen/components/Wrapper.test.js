/*
** TODO:
** Run test for the children of the .Wrapper div
*/

import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Wrapper from './Wrapper';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import sinon from 'sinon';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('<Wrapper />', () => {
  const mockStore = {
  };

  const store = createStore(browserHistory, client, mockStore);
  const onButtonClick = sinon.spy();
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <Wrapper onButtonClick={onButtonClick} />
    </Provider>
  );
  const component = connectedComponent.find(Wrapper);

  it('should render correctly', () => {
    expect(component.exists()).to.be.true;
  });

  it('should render correct div', () => {
    expect(component.find('.Wrapper').exists()).to.be.true;
    expect(component.find('.Wrapper').name()).to.equal('div');
  });
});