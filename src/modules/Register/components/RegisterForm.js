import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import registerValidation from './registerValidation';

@reduxForm({
  form: 'register',
  validate: registerValidation
})
export default class RegisterForm extends Component {
  static propTypes = {
    ...propTypes
  }

  renderInput = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
        <div className='col-sm-12'>
          <label htmlFor={input.name}>{label}</label>
        </div>
        <div className='col-sm-12'>
          <input {...input} type={type} className="form-control" />
          {error === 'Required' && !touched && <span className="text-success form-control-feedback">*</span>}
          {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
          {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, error } = this.props;
    const styles = require('./RegisterForm.scss');
    return (
      <form className="row" onSubmit={handleSubmit}>
        <fieldset className='col-sm-6'>
          <Field
            name="first"
            type="text"
            component={this.renderInput}
            label="First Name"
          />
          <Field
            name="last"
            type="text"
            component={this.renderInput}
            label="Last Name"
          />
          <Field
            name="username"
            type="text"
            component={this.renderInput}
            label="Username"
          />
          <Field
            name="email"
            type="email"
            component={this.renderInput}
            label="Email"
          />
          {/* <Field
            name="password"
            type="password"
            component={this.renderInput}
            label="Password"
          />
          <Field
            name="password_confirmation"
            type="password"
            component={this.renderInput}
            label="Password confirmation"
          /> */}
        </fieldset>
        <fieldset className={`col-sm-6 ${styles.credential}`}>
          <div className='row'>
            <Field name="credential" type="file" component={this.renderInput} label="Upload DD214"></Field>
          </div>
        </fieldset>

        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <button className="btn btn-success" type="submit">
          <i className="fa fa-sign-in" />{' '}Register
        </button>
      </form>
    );
  }
}
