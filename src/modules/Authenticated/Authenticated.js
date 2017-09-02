import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CircleButton from 'components/CircleButton';

const Authenticated = (props) => {
  const styles = require('./Authenticated.scss');
  return (
    <div className={styles.Authenticated}>
      <div className='col-sm-3'>
        <CircleButton
          onClick={() => props.push('/talk')}
          className={styles.talk}
          content={'Talk'}
        />
      </div>
      <div className='col-sm-3'>
        <CircleButton
          onClick={() => props.push('/listen')}
          className={styles.listen}
          content={'Listen'}
        />
      </div>
    </div>
  )
}

export default connect(null, { push })(Authenticated);
