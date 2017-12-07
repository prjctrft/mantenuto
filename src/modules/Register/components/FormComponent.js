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

export default (props) => {
  const styles = require('./RegisterForm.scss');
  const renderVerification = ({ input, meta: { submitFailed, error } }) => {
    const icUpload = require('../assets/ic_upload.png');
    let label;
    switch (props.type) {
      case 'provider':
        label = 'Upload Credentials.'
        break;
      case 'veteran':
        label = 'Upload DD-214.'
        break;
      case 'active':
        label = 'Upload iD.'
        break;
    }
    let validationClass;
    if (submitFailed) {
      validationClass = error ? 'is-invalid' : 'is-valid';
    }
    return (
      <Dropzone onDrop={props.onDrop} name={input.name} className={styles.dropzone}>
        <div className='form-group'>
          <div className='col-xs-12'>
            <div className={styles.credentialBox}>
              <div className={`${styles.labelWrapper} form-control ${validationClass}`}>
                {!input.value ? <img alt='verification' key='0' src={icUpload} /> : null }
                {!input.value ? <h3 key='1'>{label}</h3> : null }
                {input.value ? <h3 className='text-success'>Credentials ready!</h3> : null }
              </div>
              <label className={styles.credentialLabel} htmlFor={input.name} />
            </div>
          </div>
        </div>
      </Dropzone>
    );
  }
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={styles.flexForm}>
        <fieldset className={`${styles.flexColumn}`}>
          <Field
            component="input"
            name="type"
            type="hidden"
          />
          <Field
            name='username'
            type='text'
            component={RefitInput}
            label='Username'
            labelRequired='true'
            placeholder={'Pick a unique username.'}
            onChange={props.validateUsername}
          />
          <Field
            name='first'
            type='text'
            component={RefitInput}
            label='First Name'
            labelRequired='true'
          />
          <Field
            name='last'
            type='text'
            component={RefitInput}
            label='Last Name'
            labelRequired='true'
          />
          <Field
            name='email'
            type='email'
            component={RefitInput}
            label='Email'
            labelRequired='true'
          />
          {props.type === 'provider' ?
            null :
            [<Field
              key={0}
              name='mos'
              type='text'
              component={RefitInput}
              label='MOS'
              placeholder="optional"
            />,
            <label key={1}
              className="control-label"
              htmlFor="injury">Injury <span className={styles.optional}>optional</span>
            </label>,
            <Field
              key={2}
              name='injury'
              className='form-control'
              component="select"
              >
              <option value="" disabled selected>optional</option>
              <option value="combat">Combat</option>
              <option value="nonCombat">Non-Combat</option>
            </Field>
            ]
          }
        </fieldset>
        <fieldset className={`${styles.flexColumn}`}>
          <Field onDrop={props.onDrop} name='verification' type='file' component={renderVerification} />
        </fieldset>
      </div>
      <div className={styles.submitDiv}>
        <button type="submit">Done</button>
      </div>
      {props.error && <p className="text-danger"><strong>{this.props.error}</strong></p>}
    </form>
  );
}
