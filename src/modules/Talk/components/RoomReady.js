import React from 'react';
import { ClipLoader } from 'react-spinners';

import styles from './Talk.scss';

const RoomReady = (props) => {
  return (
    <div>
      <h3>Your room is ready!</h3>
      <p>Connecting you - time now.</p>
      <ClipLoader
        color={styles.brandSuccess}
        loading={true}
        size={100}
      />
    </div>
  )
}

export default RoomReady;
