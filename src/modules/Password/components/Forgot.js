import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm, SubmissionError, Field, propTypes } from 'redux-form';
import memoize from 'lru-memoize';
import { RefitInput } from 'components';
import { createValidator, email, required } from 'utils/validation';
import { logout } from 'modules/Auth/redux';
import { forgotPassword } from '../redux';

const forgotValidation = createValidator({
  email: [email, required]
});
memoize(10)(forgotValidation);

@connect(state => ({
  resettingPassword: state.password.resettingPassword,
  passwordResetFail: state.password.passwordResetFail,
  passwordResetSuccess: state.password.passwordResetSuccess
}), { forgotPassword, logout, push })
@reduxForm({
  form: 'forgotPassword',
  validate: forgotValidation,
})
class Body extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    ...propTypes
  }


  forgotPassword = (form) => {
    const { email } = form;
    return this.props.forgotPassword(email)
      .then(() => {
        this.props.logout()
      })
      .then(() => {
        this.props.push({pathname: `/password/reset`, query: { email }});
      })
      .catch((err) => {
        throw new SubmissionError({ email: err.response.text })
      });
  };

  render() {
    const styles = require('../Password.scss');
    return (
      <div className={styles.content}>
        <h1>Forgot your password?</h1>
        <p className='lead'>No problem!</p>

        <form onSubmit={this.props.handleSubmit(this.forgotPassword)} name='resetPasswordForm'>
          <Field size='lg' name={'email'} component={RefitInput} label={'Email'} />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Body;
