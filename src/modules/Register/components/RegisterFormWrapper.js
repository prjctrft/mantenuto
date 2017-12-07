import React from 'react';
import RegisterForm from './RegisterForm';

export default (props) => {
  const type = props.params;
  return <RegisterForm initialValues={type} {...props} />
}
