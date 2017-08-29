import React from 'react';

export default (props) => {
  const styles = require('./CircleButton.scss');
  return (
    <button onClick={props.onClick} className={`btn btn-lg btn-primary btn-block btn-circle ${styles.CircleButton}`}>
      {props.content}
    </button>
  );
};
