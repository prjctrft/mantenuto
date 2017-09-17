import { expect } from 'chai';

import routes from './';

describe('login routes', () => {
  it('should contain one route with path "login"', () => {
    expect(routes.props.path).to.equal('login');
  });
})
