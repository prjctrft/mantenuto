import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';

const NavigationCollapse = (props) => {
	const bootstrap = require('theme/bootstrap.scss');
	return (
  <Collapse cssModule={bootstrap} isOpen={props.isOpen} navbar>
    <Nav className="ml-auto" cssModule={bootstrap} navbar>
      <NavItem cssModule={bootstrap}>
        <NavLink cssModule={bootstrap} href='/profile'>Profile</NavLink>
      </NavItem>
      <NavItem cssModule={bootstrap} className="logout-link">
        <NavLink cssModule={bootstrap} onClick={props.handleLogout}>
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
