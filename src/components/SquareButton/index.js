import React from 'react';
import PropTypes from 'prop-types'; 

const SquareButton = (props) => {
  const styles = require('./SquareButton.scss');
  return (
    <button
      onClick={props.onClick}
      className={
        `btn btn-lg btn-primary btn-block ${styles.SquareButton} ${props.className}`}
    >
      {props.content}
    </button>
  );
};

SquareButton.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

SquareButton.defaultProps = {
  className: ''
}

export default SquareButton
