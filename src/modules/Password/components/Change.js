import React, { Component } from 'react';
import { reduxForm, SubmissionError, Field, propTypes } from 'redux-form';
import memoize from 'lru-memoize';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { createValidator, required } from 'utils/validation';
import { RefitInput } from 'components';
import { notifSend } from 'modules/Notifs/redux';
import { updatePassword } from '../redux';

const changeValidation = createValidator({
  password: [required],
	confirm: [required]
});
memoize(10)(changeValidation);

@reduxForm({
	form: 'change',
	validate: changeValidation
})
@connect(null, { updatePassword, push, notifSend })
class Change extends Component {

  static propTypes = {

    ...propTypes
  }

	updatePassword = ({password, confirm}) => {
		const token = this.props.params.token;
		return this.props.updatePassword({token, password, confirm})
			.then((res) => {
				const message = res.message + '/n Login with your new password!'
				this.props.notifSend({ message: message, kind: 'success', dismissAfter: 5000 })
				setTimeout(() => {this.props.push('/login')}, 2000);
			})
			.catch((err) => {
				let message = err.message;
				if(message === 'jwt expired') {
					message = 'You took a bit too long resetting your password.  Try again.'
					setTimeout(() => {this.props.push('/password/forgot')}, 5000);
				}
				throw new SubmissionError({password: message})
			})
	};

	match = (confirm, {password}) => {
		if (confirm !== password) {
			return "Please confirm your new password matches!"
		}
		return undefined;
	}

	render() {
		const styles = require('../Password.scss');
		return (
  <div className={styles.content}>
    <div>
      <h1>Change your Password!</h1>
    </div>

    <div className={styles.formDiv}>
      <form onSubmit={this.props.handleSubmit(this.updatePassword)}>
        <Field type='password' name={'password'} component={RefitInput} label={'New Password'} />
        <Field type='password' validate={this.match} name={'confirm'} component={RefitInput} label={'Confirm New Password'} />
        <button className="text-center" type="submit">Done</button>
      </form>
    </div>
  </div>
		);
	}
}

export default Change;
