import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { populateUser } from 'modules/user/redux';
import { tryRestAuth, socketAuth } from './redux';
// Token from cookie on server -> 1) Rest -> tryAuth
// Client and Already Authenticated -> 1) socket -> tryAuth
//                                     2) rest -> tryAuth

export class TryAuthComponent extends Component {
  static propTypes = {
    tryRestAuth: PropTypes.func.isRequired,
    socketAuth: PropTypes.func.isRequired,
    triedSocketAuth: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    populateUser: PropTypes.func.isRequired,
    userPopulated: PropTypes.bool.isRequired,
    userPopulating: PropTypes.bool.isRequired,
    userId: PropTypes.string
  }

  constructor(props) {
    super(props);
    if(__SERVER__) {
      this.props.tryRestAuth();
    }
    if(__CLIENT__) {
      this.props.tryRestAuth();
      socket.on('connect', this.trySocketAuth)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      if (!nextProps.userPopulated && !nextProps.userPopulating) {
        this.props.populateUser(nextProps.userId);
      }
    }
  }

  trySocketAuth = () => {
    if(this.props.authenticated && !this.props.triedSocketAuth) {
      this.props.socketAuth();
    }
  };

  render() {
    return <div>{this.props.children}</div>
  }
}

export default connect((state) => {
  const userId = state.auth.user;
  const { userPopulated, userPopulating } = state.user;
  return {
    authenticated: !!state.auth.user,
    userId, userPopulated, userPopulating
  }
}, {
  tryRestAuth,
  socketAuth,
  populateUser
})(TryAuthComponent);
