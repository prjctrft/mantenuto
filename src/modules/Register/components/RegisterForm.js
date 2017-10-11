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
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  renderInput = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className={`form-group ${error && touched ? 'has-error has-feedback' : ''}`}>
        {/* <div className='col-xs-12'> */}
        <label htmlFor={input.name}><span className="text-danger">*</span>{label}</label>
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
              name="full-name"
              type="text"
              component={this.renderInput}
              label="Full Name"
            />
            <Field
              name="mos"
              type="text"
              component={this.renderInput}
              label="MOS"
            />
            <label className="control-label" htmlFor="injury">Injury <span className={styles.optional}>(optional)</span></label>
              <Field className="form-control" component="select">
                <option></option>
                <option value="combat">Combat</option>
                <option value="non-combat">Non-Combat</option>
              </Field>
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
              label="E-mail"
            />
            <Field
              name="password"
              type="password"
              component={this.renderInput}
              label="Password"
            />
            <Field
              name="confirm-password"
              type="password"
              component={this.renderInput}
              label="Confirm Password"
            />
            <div className={styles.submitDiv}>
              <button type="submit">Done</button>
            </div>
          </fieldset>
          <fieldset className={`${styles.flexColumn}`}>
            <Field styles={styles} name="verification" type="file" component={this.renderVerification} label="Upload DD214" />
          </fieldset>
        </div>
        {this.props.error && <p className="text-danger"><strong>{this.props.error}</strong></p>}
      </form>
    );
  }
}
