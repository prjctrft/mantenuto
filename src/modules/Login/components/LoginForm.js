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

  renderInput = ({ input, label, type, placeholder, meta: { touched, error } }) =>
    <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
      {/*<label htmlFor={input.name} className="col-sm-2">{label}</label>*/}
      <div className="col-sm-12">
        <input {...input} type={type} className="form-control" placeholder={placeholder}/>
        {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
        {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
      </div>
    </div>;

  render() {
    const { handleSubmit, error } = this.props;
    const styles = require('../Login.scss');

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Field name="email" type="text" component={this.renderInput} label="Email" placeholder="Username..." />
        <Field name="password" type="password" component={this.renderInput} label="Password" placeholder="Password..." />
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <div>
          <a href="#">Forgot password</a>
          <button className="btn btn-success" type="submit">
            <i className="fa fa-sign-in" />{' '}Log In
          </button>
        </div>
        
      </form>
    );
  }
}
