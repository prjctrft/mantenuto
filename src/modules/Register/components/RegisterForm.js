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
        <div className='col-xs-12'>
          <label htmlFor={input.name}>{label}</label>
        </div>
        <div className='col-xs-12'>
          <input {...input} type={type} className="form-control" />
          {error === 'Required' && !touched && <span className="text-success form-control-feedback">*</span>}
          {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
          {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
        </div>
      </div>
    );
  }

  renderVerification = ({ styles, input, label, type, meta: { touched, error } }) => {
    const icUpload = require('../assets/ic_upload.png');
    return (
      <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
        <div className='col-xs-12'>
          <div className={styles.credentialBox}>
            <div className={`${styles.labelWrapper}`}>
              {!input.value ? <img key='0' src={icUpload} /> : null }
              {!input.value ? <h3 key='1'>{label}</h3> : null }
              {input.value ? <h3 className='text-success'>Credentials uploded!</h3> : null }
            </div>
            <label className={styles.credentialLabel} htmlFor={input.name}></label>
            <input {...input} id={input.name} type='file' className={`${styles.hideInput}`} />
            {/* <input name={input.name} value='' id={input.name} type='file' className={`${styles.hideInput}`} /> */}
          </div>
          <div className={styles.indicatorWrapper}>
            {error === 'Required' && !touched && <span className="text-success form-control-feedback">*</span>}
            {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
            {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, error } = this.props;
    const styles = require('./RegisterForm.scss');
    return (
      <form onSubmit={handleSubmit}>
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
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <div className='text-center form-group'>
          <button className="btn btn-primary" type="submit">
            Done
          </button>
        </div>
      </form>
    );
  }
}
