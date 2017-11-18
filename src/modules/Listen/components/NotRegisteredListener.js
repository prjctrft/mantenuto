import React from 'react';
import { ClipLoader } from 'react-spinners';

import CircleButton from 'components/CircleButton';

import Wrapper from './Wrapper';

const NotRegisteredListener = (props) => {
  const styles = require('./NotRegisteredListener.scss');
  return (
    <Wrapper>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h1>You are not a verified listener.</h1>
            <p>Do you want to listen to other vets tell their stories? Awesome!</p>
            <p>Project Refit is a closed, and tightly monitored platform.  One of the reasons we do this is so we can offer vets that are healing, a high quality pool of individuals to connect with.</p>
            <p>Currently only combat veterans and mental health professionals are able to be listeners.  Is this you?</p>
            <p>We'd love to give you the title "Verified Listener".</p>
            <CircleButton className={`mx-auto ${styles.btn}`} content='Become a Listener!' />
          </div>
        </div>
      </div>
    </Wrapper>
  )
};

export default NotRegisteredListener;
