import React from 'react';
import { ClipLoader } from 'react-spinners';

export default (props) => {
  // const ClipLoader = requre('react-spinners').ClipLoader;
  const styles = require('./Talk.scss');
  return (
    <div className={styles.talk}>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 text-center'>
            <h1>Finding someone for you to talk with!</h1>
              <ClipLoader
                color={styles.brandPrimary}
                loading={true}
                size={100}
              />
            {/* <i className="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i> */}
            {/* <p>There are currently 2 people ahead of you in the queue.</p> */}
          </div>
        </div>
      </div>
    </div>
  )
};
