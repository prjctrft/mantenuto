import React from 'react';
import { expect } from 'chai';

import routes from './'


  // <Route path='register'>
  //   <IndexRoute component={Register} />
  //   <Route path=':type' component={RegisterType} />
  // </Route>

describe('register routes', () => {

  it('the routes for the register module should exist', () => {
    expect(routes.props.path).to.equal('register');
  });

  const children = routes.props.children;

  it('/register should have 2 routes', () => {
    expect(children).to.have.lengthOf(2);
  });

  it('the route "/" should exist', () => {
    const route = children[0];
    expect(route.type.displayName).to.equal('IndexRoute');
  });

  it('the route "/regiser/:type" should exist', () => {
    const route = children[1];
    expect(route.type.displayName).to.equal('Route');
    expect(route.props.path).to.equal(':type');
  });

});
