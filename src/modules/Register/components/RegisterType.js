import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import RegisterForm from './RegisterForm';
import { register, login } from '../redux';
import { notifSend } from '../../Notifs/redux';
// import { getCodes } from './redux';

@connect(null, { push, notifSend, register, login })
export default class Register extends Component {
  static propTypes = {
    location: PropTypes.object,
    register: PropTypes.func,
    notifSend: PropTypes.func
  }

  componentDidMount() {
    // this.props.getCodes();
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  register = data => {
    debugger;
    const newUser = data;
    newUser.verification = data.verification[0];
    this.props.register(data)
      .then(this.success)
  };

  success = result => {
    this.props.notifSend({
      message: 'You\'re now registered !',
      kind: 'success',
      dismissAfter: 5000
    });
    this.props.push('/registered');
  }

  render() {
    const styles = require('./RegisterType.scss');
    return (
      <div className={styles.register}>
        <div className={`${styles.background} container`}>
          <Helmet title="Register" />
          <h1>Register</h1>
          <RegisterForm onSubmit={this.register} initialValues={this.getInitialValues()} />
        </div>
      </div>

    );
  }
}
