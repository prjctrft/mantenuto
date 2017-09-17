import { expect } from 'chai';

import routes from './'

describe('password routes', () => {

  it('the routes for the password module should exist', () => {
    expect(routes.props.path).to.equal('password');
  });

  const children = routes.props.children;

  it('/password should have 4 routes', () => {
    expect(children).to.have.lengthOf(4);
  });

  it('the route "/password" should redirect to "/password/forgot"', () => {
    const route = children[0];
    expect(route.type.displayName).to.equal('IndexRedirect');
    expect(route.props.to).to.equal('forgot');
  });

      // <Route path='forgot' component={Forgot} />
      // <Route path='confirm' component={Confirm} />
      // <Route path=':token' component={Token} />

  it('the route "/password/forgot" should exist', () => {
    const route = children[1];
    expect(route.type.displayName).to.equal('Route');
    expect(route.props.path).to.equal('forgot');
  });

  it('the route "/password/confirm" should exist', () => {
    const route = children[2];
    expect(route.type.displayName).to.equal('Route');
    expect(route.props.path).to.equal('confirm');
  });

  it('the route "/password/:token" should exist', () => {
    const route = children[3];
    expect(route.type.displayName).to.equal('Route');
    expect(route.props.path).to.equal(':token');
  });

})
