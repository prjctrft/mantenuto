import React from 'react';

function Body(props) {  
  const styles = require('../Password.scss');
  const sendEmailButton = function () {
    //check if email entered is a valid email and is within the database
  };

  return (
    <div className={ styles.content }>
      <h1>Forgot your password?</h1>
      <p className="h1">No problem!</p>

      <form action="./forgot">
        <input className="form-control" type="email" name="emailInput" placeholder="E-mail" />
        <button type="submit" onClick={ sendEmailButton }>Send</button>
      </form>
    </div>
  );
}

export default (props) => {
  return (
    <Body />
  );
}
