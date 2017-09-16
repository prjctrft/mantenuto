import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Connecting from './Connecting';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import sinon from 'sinon';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('<Connecting />', () => {
  const mockStore = {
  };

  const store = createStore(browserHistory, client, mockStore);
  const onButtonClick = sinon.spy();
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <Connecting onButtonClick={onButtonClick} />
    </Provider>
  );
  const component = connectedComponent.find(Connecting);

  it('should render correctly', () => { expect(component.exists()).to.be.true });

  it('should render a container <div>', () => {
  	const container = component.find('.container');

  	expect(container).to.have.length(1);
  	expect(component.find('.container').name()).to.equal('div');
  });

  it('should render a row <div>', () => {
  	expect(component.find('.row')).to.have.length(1);
  	expect(component.find('.row').name()).to.equal('div');
  });

  it('should render a large div spanning the width of the users screen', () => {
  	expect(component.find('.col-xs-12')).to.have.length(1);
  	expect(component.find('.col-xs-12').name()).to.equal('div');
  });

  it('should render an <h2> element with correct text content', () => {
  	expect(component.find('h2')).to.have.length(1);
  	expect(component.find('h2').text()).to.equal('Finding someone that needs your ears now!');
  });

  it('should', () => {
  	expect(component.find('ClipLoader').exists()).to.be.true;
  });
});