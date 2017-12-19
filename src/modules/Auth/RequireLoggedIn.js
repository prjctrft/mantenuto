import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { populateUser } from 'modules/user/redux';
import Splash from 'components/Splash';

export class RequireLoggedInComponent extends Component {

  static propTypes = {
    tryingAuth: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    triedAuth: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    push: PropTypes.func.isRequired
  }

  componentDidMount() {
    // authenticated, don't redirect
    if(this.props.authenticated) {
      return;
    }
    // if auth has been tried OR auth won't be tried, redirect
    if(this.props.triedAuth ||
      !this.props.triedAuth && !this.props.tryingAuth) {
      this.redirect()
    }
  }

  redirect = () => {
    this.props.push({
      pathname: '/login',
      query: {next: this.props.location.pathname}
    });
  }

  render() {
    if (this.props.authenticated) {
      return <div>{ this.props.children }</div>
    }
    if (this.props.tryingAuth) {
      // change to spinner
      return <Splash />;
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  const { tryingAuth, triedAuth } = state.auth;
  const authenticated = !!state.auth.user;
  return {
    tryingAuth,
    triedAuth,
    authenticated
  }
}

export default connect(mapStateToProps, { push, populateUser })(RequireLoggedInComponent);
