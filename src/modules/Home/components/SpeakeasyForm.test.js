import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import SpeakeasyForm from './SpeakeasyForm';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import sinon from 'sinon';

import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('<SpeakeasyForm />', () => {
  const mockStore = {
  };

  const store = createStore(browserHistory, client, mockStore);
  const onButtonClick = sinon.spy();
  const onChange = sinon.spy();
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <SpeakeasyForm onButtonClick={onButtonClick} />
    </Provider>
  );

  // this is just here for syntax highlighting/
  const component = connectedComponent.find(SpeakeasyForm);

  it('should render correctly', () => { expect(component.exists()).to.be.true });

  it('should render two(2) div elements by default', () => {
  	expect(component.find('div')).to.have.length(2);
  });

  it('should render <form> correctly', () => {
  	expect(component.find('form')).to.have.length(1);
  });

  it('should render empty <input>', () => {
  	const input = component.find('input');

  	expect(input).to.have.length(1);
  	expect(input.text()).to.be.empty;
  });

  it('should not render <div> underneath <input> by default', () => {
  	expect(component.hasClass('.text-danger')).to.be.false;
  });

  it('should render a <button> with <i> and text \' Next\'', () => {
  	const button = component.find('button');

  	expect(button).to.have.length(1);
  	expect(component.find('i')).to.have.length(1);
  	expect(button.text()).to.equal(' Next');
  });


/*
***********************************************************
** Need to simulate user input to render the correct div
** The following code is NOT working
***********************************************************
**
**  it('should render correct <div> element', () => {
**	  component.find('input').simulate('focus');
**    component.find('input').simulate('keyDown', {target: {value: 'a'}});
**    component.find('button').simulate('submit');
**
**    expect(component.find('.text-danger').exists()).to.be.true;
**    expect(component.find('.text-danger').name()).to.equal('div');
**    expect(component.find('strong').text()).to.not.equal('Required');
**  });
**
***********************************************************
*/

  it('should render <div> with className="text-danger"', () => {
    const textDanger = component.find('.text-danger');

    expect(component.find('.text-danger').exists()).to.be.false;

  	component.find('button').simulate('submit');

    expect(component.find('div')).to.have.length(3);
    expect(component.find('.text-danger').exists()).to.be.true;
    expect(component.find('.text-danger').name()).to.equal('div');
  	expect(component.find('strong').text()).to.equal('Required');
  });
});