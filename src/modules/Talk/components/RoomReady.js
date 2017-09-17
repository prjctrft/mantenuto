import React from 'react';
import { ClipLoader } from 'react-spinners';

import styles from './Talk.scss';

const RoomReady = () => (
  <div>
    <h3>Your room is ready!</h3>
    <p>Connecting you - time now.</p>
    <ClipLoader
      color={styles.brandSuccess}
      loading
      size={100}
    />
  </div>
);

export default RoomReady;
