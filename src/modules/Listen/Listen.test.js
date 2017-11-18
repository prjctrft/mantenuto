import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {ListenComponent} from './Listen';

describe('<ListenComponent />', () => {
  let component,
    updateUser,
    user;

  beforeEach(() => {
    user = {
      id: 1234
    };
    updateUser = jest.fn();
    component = mount(<ListenComponent updateUser={updateUser} user={user} />);
  })

  it('should render <Preferences /> by default', () => {
    expect(component.find('Preferences').exists()).to.be.true;
  });

  it('call handleAnytime', () => {
    component.instance().handleAnytime();
    expect(updateUser.mock.calls[0][0]).to.equal(user.id)
    expect(updateUser.mock.calls[0][1]).to.deep.equal({listenAnytime: true})
  });

  it('call handleNow', () => {
    component.instance().handleNow();
    expect(updateUser.mock.calls[0][0]).to.equal(user.id)
    expect(updateUser.mock.calls[0][1]).to.deep.equal({listenAnytime: false})
  });

  // TODO, cases where this is
  // expect(component.find('Connecting').exists()).to.be.true;
  // expect(component.find('Preferences').exists()).to.be.false;

  // expect(component.find('Connecting').exists()).to.be.true;
  // expect(component.find('Preferences').exists()).to.be.false;

  // TODO, test { updateUser } from 'modules/user/redux';
  // should take proper parameters
});
