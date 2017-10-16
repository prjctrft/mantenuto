import React from 'react';
import PropTypes from 'prop-types';

const RefitInput  = ({ size, labelRequired, input, label, type, meta: { touched, error, dirty, initial, pristine, valid } }) => { //eslint-disable-line no-unused-vars
	// const styles = require('./index.scss');
	const formGroupSize = size ? `form-group-${size}` : '';
	const requiredLabel = labelRequired ? <span className="text-warning">*</span> : null;
	return (
    <div className={`form-group ${formGroupSize} ${touched ? 'has-feedback' : ''} ${valid && touched ? 'has-success' : '' } ${error && touched ? 'has-error' : ''}`}>
      <label htmlFor={input.name}>{requiredLabel}{label}</label>
      <input {...input} type={type} className='form-control' />
			{valid && touched && <span className="glyphicon glyphicon-ok form-control-feedback" />}
			{error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
      {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
    </div>
  )
}

RefitInput.propTypes = {
	size: PropTypes.oneOf(['lg', 'sm']), // specifiy the size of the form-group
	labelRequired: PropTypes.bool, // display an astreik in required fields
	input: PropTypes.object, // from redux-form
}

export default RefitInput;
