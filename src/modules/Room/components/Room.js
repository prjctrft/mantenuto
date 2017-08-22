import React from 'react';

// Todo
import Chat from './Chat';
import Controls from './Controls';
import Video from './Video';

// Components
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
    <div className="container">
      <div className='row'>
        <div className='col-xs-12 text-center'>
          <Stats peer={props.peer} user={props.user} styles={styles}/>
          // { renderStats(styles, props) }
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12 text-center'>
          <Controls
            styles={styles}
            hoistRemoteStream={hoistRemoteStream}
            hoistLocalStream={hoistLocalStream}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12 text-center'>
            <Video
              styles={styles}
              hoistRemoteVideo={hoistRemoteVideo}
              hoistLocalVideo={hoistLocalVideo}
            />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <Chat />
        </div>
      </div>
    </div>
  );
}
