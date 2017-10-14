import { expect } from 'chai';

import routes from './'

describe('listen routes', () => {

  it('the routes for the listen module should exist', () => {
    expect(routes.props.path).to.equal('listen');
  });

  it('should render the <Listen> component', () => {
    expect(routes.props.component.WrappedComponent.name).to.equal('ListenComponent');
  });

  it('listen module should have no child routes', () => {
    expect(routes.props.children).to.be.undefined;
  });

});
