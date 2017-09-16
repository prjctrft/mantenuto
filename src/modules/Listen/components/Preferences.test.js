import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Preferences from './Preferences';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import sinon from 'sinon';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('<Preferences />', () => {
  const mockStore = {
  };

  const store = createStore(browserHistory, client, mockStore);
  const onButtonClick = sinon.spy();
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <Preferences onButtonClick={onButtonClick} />
    </Provider>
  );
  const component = connectedComponent.find(Preferences);

  it('should render correctly', () => {
  	expect(component.exists()).to.be.true;
  });

  it('should render Wrapper', () => {
  	expect(component.children().first().name()).to.equal('Wrapper');
  });

  it('should render container div', () => {
    expect(component.find('.btns').exists()).to.be.true;
    expect(component.find('.btns').name()).to.equal('div');
  });

  it('should render row div', () => {
  	expect(component.find('.row').exists()).to.be.true;
    expect(component.find('.row').name()).to.equal('div');
  });

  it('should render first div with className noWrap', () => {
  	expect(component.find('.noWrap').first().exists()).to.be.true;
    expect(component.find('.noWrap').first().name()).to.equal('div');
  });

  it('noWrap div have an h3 element', () => {
  	expect(component.find('h3').first().exists()).to.be.true;
  	expect(component.find('h3').first().text()).to.equal('Can you listen anytime?')
  });

  it('should render correct div with correct h3', () => {
  	expect(component.find('.text-center').exists()).to.be.true;
  	expect(component.find('.text-center').children()).to.have.length(1);
  	expect(component.find('.text-center').children().first().name()).to.equal('h3');
  	expect(component.find('.text-center').children().first().text()).to.equal('Or');
  });

  it('should render correct div with correct h3 and CircleButton', () => {
  	expect(component.find('.noWrap').last().exists()).to.be.true;
  	expect(component.find('.noWrap').last().children()).to.have.length(2);
  	expect(component.find('.noWrap').last().children().first().name()).to.equal('h3');
  	expect(component.find('.noWrap').last().children().first().text()).to.equal('Can you only listen now!');
  	expect(component.find('.noWrap').last().children().last().name()).to.equal('CircleButton');
  });
});