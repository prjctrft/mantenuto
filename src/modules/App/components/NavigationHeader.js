import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';

const NavigationHeader = (props) => {
	const styles = require('./Navigation.scss');
	return (
  <Navbar.Header>
    <Navbar.Brand>
      <IndexLink to="/">
        {/* <IndexLink to="/" activeStyle={{ color: '#33e0ff' }}> */}
        <div className={styles.brand} />
      </IndexLink>
    </Navbar.Brand>

    { props.authenticated ? <Navbar.Toggle /> : null }
  </Navbar.Header>
	)
}

NavigationHeader.propTypes = {
	authenticated: PropTypes.bool.isRequired
}

export default NavigationHeader;
