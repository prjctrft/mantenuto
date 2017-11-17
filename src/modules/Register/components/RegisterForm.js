import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  touch, startAsyncValidation, stopAsyncValidation,
  reduxForm, Field, propTypes
} from 'redux-form';

import Dropzone from 'react-dropzone';
import { RefitInput } from 'components';
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
    this.state = { files: [] };
    this.fields = [
      {
        name: 'username',
        type: 'text',
        label: 'Pick a unique Username!',
        labelRequired: true,
        onChange: this.validateUsername
      },
      {
        name: 'first',
        type: 'text',
        label: 'First Name',
        labelRequired: true
      },
      {
        name: 'last',
        type: 'text',
        label: 'Last Name',
        labelRequired: true
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email'
      },
      {
        name: 'mos',
        type: 'text',
        label: 'MOS'
      },
      {
        name: 'injury'
      }
    ];
  }

  onDrop = (files) => {
    this.setState({ files });
  }

  validateUsername = (e) => {
    const username = e.target.value;
    if(username && username.length > 3) {
      this.props.dispatch(startAsyncValidation('register'));
      return checkUsername(username).then(({ message }) => {
        const errors = {};
        this.props.dispatch(touch('register', 'username'))
        if(message) {
          errors.username = message;
        }
        this.props.dispatch(stopAsyncValidation('register', errors));
      })
    }
  };

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
            { this.fields.map((field) => {
              if(field.name === 'injury') {
                return (
                  <div key={field.name}>
                    <label className="control-label" htmlFor="injury">Injury <span className={styles.optional}>(optional)</span></label>
                    <Field className="form-control" component="select">
                      <option />
                      <option value="combat">Combat</option>
                      <option value="non-combat">Non-Combat</option>
                    </Field>
                  </div>
                )
              }
              return (
                <Field
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  component={RefitInput}
                  label={field.label}
                  labelRequired={field.labelRequired}
                  onChange={field.onChange}
                />)
            })}
           
          </fieldset>
          <fieldset className={`${styles.flexColumn}`}>
            <Dropzone className={styles.dropzone} onDrop={this.onDrop}>
              <Field styles={styles} name="verification" type="file" component={this.renderVerification} label="Upload DD214" />
            </Dropzone>
          </fieldset>
        </div>
        <div className={styles.submitDiv}>
          <button type="submit">Done</button>
        </div>
        {this.props.error && <p className="text-danger"><strong>{this.props.error}</strong></p>}
      </form>
    );
  }
}

// export default RegisterForm;
export default connect(null, { startAsyncValidation, stopAsyncValidation })(RegisterForm)
