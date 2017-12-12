import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Compatibility from 'modules/Compatibility';
import Notifs from 'modules/Notifs';
import Call from 'modules/Call';
import Messages from 'modules/Messages';
import { populateUser } from 'modules/user/redux';
import { tryRestAuth, tryRestAndSocketAuth } from './redux';
// Token from cookie on server -> 1) Rest -> tryAuth
// Client and Already Authenticated -> 1) socket -> tryAuth
//                                     2) rest -> tryAuth

export class TryAuthComponent extends Component {
  static propTypes = {
    tryRestAuth: PropTypes.func.isRequired,
    tryRestAndSocketAuth: PropTypes.func.isRequired,
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
      this.props.tryRestAndSocketAuth();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      if (!nextProps.userPopulated && !nextProps.userPopulating) {
        this.props.populateUser(nextProps.userId);
      }
    }
  }

  render() {
    if(this.props.tryingAuth) {
      return <h1>Loading...</h1>
    }
    if(this.props.authenticated) {
      return (
        <div>
          <Notifs />
          <Call />
          <Messages />
          <Compatibility />
          {this.props.children}
        </div>
      )
    }

    return <div>{this.props.children}</div>
  }
}

export default connect((state) => {
  const userId = state.auth.user;
  const { tryingAuth } = state.auth;
  const { userPopulated, userPopulating } = state.user;
  return {
    authenticated: !!state.auth.user,
    tryingAuth,
    userId,
    userPopulated,
    userPopulating
  }
}, {
  tryRestAuth,
  tryRestAndSocketAuth,
  populateUser
})(TryAuthComponent);
