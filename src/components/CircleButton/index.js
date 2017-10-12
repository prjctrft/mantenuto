import React from 'react';
import PropTypes from 'prop-types'; 

const CircleButton = (props) => {
  const styles = require('./CircleButton.scss');
  return (
    <button
      onClick={props.onClick}
      className={
        `btn btn-lg btn-primary btn-block btn-circle ${styles.CircleButton} ${props.className}`}
    >
      {props.content}
    </button>
  );
};

CircleButton.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

CircleButton.defaultProps = {
  className: ''
}

export default CircleButton
