import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { expect } from 'chai';
import { SpeakeasyForm } from 'components';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('SpeakeasyForm', () => {
  const mockStore = {
    info: {
      load: () => {},
      loaded: true,
      loading: false,
      data: {
        message: 'This came from the api server',
        time: Date.now()
      }
    }
  };
  const store = createStore(browserHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <SpeakeasyForm />
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer); // TODO replace findDOMNode method

  it('should render empty input', () => {
    const input = dom.querySelector('input');

    expect(input.textContent).to.equal('');
  });

  it('should render with correct text content', () => {
    const button = dom.querySelector('button');

    expect(button.textContent).to.equal(' Next'); 
  });

  it('should not originally render with invalid code div', () => {
    const invalidRegistrationCode = dom.querySelector('div.text-danger');
    
    expect(invalidRegistrationCode).not.to.exist;
  });
});