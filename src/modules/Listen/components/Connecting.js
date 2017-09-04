import React, { Component } from 'react';

import { ClipLoader } from 'react-spinners';

import Wrapper from './Wrapper';

export default (props) => {
  const styles = require('./Connecting.scss');
  return (
    <Wrapper>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 text-center'>
            <h2>Finding someone that needs your ears now!</h2>
            <ClipLoader
              color={styles.brandPrimary}
              loading={true}
              size={100}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  )
};
