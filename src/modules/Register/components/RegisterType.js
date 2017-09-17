import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import RegisterForm from './RegisterForm';
import { register, login } from '../redux';
import { notifSend } from '../../Notifs/redux';
// import { getCodes } from './redux';

@connect(null, { push, notifSend, register, login })
export default class RegisterType extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }

  componentDidMount() {
    // this.props.getCodes();
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  register = data => {

    const newUser = data;
    newUser.verification = data.verification[0];
    this.props.register(data)
      .then(this.success)
  };

  success = () => {
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
      <div className={styles.wrapper}>
        <Helmet title="Register" />
        <div className={styles.masthead}>
          <div className={styles.width}>
            <h1 className={styles.heading}>Register</h1>
            <RegisterForm onSubmit={this.register} initialValues={this.getInitialValues()} />
          </div>
        </div>
      </div>
    );
  }
}
