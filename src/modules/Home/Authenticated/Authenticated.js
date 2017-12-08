import React from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RefitButton from 'components/RefitButton';

const Authenticated = (props) => {
  const styles = require('./Authenticated.scss');
  return (
    <div className={styles.Authenticated}>
      <div className={styles.RefitButtonContainer}>
        <RefitButton
          onClick={() => props.push('/talk')}
          //className={styles.talk}
          content={'Talk'}
        />
        <RefitButton
          onClick={() => props.push('/listen')}
          //className={styles.listen}
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
