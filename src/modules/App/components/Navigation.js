import React, { PropTypes } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

import NavigationHeader from './NavigationHeader';
import NavigationCollapse from './NavigationCollapse';

// a bit hacky
const hideNavigation = (props) => {
  return props.pathname === '/' && !props.authenticated
}

const Navigation = (props) => {
    if(hideNavigation(props)) {
      return null;
    }

    return (
      <Navbar fixedTop>
        <NavigationHeader user={props.user} />
        { props.user ? <NavigationCollapse handleLogout={props.handleLogout} /> : null }
      </Navbar>
    )

}

Navigation.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired
}

export default Navigation
