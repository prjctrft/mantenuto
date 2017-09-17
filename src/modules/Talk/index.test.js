import { expect } from 'chai';

import routes from './'

describe('talk routes', () => {

  it('the routes for the talk module should exist', () => {
    expect(routes.props.path).to.equal('talk');
  });

  const children = routes.props.children;

  it('talk module should have no child routes', () => {
    expect(children).to.be.undefined;
  });

});
