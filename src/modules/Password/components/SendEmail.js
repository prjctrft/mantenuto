import React from 'react';

const SendEmail = () => {
  const styles = require('../Password.scss');

  return (
    <div className={styles.content} >
      <div>
        <h1 className={styles.checkEmail}>Check your email</h1>
      </div>
      <div>
        <p><strong>We{"'"}ve sent an email to user@email.com. Click the link in the email to reset your password.</strong></p>
        <p><strong>If you don{"'"}t see the email, check other places it might be, like your junk, spam, social, or other folders</strong></p>
        <a href="./forgot"><strong>I didn{"'"}t receive the email</strong></a>
      </div>
    </div>
  );
}

export default SendEmail;
