import React from 'react';
import { ClipLoader } from 'react-spinners';

import styles from './Talk.scss';

const ListenerFound = (props) => {
  return (
    <div>
      <h3>Listener found!</h3>
      <p>Getting your connection ready.</p>
      <ClipLoader
        color={styles.brandWarning}
        loading={true}
        size={100}
      />
    </div>
  )
}

export default ListenerFound;
