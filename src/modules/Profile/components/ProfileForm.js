import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes } from 'redux-form';
import profileValidation from './profileValidation';
import { RefitInput } from 'components';
import { match, email } from 'utils/validation';
import { checkUsername } from 'modules/user/redux';

@connect(state => ({
  profile: state.form.profile
}))
@reduxForm({
  form: 'profile',
  validate: profileValidation,
  enableReinitialize: true
})
export default class ProfileForm extends Component {
  static propTypes = {
    ...propTypes
  }

  checkbox = ({className}) => {
    return <input className={className} />
  }

  validateUsername = (e) => {
    const username = e.target.value;
    this.props.dispatch(startAsyncValidation('register'));
    return checkUsername(username).then(({ message }) => {
      const errors = {};
      this.props.dispatch(touch('register', 'username'))
      if(message) {
        errors.username = message;
      }
      this.props.dispatch(stopAsyncValidation('register', errors));
    })
  };

  resetEmailField = () => {
    this.props.profile.values.email = this.props.profile.initial.email;
  }

  renderConfirmEmail = () => {
    const form = this.props.profile;
    if(form && form.fields) {
      if(form.fields.email) {
        if(form.initial.email !== form.values.email) {
          return (
            <div>
              <Field name='confirmEmail' validate={this.validateConfirm} type='text' component={RefitInput} label='Confirm Email' />
              <p className='text-center'>
                <button onClick={this.resetEmailField} className='btn btn-danger'>Cancel?</button>
              </p>
            </div>
          )
        }
      }
    }
    return null;
  }

  validateConfirm = (value, allValues, props) => {
    let error;
    error = match('email')(value, allValues)
    error = email(value);
    if(!value) {
      error =  'Confirm Email is required when changing your Email address.'
    }
    return error;
  }

  render() {
    const { user, pristine, submitting, handleSubmit, error, initialValues } = this.props; //eslint-disable-line no-unused-vars
    const styles = require('./ProfileForm.scss')
    return (
      <div className='row justify-content-center'>
        <div className='col-md-8 col-12'>
          <form className={styles.ProfileForm} onSubmit={handleSubmit}>
            <Field name='first' type='text' component={RefitInput} label='First Name' />
            <Field name='last' type='text' component={RefitInput} label='Last Name' />
            <Field name='mos' type='text' component={RefitInput} label='MOS' />
            <Field name='username' onChange={this.validateUsername} type='text' component={RefitInput} label='Username' />
            <Field name='email' type='text' component={RefitInput} label='Email' />
            {this.renderConfirmEmail()}
            <div className={`${styles.checkbox} text-center`}>
              <p>Injury <span>(optional)</span></p>
              <div className='row justify-content-center'>
                <div className='col-6 text-center'>
                  <label htmlFor='combat'>
                    <Field type='radio' name='injury' value='combat' className={styles.checkbox} component='input' />
                    Combat
                  </label>
                </div>
                <div className='col-6 text-center'>
                  <label htmlFor='noncombat'>
                    <Field type='radio' name='injury' value='nonCombat' className={styles.checkbox} component='input' />
                    Non-combat
                  </label>
                </div>
              </div>
            </div>
            {error && <p className="text-danger"><strong>{error}</strong></p>}
            <p className='text-center'>
              <button disabled={pristine || submitting} className="btn btn-secondary" type="submit">
                Update Profile
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
