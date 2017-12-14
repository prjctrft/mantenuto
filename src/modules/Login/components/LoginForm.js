import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, propTypes } from 'redux-form';
import { RefitInput } from 'components';
import loginValidation from './loginValidation';

@reduxForm({
  form: 'login',
  validate: loginValidation
})
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes
  }

  render() {
    const { handleSubmit, error } = this.props;
    const styles = require('./LoginForm.scss');

    return (
      <form className={`${styles.LoginForm} form-horizontal`} onSubmit={handleSubmit}>
        <Field name="lookup" type="text" component={RefitInput} label="Username or Email" placeholder="Login with Username or Email" />
        <Field name="password" type="password" component={RefitInput} label="Password" placeholder="Password..." />
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <div className={styles.buttonWrapper}>
          <button className="btn btn-success" type="submit">
            <i className="fa fa-sign-in" />{' '}Log In
          </button>
          <hr />
          <Link to={'password'}>Forgot password?</Link>
        </div>
      </form>
    );
  }
}
