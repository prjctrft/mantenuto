import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { CounterButton, GithubButton } from 'components';
import config from 'config';
import Helmet from 'react-helmet';
import Authenticated from '../Authenticated';

@connect(
  state => ({
    user: state.auth.user
  }), { push })
export default class Home extends Component {

  // componentDidMount() {
  //
  //   this.props;
  // }

  clickTalk = (event) => {
    if (!this.props.user) {
      this.props.push('/register?next=talk');
    }
  }

  clickListen = (event) => {
    if (!this.props.user) {
      this.props.push('/register?next=listen');
    }
  }

  render() {
    const styles = require('./Home.scss');
    if (this.props.user) {
      return (
        <Authenticated />
      );
    }
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.masthead}>
          <div className="container">
            <h1>Refit Chat</h1>

            <h2>Where veterans connect and heal.</h2>
            <div className={styles.pipelineBtns}>
              
                <button onClick={this.clickTalk} className='btn btn-lg btn-primary btn-block btn-circle'>
                  Talk
                </button>
              
              
                <button onClick={this.clickListen} className='btn btn-lg btn-primary btn-block btn-circle'>
                  Listen
                </button>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
