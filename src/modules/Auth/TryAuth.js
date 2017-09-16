import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import { tryRestAuth, socketAuth } from './redux'

// Token from cookie on server -> 1) Rest -> tryAuth
// Client and Already Authenticated -> 1) socket -> tryAuth
//                                     2) rest -> tryAuth

export class TryAuth extends Component {
  constructor(props) {
    super(props);
    if(__SERVER__) {
      this.props.tryRestAuth();
    }
    if(__CLIENT__) {
      this.props.tryRestAuth();
      const self = this;
      socket.on('connect', this.trySocketAuth)
    }
  }

  trySocketAuth = () => {
    if(this.props.user && !this.props.triedSocketAuth) {
      this.props.socketAuth();
    };
  };

  render() {
    return <div>{this.props.children}</div>
  }
};

export default connect((state) => ({ ...state.auth }), {
  tryRestAuth,
  socketAuth
})(TryAuth);
