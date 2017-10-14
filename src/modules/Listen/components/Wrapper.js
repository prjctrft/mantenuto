import React from 'react';
import PropTypes from 'prop-types'; 

// TODO - extract this component to be used
// across app
const Wrapper = (props) => {
  const styles = require('./Wrapper.scss');
  return (
    <div className={styles.Wrapper}>
      { props.children }
    </div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.array.isRequired
}

export default Wrapper;
