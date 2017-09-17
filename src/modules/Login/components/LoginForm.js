import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import loginValidation from './loginValidation';

@reduxForm({
  form: 'login',
  validate: loginValidation
})
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes
  }

  renderInput = ({ input, label, type, placeholder, meta: { touched, error } }) => //eslint-disable-line
    (<div className={`form-group ${error && touched ? 'has-error has-feedback' : ''}`}>
      <input {...input} type={type} className="form-control" placeholder={placeholder} />
      {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
      {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
    </div>);

  render() {
    const { handleSubmit, error } = this.props;
    const styles = require('./LoginForm.scss');

    return (
      <form className={`${styles.LoginForm} form-horizontal`} onSubmit={handleSubmit}>
        <Field name="email" type="text" component={this.renderInput} label="Email" placeholder="Username..." />
        <Field name="password" type="password" component={this.renderInput} label="Password" placeholder="Password..." />
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <div className={styles.buttonWrapper}>
          <button className="btn btn-default" type="submit">
            <i className="fa fa-sign-in" />{' '}Log In
          </button>
          <hr />
          <a href='/foobar'>Forgot password</a>
        </div>
      </form>
    );
  }
}
