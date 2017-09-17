import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { tryRestAuth, socketAuth } from './redux'

// Token from cookie on server -> 1) Rest -> tryAuth
// Client and Already Authenticated -> 1) socket -> tryAuth
//                                     2) rest -> tryAuth

export class TryAuthComponent extends Component {
  static propTypes = {
    tryRestAuth: PropTypes.func.isRequired,
    socketAuth: PropTypes.func.isRequired,
    triedSocketAuth: PropTypes.bool.isRequired,
    user: PropTypes.string,
    children: PropTypes.node.isRequired
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

  trySocketAuth = () => {
    const authenticated = !!this.props.user;
    if(authenticated && !this.props.triedSocketAuth) {
      this.props.socketAuth();
    }
  };

  render() {
    return <div>{this.props.children}</div>
  }
}

export default connect((state) => ({ ...state.auth }), {
  tryRestAuth,
  socketAuth
})(TryAuthComponent);
