import React from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default (props) => {
	const styles = require('./Navigation.scss');
  const { user } = props;
	return (
		<Navbar.Header>
      <Navbar.Brand>
        <IndexLink to="/">
        {/* <IndexLink to="/" activeStyle={{ color: '#33e0ff' }}> */}
          <div className={styles.brand} />
        </IndexLink>
      </Navbar.Brand>

      { user ? <Navbar.Toggle /> : null }
    </Navbar.Header>
	)
}
