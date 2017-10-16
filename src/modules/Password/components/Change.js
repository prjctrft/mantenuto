import React from 'react';

const Change = () => {
	const styles = require('../Password.scss');

	const changePasswordButton = function () {
		/*
    **if (password === confirmPassword) {
    **  change oldPassword to password
    **}
    */
	};

	return (
  <div className={styles.content}>
    <div>
      <h1>Change Password!</h1>
    </div>

    <div className={styles.formDiv}>
      <form action="./ChangePassword">
        <div className="text-left">
          <label htmlFor="password" className="text-muted">Password</label>
          <input className="form-control" type="password" name="password" />

          <label htmlFor="confirmPassword" className="text-muted">Confirm Password</label>
          <input className="form-control" type="password" name="confirmPassword" />
        </div>

        <button className="text-center" type="submit" onClick={changePasswordButton}>Done</button>
      </form>
    </div>
  </div>
	);
}

export default Change;
