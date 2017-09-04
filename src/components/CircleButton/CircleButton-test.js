import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { expect } from 'chai';
import CircleButton from './';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('CircleButton', () => {

  const props = {
    content: 'Foobar!',
    className: 'one two',
    onClick: () => { return null}
  }

  const renderer = renderIntoDocument(
    <div>
      <CircleButton {...props} />
    </div>
  );

  const dom = ReactDOM.findDOMNode(renderer); // TODO replace findDOMNode method
  const button = dom.getElementsByTagName('button')[0];
  it('should render correctly', () => expect(renderer).to.be.ok);

  it('should render with correct message', () => {
    const text = button.textContent;
    expect(text).to.equal(props.content);
  });

  it('should render the correct default className', () => {
    const styles = require('./CircleButton.scss');
    expect(styles.CircleButton).to.be.a('string');
    expect(button.className).to.include(styles.CircleButton);
  });

  it('should render the correct className prps', () => {
    const classNames = props.className.split(' ');
    expect(button.className).to.include(classNames[0]);
    expect(button.className).to.include(classNames[1]);
  });

});
