import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  touch, startAsyncValidation, stopAsyncValidation,
  reduxForm, Field, propTypes, change
} from 'redux-form';
import { Helmet } from 'react-helmet';
import Dropzone from 'react-dropzone';
import { RefitInput } from 'components';
import { notifSend } from 'modules/Notifs/redux';
import { checkUsername } from 'modules/user/redux';
import { register } from '../redux';
import registerValidation from './registerValidation';
import FormComponent from './FormComponent';

@reduxForm({
  form: 'register',
  validate: registerValidation
})
class RegisterForm extends Component {
  static propTypes = {
    ...propTypes,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    type: PropTypes.oneOf(['veteran', 'active', 'provider']) // comes from 'register/:type'
  }

  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  register = data => {
    debugger;
    return this.props.register(data)
      .then(this.success)
      .catch(this.fail)
  };

  success = (user) => {
    this.props.push({
      pathname: '/registered',
      query: user
    });
  }

  fail = (err) => {
    console.log(err);
  }

  onDrop = (files) => {
    const reader = new FileReader();
    reader.onload = () => {
        const fileAsBinaryString = reader.result;
        this.props.change('verification', fileAsBinaryString)
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.readAsBinaryString(files[0]);
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

  render() {
    const styles = require('./RegisterForm.scss');
    return (
      <div className={styles.RegisterForm}>
        <Helmet title="Register" />
        <div className={styles.masthead}>
          <div className={styles.width}>
            <h1 className={styles.heading}>Register</h1>
            <FormComponent
              type={this.props.type}
              handleSubmit={this.props.handleSubmit(this.register)}
              validateUsername={this.validateUsername}
              onDrop={this.onDrop}
              error={this.props.error}
              files={this.state.files}
            />
          </div>
        </div>
      </div>
    );
  }
}

// export default RegisterForm;
export default connect(null, {
  register,
  startAsyncValidation,
  stopAsyncValidation,
  change,
  notifSend,
  push
})(RegisterForm)
