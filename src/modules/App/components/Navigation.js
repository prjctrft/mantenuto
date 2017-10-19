import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import NavigationCollapse from './NavigationCollapse';

export default class Navigation extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }


  // a bit hacky
  hideNavigation = () => {
    return this.props.pathname === '/' && !this.props.authenticated
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    if(this.hideNavigation()) {
      return null;
    }
    const bootstrap = require('theme/bootstrap.scss');
    const styles = require('./Navigation.scss');
    return (
      <Navbar cssModule={bootstrap} dark expand='md' className={styles.Navbar} fixed>
        <NavbarBrand cssModule={bootstrap} className={styles.brand} href='/' />
        { this.props.authenticated ?
          [
            <NavbarToggler key={0} cssModule={bootstrap} onClick={this.toggle} />,
            <NavigationCollapse key={1} cssModule={bootstrap} isOpen={this.state.isOpen} handleLogout={this.props.handleLogout} />
          ]
          : null
        }
      </Navbar>
    )
  }

}
