/* eslint-disable */
import React from 'react';

// Components
import Chat from './Chat';
import ChatIconButton from './Chat/ChatIconButton';
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

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderChat: false
    }
  }

  toggleChat = () => {
    this.setState({renderChat: !this.state.renderChat});
  }

  render() { 
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

        {props.renderChat ? <Chat toggleChat={this.toggleChat}/> : <ChatIconButton toggleChat={this.toggleChat}/>}
        </div>
      </div>
    );
  }
}
