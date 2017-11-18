import React from 'react';

import { ClipLoader } from 'react-spinners';

import Wrapper from './Wrapper';

const Connecting = (props) => {
  const styles = require('./Connecting.scss');
  return (
    <Wrapper>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 text-center'>
            {props.onlineTalkers ? <h2>There are currently {props.onlineTalkers} vets online wanting to chat.</h2> : null}
            <p className='lead'>Finding someone that needs your ears now!</p>
            <ClipLoader
              color={styles.brandPrimary}
              loading
              size={100}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  )
};

export default Connecting;
