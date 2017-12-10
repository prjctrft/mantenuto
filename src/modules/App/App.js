import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import config from 'config';
import app from 'app';
import { logout } from 'modules/Auth/redux';

import { clearUser } from 'modules/user/redux';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

@connect(
  state => ({
    authenticated: !!state.auth.user
  }), { logout, clearUser, push })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidCatch() {
    //TODO
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout().then(() => {
      this.props.clearUser();
      this.props.push('/login');
    });
  };

  render() {
    const authenticated = this.props.authenticated;
    const { pathname } = this.props.location;
    require('theme/index.global.scss');
    // do not display header in rooms
    if(pathname.split('/')[1] === 'rooms') {
      return(
        <div>
          <Helmet {...config.app.head} />
          <div>
            { this.props.children }
          </div>
        </div>
        )
    }
    return (
      <div>
        <Helmet {...config.app.head} />
        <Navigation authenticated={authenticated} handleLogout={this.handleLogout} pathname={pathname} />
        <div>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}
