import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import RegisterForm from './components/RegisterForm';
import { register, login } from 'redux/modules/auth';
import { notifSend } from '../Notifs/redux';
import { getCodes } from './redux';

@connect(
  (state) => ({
    codes: state.register.codes
  }),
  { push, notifSend, register, login, getCodes })
export default class Register extends Component {
  static propTypes = {
    location: PropTypes.object,
    register: PropTypes.func,
    notifSend: PropTypes.func
  }

  componentDidMount() {
    this.props.getCodes();
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  register = data => {
    this.props.register(data)
      // .then(this.props.login(data))
      .then(this.success)
  };

  success = result => {
    this.props.notifSend({
      message: 'You\'re now registered !',
      kind: 'success',
      dismissAfter: 5000
    });
    this.props.push('/registered');
    // let next = '/';
    // if (this.props.location.query && this.props.location.query.next) {
    //   next = this.props.location.query.next;
    // }
    // this.props.push(next);
  }

  render() {
    const styles = require('./Register.scss');
    return (
      <div className={styles.register}>
        <div className="container">
          <Helmet title="Register" />
          <h1>Register</h1>
          <RegisterForm codes={this.props.codes} onSubmit={this.register} initialValues={this.getInitialValues()} />
          <hr />
          <h2>Already a member?</h2>
          <button className='btn btn-default'
            onClick={(e) => this.props.push(`/login${this.props.location.search}`)}>Login</button>
        </div>
      </div>
      
    );
  }
}
