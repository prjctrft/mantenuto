import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';

const NavigationCollapse = (props) => {
	return (
  <Collapse isOpen={props.isOpen} navbar>
    <Nav className="ml-auto"  navbar>
      <NavItem>
        <Link className='nav-link' to='/profile'>Profile</Link>
      </NavItem>
      <NavItem className="logout-link">
        <NavLink onClick={props.handleLogout}>
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
