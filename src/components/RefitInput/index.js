import React from 'react';
import PropTypes from 'prop-types';

// used in redux-form <Field /> Component
// e.g. <Field ... component={RefitInput} />
const RefitInput  = ({ size, disabled, placeholder, labelRequired, input, label, type, meta: { touched, error, dirty, initial, pristine, valid } }) => { //eslint-disable-line no-unused-vars
	debugger;
	// const styles = require('./index.scss');
	const formGroupSize = size ? `form-group-${size}` : '';
	const requiredLabel = labelRequired ? <span className="text-warning">*</span> : null;
	return (
  <div className={`form-group ${formGroupSize} ${touched ? 'has-feedback' : ''} ${valid && touched ? 'has-success' : '' } ${error && touched ? 'has-error' : ''}`}>
    <label htmlFor={input.name}>{requiredLabel}{label}</label>
    <input {...input} placeholder={placeholder} disabled={disabled} type={type} className='form-control' />
    {valid && touched && <span className="glyphicon glyphicon-ok form-control-feedback" />}
    {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
    {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
  </div>
  )
}

RefitInput.propTypes = {
	size: PropTypes.oneOf(['lg', 'sm']), // specifiy the size of the form-group
	labelRequired: PropTypes.bool, // display an astreik in required fields
	label: PropTypes.string.isRequired, // passed into Field
	type: PropTypes.string.isRequired, // passed into Field
	disabled: PropTypes.bool, // passed into Field
	placeholder: PropTypes.string, // passed into Field
	input: PropTypes.shape({
		name: PropTypes.string.isRequired
	}), // from redux-form and passed in props
	meta: PropTypes.object, // from redux-form
}

export default RefitInput;
