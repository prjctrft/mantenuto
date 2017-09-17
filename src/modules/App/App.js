import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import config from 'config';
import { logout } from 'modules/Auth/redux';
import { clearUser, populateUser } from './redux';
import Notifs from '../Notifs';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

@connect(
  state => ({
    id: state.auth.user,
    authenticated: !!state.auth.user,
    user: state.user.user
  }), { populateUser, logout, clearUser, push })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.object.isRequired,
    notifs: PropTypes.object,
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    id: PropTypes.string,
    location: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    // TODO move this to Auth
    this.populateUser(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.populateUser(nextProps);
  }

  populateUser = (props) => {
    // TODO move this to Auth
    if (Object.keys(props.user).length === 0 && props.authenticated) {
      props.populateUser(props.id);
    }
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
    const user = this.props.user;
    const { pathname } = this.props.location;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navigation authenticated={authenticated} handleLogout={this.handleLogout} pathname={pathname} user={user} />
        <Notifs />
        <div className={styles.appContent}>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}
