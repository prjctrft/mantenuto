import React, { PropTypes } from 'react';

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
