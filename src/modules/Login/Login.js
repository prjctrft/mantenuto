import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
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
    this.props.login(data).then(this.success)
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

  // FacebookLoginButton = ({ facebookLogin }) =>
  //   <button className="btn btn-primary" onClick={facebookLogin}>
  //     Login with <i className="fa fa-facebook-f" />
  //   </button>;

  render() {
    const { logout } = this.props;
    return (
      <div className="container">
        <Helmet title="Login" />
        <h1>Login</h1>
        <div>
          <LoginForm onSubmit={this.login} />
          <hr />
          <Link to={'/password/forgot'}>Forgot password?</Link>
          {/* <p/>
          <FacebookLogin
            appId="635147529978862"
            autoLoad={true}
            fields="name,email,picture"
            onLogin={this.onFacebookLogin}
            component={this.FacebookLoginButton}
          /> */}
        </div>
      </div>
    );
  }
}
