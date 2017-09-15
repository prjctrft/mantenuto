import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { IndexLink } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import Alert from 'react-bootstrap/lib/Alert';
import Helmet from 'react-helmet';
import { logout } from 'modules/Auth/redux';
import { clearUser } from './redux';
// import { Notifs, InfoBar } from 'components';
import Notifs from '../Notifs';
import { push } from 'react-router-redux';
import config from 'config';
import { populateUser } from './redux';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

// import { asyncConnect } from 'redux-connect';

// @asyncConnect([{
//   promise: ({ store: { dispatch, getState } }) => {
//     const promises = [];
//     const state = getState();
//     if (!isAuthLoaded(state)) {
//       promises.push(dispatch(loadAuth(state, dispatch)));
//     }
//     if (!isInfoLoaded(state)) {
//       promises.push(dispatch(loadInfo()));
//     }
//     return Promise.all(promises);
//   }
// }])
@connect(
  state => ({
    notifs: state.notifs,
    id: state.auth.user,
    user: state.user.user
  }), { populateUser, logout, clearUser, push })
  // }),
  // { logout, pushState: push })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    notifs: PropTypes.object,
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.populateUser(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.populateUser(nextProps);
  }

  populateUser = (props) => {
    if (Object.keys(props.user).length === 0 && props.id) {
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
    const { notifs, children } = this.props;
    const authenticated = this.props.id;
    const user = this.props.user
    const { pathname } = this.props.location;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navigation authenticated={authenticated} handleLogout={this.handleLogout} pathname={pathname} user={user} />
        <Notifs className={styles.notifs} />
        <div className={styles.appContent}>
          { children }
        </div>
        <Footer />
      </div>
    );
  }
}
