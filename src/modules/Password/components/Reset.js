import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Reset = (props) => {
  const styles = require('../Password.scss');

  return (
    <div className={styles.content} >
      <div>
        <h1 className={styles.checkEmail}>Check your email</h1>
      </div>
      <div>
        <p><strong>We{"'"}ve sent an email to {props.location.query.email}. Click the link in the email to reset your password.</strong></p>
        <p><strong>If you don{"'"}t see the email, check other places it might be, like your junk, spam, social, or other folders</strong></p>
        <Link to="/password/forgot"><strong>I didn{"'"}t receive the email</strong></Link>
      </div>
    </div>
  );
}

Reset.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      email: PropTypes.string.isRequired
    })
  })
};

export default Reset;
