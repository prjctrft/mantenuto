import React from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default function NavigationCollapse(props) {
  const { user } = props;
  
	return (
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
	)
}

