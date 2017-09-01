import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { SubmissionError } from 'redux-form';

import LoginForm from './components/LoginForm';
import FacebookLogin from './components/FacebookLogin';
import { login } from 'redux/modules/auth';
import { notifSend } from '../Notifs/redux';

@connect(null, { notifSend, login, push })
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    // oauthLogin: PropTypes.func,
    logout: PropTypes.func,
    notifSend: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object
  }

  // onFacebookLogin = (err, data) => {
  //   if (err) return;
  //   this.props.oauthLogin('facebook', data)
  //     .then(this.successLogin)
  //     .catch(error => {
  //       if (error.message === 'Incomplete oauth registration') {
  //         this.context.router.push({
  //           pathname: '/register',
  //           state: { oauth: error.data }
  //         });
  //       }
  //     });
  // };

  login = (data) => {
    return this.props.login(data)
      .then(this.success)
      .catch(this.fail)
  };

  success = data => {
    this.props.notifSend({
      message: 'You\'re logged !',
      kind: 'success',
      dismissAfter: 5000
    });
    let next = '/';
    if (this.props.location.query && this.props.location.query.next) {
      next = this.props.location.query.next;
    }
    this.props.push(next);
  };

  fail = foo => {
    throw new SubmissionError({password: 'Incorrect password.'})
  }

  render() {
    const { logout } = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.login}>
        <Helmet title="Login" />
        <div className='container'>
          {/* <img /> put No Longer Fight Alone Graphic here */}
          <div className='text-center'>
            <h1>Login</h1>
            <LoginForm onSubmit={this.login} />
          </div>
        </div>
      </div>
    );
  }
}
