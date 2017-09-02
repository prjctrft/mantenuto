import React, { PropTypes } from 'react';

const CircleButton = (props) => {
  const styles = require('./CircleButton.scss');
  return (
    <button
      onClick={props.onClick}
      className={
        `btn btn-lg btn-primary btn-block btn-circle ${styles.CircleButton} ${props.className}`
      }>
      {props.content}
    </button>
  );
};

CircleButton.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CircleButton
