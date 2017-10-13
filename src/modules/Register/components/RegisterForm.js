import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  touch, startAsyncValidation, stopAsyncValidation,
  reduxForm, Field, propTypes
} from 'redux-form';
import { checkUsername } from 'modules/user/redux';
import registerValidation from './registerValidation';

@reduxForm({
  form: 'register',
  validate: registerValidation
})
class RegisterForm extends Component {
  static propTypes = {
    ...propTypes,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  validateUsername = (e) => {
    const username = e.target.value;
    if(username && username.length > 3) {
      this.props.dispatch(startAsyncValidation('register'));
      return checkUsername(username).then(({ message }) => {
        const errors = {};
        if(message) {
          errors.username = message;
          this.props.dispatch(touch('register', 'username'))
        }
        this.props.dispatch(stopAsyncValidation('register', errors));
      })
    }
  };

  renderInput = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className={`form-group ${error && touched ? 'has-error has-feedback' : ''}`}>
        {/* <div className='col-xs-12'> */}
        <label className='control-label' htmlFor={input.name}>{label}</label>
        {/* </div>
        <div className='col-xs-12'> */}
        <input {...input} type={type} className="form-control" />
        {error === 'Required' && !touched && <span className="text-success form-control-feedback">*</span>}
        {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
        {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
        {/* </div> */}
      </div>
    );
  }

  renderVerification = ({ styles, input, label, meta: { touched, error } }) => {
    const icUpload = require('../assets/ic_upload.png');
    return (
      <div className={`form-group ${error && touched ? 'has-error has-feedback' : ''}`}>
        <div className='col-xs-12'>
          <div className={styles.credentialBox}>
            <div className={`${styles.labelWrapper}`}>
              {!input.value ? <img alt='verification' key='0' src={icUpload} /> : null }
              {!input.value ? <h3 key='1'>{label}</h3> : null }
              {input.value ? <h3 className='text-success'>Credentials uploded!</h3> : null }
            </div>
            <label className={styles.credentialLabel} htmlFor={input.name} />
            <input {...input} id={input.name} type='file' className={`${styles.hideInput}`} />
            {/* <input name={input.name} value='' id={input.name} type='file' className={`${styles.hideInput}`} /> */}
          </div>
          <div className={styles.indicatorWrapper}>
            {error === 'Required' && !touched && <span className="text-success form-control-feedback">*</span>}
            {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
            {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const styles = require('./RegisterForm.scss');
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className={`${styles.flexForm}`}>
          <fieldset className={`${styles.flexColumn}`}>
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
              onChange={this.validateUsername}
            />
            <Field
              name="email"
              type="email"
              component={this.renderInput}
              label="Email"
            />
          </fieldset>
          <fieldset className={`${styles.flexColumn}`}>
            <Field styles={styles} name="verification" type="file" component={this.renderVerification} label="Upload DD214" />
          </fieldset>
        </div>
        {this.props.error && <p className="text-danger"><strong>{this.props.error}</strong></p>}
        <div className='text-center form-group'>
          <button className="btn btn-primary" type="submit">
            Done
          </button>
        </div>
      </form>
    );
  }
}

// export default RegisterForm;
export default connect(null, { startAsyncValidation, stopAsyncValidation })(RegisterForm)
