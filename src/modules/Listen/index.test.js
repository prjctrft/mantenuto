import { expect } from 'chai';

import routes from './'

describe('listen routes', () => {

  it('the routes for the listen module should exist', () => {
    expect(routes.props.path).to.equal('listen');
  });

  const children = routes.props.children;

  it('listen module should have no child routes', () => {
    expect(children).to.be.undefined;
  });

});
