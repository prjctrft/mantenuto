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
    <Provider store={store} key='provider'>
      <Forgot onButtonClick={onButtonClick} />
    </Provider>
  );

  const component = connectedComponent.find(Forgot);

  it('should render correctly', () => { expect(component.exists()).to.be.true });

  it('<form> should contain <input> and <button>', () => {
    const form = component.find('form').children();
    expect(form.first().name()).to.equal('Field');
    expect(form.last().name()).to.equal('button');
  });

/*
** Simulate user submitting form while <input> is empty
** Simulate user submitting form while <input> is invalid
** Simulate user submitting form while <input> is valid
*/
});
