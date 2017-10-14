import React from 'react';
import PropTypes from 'prop-types'; 
import Navbar from 'react-bootstrap/lib/Navbar';

import NavigationHeader from './NavigationHeader';
import NavigationCollapse from './NavigationCollapse';

// a bit hacky
const hideNavigation = (props) => {
  return props.pathname === '/' && !props.authenticated
}

const Navigation = (props) => {

  const styles = require('./Navigation.scss');

  if(hideNavigation(props)) {
    return null;
  }

  return (
    <Navbar className={styles.Navbar} fixedTop>
      <NavigationHeader authenticated={props.authenticated} />
      { props.authenticated ? <NavigationCollapse handleLogout={props.handleLogout} /> : null }
    </Navbar>
  )

}

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Navigation
