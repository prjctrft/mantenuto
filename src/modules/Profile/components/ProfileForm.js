import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes } from 'redux-form';
import profileValidation from './profileValidation';

@connect(state => ({
  profile: state.form.profile
}))
@reduxForm({
  form: 'profile',
  validate: profileValidation,
  enableReinitialize: true
})
export default class ProfileForm extends Component {
  // constructor(props) {
  //   super(props);
  // }

  static propTypes = {
    ...propTypes
  }

  static fields = [
    {
      label: 'First Name',
      type: 'text',
      field: 'first'
    },
    {
      label: 'Last Name',
      type: 'text',
      field: 'last'
    },
    {
      label: 'MOS',
      type: 'text',
      field: 'mos'
    },
    {
      label: 'Username',
      type: 'text',
      field: 'username'
    },
    {
      label: 'Email',
      type: 'email',
      field: 'email'
    },
    {
      label: 'Confirm Email',
      type: 'email',
      field: 'confirmEmail'
    }
  ]

  renderInput = ({ input, label, type, meta: { touched, error, dirty, initial, pristine } }) => {
    // only display confirm email when 'email' is dirty
    if (input.name === 'confirmEmail') {
      if (!this.props.profile) {
        return null;
      }
      // make sure fields exist in state
      if (!this.props.profile.fields || !this.props.profile.fields.email) {
        return null;
      }
      // if email has not been touched
      if (!this.props.profile.fields.email.visited) {
        return null;
      }
      // if email has been touched but its value is the original value
      if (this.props.profile.values.email === this.props.profile.initial.email) {
        return null;
      }
    }
   
    return (
      <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
        <label htmlFor={input.name} className="col-sm-12">{label}</label>
        <div className="col-sm-12">
          <input {...input} type={type} className="form-control" />
          {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
          {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
        </div>
      </div>
    )
  }

  render() {
    const { user, pristine, submitting, handleSubmit, error, initialValues } = this.props;
    const styles = require('./ProfileForm.scss')
    return (
      <form className={styles.ProfileForm} onSubmit={handleSubmit}>
        {
          this.constructor.fields.map((field) => {
            return (
              <Field key={field.field} name={field.field} type={field.type} component={this.renderInput} label={field.label} />
            )
          })
        }
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <button className={styles.password} type="button">
          Change Password
        </button>
        <button disabled={pristine || submitting} /*className="btn btn-success"*/ type="submit">
          Done{' '}<i className="fa fa-check-circle-o" />
        </button>
      </form>
    );
  }
}
