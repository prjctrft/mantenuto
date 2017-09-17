import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { SubmissionError } from 'redux-form';

import { login } from 'modules/Auth/redux';
import { notifSend } from 'modules/Notifs/redux';
import LoginForm from './components/LoginForm';

export class Login extends Component {
  static propTypes = {
    notifSend: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  login = (data) => {
    return this.props.login(data)
      .then(this.success)
      .catch(this.fail)
  };

  success = () => {
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

  fail = () => {
    // TODO - better feedback here, what if username does not exist?
    throw new SubmissionError({ password: 'Incorrect password.' });
  }

  render() {
    const styles = require('./Login.scss');
    return (
      <div className={styles.login}>
        <Helmet title='Login' />
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

export default connect(null, { notifSend, login, push })(Login);
