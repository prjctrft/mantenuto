import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { getCodes } from './redux';

import SpeakeasyForm from './components/SpeakeasyForm';

import gunners from './assets/ic_already_member.png';
import title from './assets/ProjectRefitText.png';

export class Home extends Component {
  static propTypes = {
    getCodes: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    codes: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.getCodes();
  }

  goToRegister = () => {
    this.props.push('/register');
  }

  render() {
    const styles = require('./Home.scss');
    const { codes } = this.props;
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.alreadyMember}>
          <Link to={'/login'}>
            <img alt='gunners logo' src={gunners} />
            Already a member?
          </Link>
        </div>
        <div className='col-xs-12 col-sm-6 text-center'>
          <img src={title} className='img-fluid' alt='Project Refit logo title' />
          <h2>Where Warriors beat PTSD together</h2>
          <SpeakeasyForm onSubmit={this.goToRegister} codes={codes} />
        </div>
      </div>
    );
  }
}

export default connect( state => ({
    user: state.auth.user,
    codes: state.home.codes
  }), { push, getCodes })(Home);
