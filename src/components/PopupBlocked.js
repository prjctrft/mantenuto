import React from 'react';
import { ClipLoader } from 'react-spinners';
import RefitButton from 'components/RefitButton';

const PopupBlocked = () =>
(
  <div>
    <h3>Your room will open up in a new window.  Make sure you turn off your browser's popup blocker!</h3>
    <RefitButton
      onClick={() => props.openWindow()}
      content={'Go to Room!'}
    />
  </div>
)

export default PopupBlocked
