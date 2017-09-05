import React from 'react';

// TODO - extract this component to be used
// across app
export default (props) => {
  const styles = require('./Wrapper.scss');
  return (
    <div className={styles.Wrapper}>
      { props.children }
    </div>
  )
}
