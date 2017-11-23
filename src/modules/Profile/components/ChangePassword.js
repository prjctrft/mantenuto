import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes } from 'redux-form';
// import profileValidation from './profileValidation';
import { RefitInput } from 'components';

@connect(state => ({
  password: state.form.password
}))
@reduxForm({
  form: 'password',
  enableReinitialize: true
})
export default class ChangePassword extends Component {

  static propTypes = {
    ...propTypes
  }

	match = (confirm, {newPassword}) => {
    if (confirm !== newPassword) {
			return "Please confirm your new password matches!"
		}
		return undefined;
	}

  render() {
    const { pristine, submitting, handleSubmit, error} = this.props; //eslint-disable-line no-unused-vars
    const styles = require('./ChangePassword.scss')
    return (
      <div className={styles.ChangePassword}>
        {!this.props.changePassword ?
          <div className='text-center'>
            <button onClick={this.props.toggleChangePassword} className={styles.password} type="button">
              Change Password
            </button>
          </div>
            : null }
      {this.props.changePassword ?
        <div className='row justify-content-center'>
          <div className='col-md-8 col-12'>
            <form onSubmit={handleSubmit}>
              <Field type='password' name={'password'} component={RefitInput} label={'Current Password'} />
              <Field type='password' name={'newPassword'} component={RefitInput} label={'New Password'} />
              <Field type='password' validate={this.match} name={'confirmPassword'} component={RefitInput} label={'Confirm Password'} />
              <div className='row'>
                <div className='col text-center'>
                  <button className='btn btn-success'>Change</button>
                </div>
                <div className='col text-center'>
                  <button onClick={this.props.toggleChangePassword} className='btn btn-default'>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        : null}
      </div>
    );
  }
}
