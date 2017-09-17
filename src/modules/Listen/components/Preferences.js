import React, { PropTypes } from 'react';

import CircleButton from 'components/CircleButton';

import Wrapper from './Wrapper';

const Preferences  = (props) => {
  const styles = require('./Preferences.scss');
  return (
    <Wrapper>
      <div className={styles.btns}>
        <div className='row'>
          <div className={`col-sm-5 ${styles.noWrap}`}>
            <h3>Can you listen anytime?</h3>
            <CircleButton className={`${styles.marginAuto} ${styles.anytime}`} onClick={props.handleAnytime} content='Anytime' />
          </div>
          <div className='col-sm-2 text-center'>
            <h3>Or</h3>
          </div>
          <div className={`col-sm-5 ${styles.noWrap}`}>
            <h3>Can you only listen now?</h3>
            <CircleButton className={`${styles.marginAuto} ${styles.now}`} onClick={props.handleNow} content='Now' />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

Preferences.propTypes = {
  handleAnytime: PropTypes.func.isRequired,
  handleNow: PropTypes.func.isRequired
}

export default Preferences
