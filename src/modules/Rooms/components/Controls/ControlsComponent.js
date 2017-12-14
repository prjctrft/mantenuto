/* eslint-disable */
import React from 'react';
import Modal from 'reactstrap';

import MicButton from './MicButton';
import CameraButton from './CameraButton';
import CallButton from './CallButton';

export default (props) => {

  const styles = require('./Controls.scss');
  const iconVideoOn = require('./assets/ic_video_on.png');
  const iconVideoOff = require('./assets/ic_video_off.png');
  return (
    <div className={`${styles.controlBar}`}>
      <div className="btn-group btn-group-lg" role="group" aria-label="Call Controls">
        <MicButton
          onClick={props.toggleAudio}
          streamOpen={props.streamOpen}
        />
        <CallButton
          onClick={props.toggleCall}
          streamOpen={props.streamOpen}
          controlOn={props.wasCallAccepted}
          className={() => this.props.disableCallButton()}
          faClass={'fa fa-phone fa-2x'}
        />
        <CameraButton
          onClick={props.toggleVideo}
          streamOpen={props.streamOpen}
          src={props.cameraOn ? iconVideoOn : iconVideoOff}
        />
      </div>
    </div>
  )
}
