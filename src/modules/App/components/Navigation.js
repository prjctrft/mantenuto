import React, { Component, PropTypes } from 'react';

import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import NavigationHeader from './NavigationHeader';
import NavigationCollapse from './NavigationCollapse';

// a bit hacky
const hideNavigation = (props) => {
  return props.pathname === '/' && !props.user
}

export default (props) => {
    if(hideNavigation(props)) {
      return null;
    }
    const { user, notifs, handleLogout } = props;

    const styles = require('./Navigation.scss');
    return (
      <Navbar className={styles.navbar} fixedTop>
        <NavigationHeader />
        { user ? <NavigationCollapse handleLogout={handleLogout} /> : null }
      </Navbar>
    )

}
