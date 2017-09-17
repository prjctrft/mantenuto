import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CircleButton from 'components/CircleButton';

const Authenticated = (props) => {
  const styles = require('./Authenticated.scss');
  return (
    <div className={styles.Authenticated}>
      <div className={styles.CircleButtonContainer}>
        <CircleButton
          onClick={() => props.push('/talk')}
          className={styles.talk}
          content={'Talk'}
        />
      </div>
      <div className={styles.CircleButtonContainer}>
        <CircleButton
          onClick={() => props.push('/listen')}
          className={styles.listen}
          content={'Listen'}
        />
      </div>
    </div>
  )
}

Authenticated.propTypes = {
  push: PropTypes.func.isRequired
}

export default connect(null, { push })(Authenticated);
