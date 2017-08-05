import React from 'react';
import { connect } from 'react-redux';


const Listen = (props) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12'>
          <h1>Thank you{props.user ? ' ' + props.user.first : ''}!</h1>
          <p>We've sent you an email with instructions on completing the registration process.</p>
          <p>The Refit platform is exclusively for Veterans and mental health professionals.  Hang tight and while we get you going.</p>
          <p>Thank you for stopping by and we're excited to work with you!</p>
        </div>
      </div>
    </div>
  )
};

export default connect( state => ({
  user: state.user.user
}))(Listen)
