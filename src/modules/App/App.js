import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Alert from 'react-bootstrap/lib/Alert';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { clearUser } from './redux';
// import { Notifs, InfoBar } from 'components';
import Notifs from '../Notifs';
import { push } from 'react-router-redux';
import config from 'config';
import { populateUser } from './redux';
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
    user: state.user.user,
    socketAuthenticated: state.auth.socketAuthenticated
  }), { populateUser, logout, clearUser, push })
  // }),
  // { logout, pushState: push })
export default class App extends Component {
  // static propTypes = {
  //   children: PropTypes.object.isRequired,
  //   user: PropTypes.object,
  //   notifs: PropTypes.object,
  //   logout: PropTypes.func.isRequired,
  //   pushState: PropTypes.func.isRequired
  // };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (!this.props.user && this.props.id && this.props.socketAuthenticated) {
      this.populateUser(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user && nextProps.id) {
      this.populateUser(nextProps);
    }
  }

  populateUser = (props) => {
    props.populateUser(props.id);
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout().then(() => {
      this.props.clearUser();
      this.props.push('/login');
    });
  };

  render() {
    const { user, notifs, children } = this.props;

    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
              {/* <IndexLink to="/" activeStyle={{ color: '#33e0ff' }}> */}
                <div className={styles.brand} />
              </IndexLink>
            </Navbar.Brand>

            { user ? <Navbar.Toggle /> : null }
          </Navbar.Header>

          { user ?
            <Navbar.Collapse>
              <Nav navbar pullRight>
                <LinkContainer to="/profile">
                  <NavItem eventKey={0}>Profile</NavItem>
                </LinkContainer>
                {/* {!user && <LinkContainer to="/login">
                  <NavItem eventKey={5}>Login</NavItem>
                </LinkContainer>} */}
                {/* {!user && <LinkContainer to="/register">
                  <NavItem eventKey={6}>Register</NavItem>
                </LinkContainer>} */}
                <LinkContainer to="/logout">
                  <NavItem eventKey={1} className="logout-link" onClick={this.handleLogout}>
                    Logout
                  </NavItem>
                </LinkContainer>
              </Nav>
              <Nav navbar pullRight>
                {user && <span className="navbar-text">
                  Hello <strong>{user.first}!</strong>
                </span>}
              </Nav>
            </Navbar.Collapse>
          : null }
        </Navbar>

        <div className={styles.appContent}>
          <div className="container">
            <Notifs className={styles.notifs} />
          </div>
          { children }
        </div>
      </div>
    );
  }
}
