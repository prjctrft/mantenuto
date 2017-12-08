import React from 'react';

export default (props) => {
  const styles = require('./RemoteVideoPlaceholder.scss');
  return (
    <div className={styles.RemoteVideoPlaceholder}>
      <i className='fa fa-5x fa-user' />
    </div>
  )
}
