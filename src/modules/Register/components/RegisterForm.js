import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import registerValidation from './registerValidation';

@reduxForm({
  form: 'register',
  validate: registerValidation
})
export default class RegisterForm extends Component {
  static propTypes = {
    ...propTypes,
    codes: PropTypes.array
  }

  validateCode = (value, allValues, props) => {
    const test = value.toLowerCase();
    if(props.codes.indexOf(value) === -1) {
      return 'Wrong code!'
    }
  };

  renderInput = ({ input, label, type, meta: { touched, error } }) =>
    <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
      <label htmlFor={input.name} className="col-sm-12">{label}</label>
      <div className="col-sm-12">
        <input {...input} type={type} className="form-control" />
        {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
        {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
      </div>
    </div>;

  render() {
    const { handleSubmit, error } = this.props;
    const styles = require('../Register.scss');
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <Field 
            name="fullname" 
            type="text" 
            component={this.renderInput} 
            label="Full Name" 
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
          {/*<Field validate={this.validateCode} name="code" type="text" component={this.renderInput} label="Registration Code" />*/}
          <Field 
            name="password" 
            type="password" 
            component={this.renderInput} 
            label="Password" />
          <Field
            name="password_confirmation"
            type="password"
            component={this.renderInput}
            label="Password confirmation"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field name="credential" type="file" component={this.renderInput} label="Upload DD214"></Field>
        </fieldset>
        
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <button className="btn btn-success" type="submit">
          <i className="fa fa-sign-in" />{' '}Register
        </button>
      </form>
    );
  }
}
