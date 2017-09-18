import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import client from 'app';

import createStore from 'redux/create';

import SendEmail from './SendEmail';

describe('<SendEmail />', () => {
  const mockStore = {
  };

  const store = createStore(browserHistory, client, mockStore);
  const onButtonClick = jest.mock();
  const connectedComponent = mount(
    <Provider store={store} key="provider">
      <SendEmail onButtonClick={onButtonClick} />
    </Provider>
  );

  const component = connectedComponent.find(SendEmail);

  it('should render correctly', () => { expect(component.exists()).to.be.true; });

  // it('should render large container <div>', () => {
  //   const containerDiv = component.find('div').at(0).children();
  //
  //   expect(component.find('.content').name()).to.equal('div');
  //   expect(containerDiv).has.length(2);
  //   expect(containerDiv.first().name()).to.equal('Header');
  //   expect(containerDiv.last().name()).to.equal('div');
  // });

  it('should render <div> containing <h1 class="checkEmail">', () => {
    const headerDiv = component.find('div').at(1);
    const headerDivChildren = component.find('div').at(1).children().first();

    expect(headerDiv.exists()).to.be.true;
    expect(headerDiv.children()).has.length(1);

    expect(headerDivChildren.name()).to.equal('h1');
    expect(headerDivChildren.hasClass('checkEmail')).to.be.true;
    expect(headerDivChildren.text()).to.equal('Check your email');
  });

  it('should render <div> containing two <p> & one <a>', () => {
    const bodyDiv = component.find('div').at(2);
    const firstParagraph = bodyDiv.children().first();
    const firstParagraphChild = bodyDiv.children().first().children().first();
    const secondParagraph = bodyDiv.children().at(1);
    const secondParagraphChild = bodyDiv.children().at(1).children().first()
    const link = bodyDiv.children().last();
    const linkChild = bodyDiv.children().last().children().first();

    expect(bodyDiv.exists()).to.be.true;
    expect(bodyDiv.children()).has.length(3);

    expect(firstParagraph.exists()).to.be.true;
    expect(firstParagraph.name()).to.equal('p');
    expect(firstParagraphChild.name()).to.equal('strong');
    expect(firstParagraphChild.text()).to.not.be.empty;

    expect(secondParagraph.exists()).to.be.true;
    expect(secondParagraph.name()).to.equal('p');
    expect(secondParagraphChild.exists()).to.be.true;
    expect(secondParagraphChild.name()).to.equal('strong');
    expect(secondParagraphChild.text()).to.not.be.empty;

    expect(link.exists()).to.be.true;
    expect(link.name()).to.equal('a');
    expect(linkChild.exists()).to.be.true;
    expect(linkChild.name()).to.equal('strong');
    expect(linkChild.text()).to.equal('I didn\'t receive the email');
  });
});
