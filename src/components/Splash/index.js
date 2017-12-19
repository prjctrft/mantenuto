import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const Splash = () => {
  const styles = require('./Splash.scss');
  return (
    <div className={styles.SplashContainer}>
      <ClipLoader color={styles.brandPrimary} loading />
    </div>
  )
}



export default Splash;