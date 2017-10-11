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
      label: 'E-mail',
      type: 'email',
      field: 'email'
    },
    {
      label: 'Confirm E-mail',
      type: 'email',
      field: 'confirmEmail'
    }
  ]

  renderInput = ({ input, label, type, meta: { touched, error, dirty, initial, pristine } }) => { //eslint-disable-line no-unused-vars
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
        <label htmlFor={input.name} className='col-sm-12'>{label}</label>
        <div className="col-sm-12">
          <input {...input} type={type} className='form-control' />
          {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
          {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
        </div>
      </div>
    )
  }

  render() {
    const { user, pristine, submitting, handleSubmit, error, initialValues } = this.props; //eslint-disable-line no-unused-vars
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
        <div className={styles.injury}>
          <p>Injury <span>(optional)</span></p>

          <div className={styles.combat}>
            <input type='checkbox' name='combat' />
            <label htmlFor='combat'>Combat</label>
          </div>

          <div className={styles.noncombat}>
            <input type='checkbox' name='noncombat' />
            <label htmlFor='noncombat'>Non-combat</label>
          </div>
        </div>
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <button className={styles.password} type="button">
          Change Password
        </button>
        <button disabled={pristine || submitting} /*className="btn btn-success"*/ type="submit">
          Done
        </button>
      </form>
    );
  }
}
