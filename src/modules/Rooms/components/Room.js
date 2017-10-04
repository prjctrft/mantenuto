/* eslint-disable */
import React from 'react';

// Components
import Chat from './Chat';
import Controls from './Controls';
import Video from './Video';
import Stats from './Stats';

let RemotePlayer;
let LocalPlayer;

const hoistRemoteVideo = (ref) => {
  RemotePlayer = ref;
}

const hoistLocalVideo = (ref) => {
  LocalPlayer = ref;
}

const hoistLocalStream = (stream) => {
  LocalPlayer.srcObject = stream;
}

const hoistRemoteStream = (stream) => {
  RemotePlayer.srcObject = stream;
}

export default (props) => {
  // TODO - move somewhere else
  const styles = require('../Styles.scss');

  return (
    <div className={styles.Room}>
      <div className={styles.videoWrapper}>
        <Stats peer={props.peer} user={props.user} styles={styles} />
        <Video
          styles={styles}
          hoistRemoteVideo={hoistRemoteVideo}
          hoistLocalVideo={hoistLocalVideo}
        />
        <Controls
          styles={styles}
          hoistRemoteStream={hoistRemoteStream}
          hoistLocalStream={hoistLocalStream}
        />
      </div>
      
      <div className={styles.chatWrapper}>
        <Chat />
      </div>
    </div>
  );
}
