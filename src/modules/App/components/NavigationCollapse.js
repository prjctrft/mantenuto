import React, { PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const NavigationCollapse = (props) => {
	return (
  <Navbar.Collapse>
    <Nav navbar pullRight>
      <LinkContainer to="/profile" >
        <NavItem eventKey={0} >Profile</NavItem>
      </LinkContainer>
      {/* {!user && <LinkContainer to="/login">
          <NavItem eventKey={5}>Login</NavItem>
        </LinkContainer>} */}
      {/* {!user && <LinkContainer to="/register">
          <NavItem eventKey={6}>Register</NavItem>
        </LinkContainer>} */}
      <NavItem eventKey={1} className="logout-link" onClick={props.handleLogout}>
          Logout
        </NavItem>
    </Nav>
  </Navbar.Collapse>
	)
}

NavigationCollapse.propTypes = {
  handleLogout: PropTypes.func.isRequired
}

export default NavigationCollapse
