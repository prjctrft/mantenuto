import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import CircleButton from 'components/CircleButton';

const next = (route, props) => {
  return (e) => {
    e.preventDefault();
    props.push(`/register/${route}`);
  }
}

const Register = (props) => {
  const styles = require('./Register.scss');
  return (
    <div className={styles.wrapper}>
      <Helmet title="Register" />
      <div className={styles.masthead}>
        <div className="container">
          <h1 className={styles.heading}>Register</h1>
          <div className={styles.pipelineBtns}>
            <CircleButton onClick={next('veteran', props)} content='Veterans Click Here' />
            <CircleButton onClick={next('active', props)} content='Active Duty Click Here' />
            <CircleButton onClick={next('provider', props)} content='Mental Health Professional Click Here' />
          </div>
          {/*<Link className={styles.link} to={'/register/provider'}>Mental health professional?</Link>*/}
        </div>
      </div>
    </div>
  );
}

export default connect(null, { push })(Register);
