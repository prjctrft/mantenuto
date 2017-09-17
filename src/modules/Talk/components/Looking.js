import React from 'react';
import { ClipLoader } from 'react-spinners';

import styles from './Talk.scss';

const Looking = () =>
(
  <div>
    <h3>We{"''"}re looking for someone to connect you with!</h3>
    <ClipLoader
      color={styles.brandPrimary}
      loading
      size={100}
    />
  </div>
)

export default Looking;
