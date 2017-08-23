import React, { Component, PropTypes } from 'react';

import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import NavigationHeader from './NavigationHeader';
import NavigationCollapse from './NavigationCollapse';

export default function Navigation(props) {
  
    const { user, notifs, children } = props;

    const styles = require('./Navigation.scss');
    return (
      <Navbar fixedTop>
        <NavigationHeader />
        { user ? <NavigationCollapse /> : null }
      </Navbar>
    )
  
}




