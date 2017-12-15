/* eslint-disable */
import React from 'react';
import Modal from 'reactstrap';

import MicButton from './MicButton';
import CameraButton from './CameraButton';
import CallButton from './CallButton';

export default (props) => {

  const styles = require('./Controls.scss');
  return (
    <div className={`${styles.controlBar}`}>
      <div className="btn-group btn-group-lg" role="group" aria-label="Call Controls">
        <MicButton
          onClick={props.toggleAudio}
        />
        <CallButton
          onClick={props.toggleCall}
        />
        <CameraButton
          onClick={props.toggleVideo}
        />
      </div>
    </div>
  )
}
