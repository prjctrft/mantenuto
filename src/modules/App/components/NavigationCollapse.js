import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';

const NavigationCollapse = (props) => {
	return (
  <Collapse isOpen={props.isOpen} navbar>
    <Nav className="ml-auto"  navbar>
      <NavItem >
        <NavLink  href='/profile'>Profile</NavLink>
      </NavItem>
      <NavItem  className="logout-link">
        <NavLink  onClick={props.handleLogout}>
          Logout
				</NavLink>
      </NavItem>
    </Nav>
  </Collapse>
	)
}

NavigationCollapse.propTypes = {
  handleLogout: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired
}

export default NavigationCollapse
