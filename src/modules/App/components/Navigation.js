import React, { Component, PropTypes } from 'react';

import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

function Navigation(props) {
  
    const { user, notifs, children } = this.props;

    const styles = require('./Navigation.scss');
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">
            {/* <IndexLink to="/" activeStyle={{ color: '#33e0ff' }}> */}
              <div className={styles.brand} />
            </IndexLink>
          </Navbar.Brand>

          { user ? <Navbar.Toggle /> : null }
        </Navbar.Header>

        { user ?
          <Navbar.Collapse>
            <Nav navbar pullRight>
              <LinkContainer to="/profile">
                <NavItem eventKey={0}>Profile</NavItem>
              </LinkContainer>
              {/* {!user && <LinkContainer to="/login">
                <NavItem eventKey={5}>Login</NavItem>
              </LinkContainer>} */}
              {/* {!user && <LinkContainer to="/register">
                <NavItem eventKey={6}>Register</NavItem>
              </LinkContainer>} */}
              <LinkContainer to="/logout">
                <NavItem eventKey={1} className="logout-link" onClick={this.handleLogout}>
                  Logout
                </NavItem>
              </LinkContainer>
            </Nav>
            <Nav navbar pullRight>
              {user && <span className="navbar-text">
                Hello <strong>{user.first}!</strong>
              </span>}
            </Nav>
          </Navbar.Collapse>
        : null }
      </Navbar>
    )
  
}




