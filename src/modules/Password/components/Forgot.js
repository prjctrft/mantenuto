import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm, SubmissionError, Field, propTypes } from 'redux-form';
import memoize from 'lru-memoize';
import { createValidator, email, required } from 'utils/validation';
import { forgotPassword } from '../redux';

const forgotValidation = createValidator({
  email: [email, required]
});
memoize(10)(forgotValidation);

@connect(state => ({
  resettingPassword: state.password.resettingPassword,
  passwordResetFail: state.password.passwordResetFail,
  passwordResetSuccess: state.password.passwordResetSuccess
}), { forgotPassword, push })
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
        this.props.push({pathname: `/password/reset`, query: { email }});
      })
      .catch((err) => {
        throw new SubmissionError({ email: err.response.text })
      });
  };

  renderInput = ({ input, label, type, meta: { touched, error, dirty, initial, pristine } }) => { //eslint-disable-line no-unused-vars
    return (
      <div className={`form-group ${error && touched ? 'has-error has-feedback' : ''}`}>
        <label htmlFor={input.name}>{label}</label>
        <input {...input} type={type} className='form-control' />
        {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
        {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
      </div>
    )
  }

  render() {
    const styles = require('../Password.scss');
    return (
      <div className={styles.content}>
        <h1>Forgot your password?</h1>
        <p className='lead'>No problem!</p>

        <form onSubmit={this.props.handleSubmit(this.forgotPassword)} name='resetPasswordForm'>
          <Field name={'email'} component={this.renderInput} label={'Email'} />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Body;
