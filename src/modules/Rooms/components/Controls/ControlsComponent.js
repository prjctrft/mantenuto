/* eslint-disable */
import React from 'react';
import Modal from 'reactstrap';

import ControlButton from './ControlButton';
import CallButton from './CallButton';

export default (props) => {

  const styles = require('./Controls.scss');
  const iconVoiceOn = require('./assets/ic_voice_on.png');
  const iconVoiceOff = require('./assets/ic_voice_off.png');
  const iconVideoOn = require('./assets/ic_video_on.png');
  const iconVideoOff = require('./assets/ic_video_off.png');
  return (
    <div className={`${styles.controlBar}`}>
      <div className="btn-group btn-group-lg" role="group" aria-label="...">
        <ControlButton
          onClick={props.toggleAudio}
          streamOpen={props.streamOpen}
          src={props.audioOn ? iconVoiceOn : iconVoiceOff}
        />
        <CallButton
          onClick={props.toggleCall}
          streamOpen={props.streamOpen}
          controlOn={props.wasCallAccepted}
          className={() => this.props.disableCallButton()}
          faClass={'fa fa-phone fa-2x'}
        />
        <ControlButton
          onClick={props.toggleVideo}
          streamOpen={props.streamOpen}
          src={props.cameraOn ? iconVideoOn : iconVideoOff}
        />
      </div>
    </div>
  )
}
