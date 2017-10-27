import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import memoize from 'lru-memoize';
import { createValidator, required} from 'utils/validation';
import { RefitInput } from 'components';

const speakeasyValidation = memoize(10)(createValidator({
  code: required,
}));


export class SpeakeasyFormComponent extends Component {
  static propTypes = {
    ...propTypes,
    codes: PropTypes.array
  }

  validateCode = (value) => {
    if(value === undefined) {
      return;
    }
    const code = value.toLowerCase();
    if(this.props.codes.indexOf(code) === -1) {
      return 'Make sure you type in the correct code.'
    }
  };

  // renderInput = ({ input, placeholder, type, meta: { touched, error } }) => {
  //   return (
  //     <div className="col-sm-12">
  //       <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
  //         <input {...input} placeholder={placeholder} type={type} className="form-control" />
  //         {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
  //         {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    const { handleSubmit, error } = this.props;
    // const styles = require('../Register.scss');
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <fieldset>
          <Field
            disabled={this.props.codes.length === 0}
            placeholder="Your special registration code..."
            validate={this.validateCode}
            name="code"
            type="text"
            component={RefitInput}
          />
        </fieldset>

        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <button className="btn btn-default" type="submit">
          <i className="fa fa-sign-in" />{' '}Next
        </button>
      </form>
    );
  }
}


export default reduxForm({
  form: 'register',
  validate: speakeasyValidation
})(SpeakeasyFormComponent)
