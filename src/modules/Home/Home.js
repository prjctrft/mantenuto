import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { CounterButton, GithubButton } from 'components';
import config from 'config';
import Helmet from 'react-helmet';
import { getCodes } from './redux';

import Authenticated from '../Authenticated';
import SpeakeasyForm from './components/SpeakeasyForm';

@connect(
  state => ({
    user: state.auth.user,
    codes: state.home.codes
  }), { push, getCodes })
export default class Home extends Component {

  componentDidMount() {
    this.props.getCodes();
  }

  goToRegister = (form) => {
    debugger;
    this.props.push('/register');
  }
  
  render() {
    const styles = require('./Home.scss');
    const { codes } = this.props;
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
          <div className='container text-center'>
            <div className='row'>
              <div className='col-xs-12'>
                <h1>Project Refit</h1>
              </div>
            </div>
            {codes.length > 0 ? <SpeakeasyForm onSubmit={this.goToRegister} codes={codes} /> : null}
          </div>
      </div>
    );
  }
}
