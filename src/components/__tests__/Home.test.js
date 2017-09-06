import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { expect } from 'chai';
import { Home } from 'components';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('Home', () => {
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
      <Home />
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer); // TODO replace findDOMNode method

  it('should render correctly', () => expect(renderer).to.be.ok);

  it('should contain the correct value \'Project Refit\'', () => {
  	const text = dom.querySelector('h1').textContent;

  	expect(text).to.equal('Project Refit');
  });

});
