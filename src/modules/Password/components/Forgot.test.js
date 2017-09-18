import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import client from 'app';
import Forgot from './Forgot';


describe('<Forgot />', () => {
  const mockStore = {
  };

  const store = createStore(browserHistory, client, mockStore);
  const onButtonClick = jest.mock();
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <Forgot onButtonClick={onButtonClick} />
    </Provider>
  );

  const component = connectedComponent.find(Forgot);

  it('should render correctly', () => { expect(component.exists()).to.be.true });

  // it('should render containing <div> element', () => {
  //   expect(component.find('div .content').exists()).to.be.true;
  // });

  // it('<div> should contain <h1>, <p> and <form>', () => {
  //   const divContainer = component.find('div .content').children();
  //
  //   expect(divContainer.first().name()).to.equal('h1');
  //   expect(divContainer.at(1).name()).to.equal('p');
  //   expect(divContainer.last().name()).to.equal('form');
  // });

  it('<form> should contain <input> and <button>', () => {
    const form = component.find('form').children();

    expect(form.first().name()).to.equal('input');
    expect(form.last().name()).to.equal('button');
  });

/*
** Simulate user submitting form while <input> is empty
** Simulate user submitting form while <input> is invalid
** Simulate user submitting form while <input> is valid
*/
});
