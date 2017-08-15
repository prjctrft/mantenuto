import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearCallState } from '../actions';

@connect( state => ({
  callStarted: state.rooms.callStarted,
  callAccepted: state.rooms.callAccepted,
  connectionState: state.rooms.connectionState
}))
export default class Video extends Component {

  // renderCallAccepted = () => {
  //   setTimeout(this.props.clearCallState(), 3000);
  //   return ('Call Accepted!');
  // }

  render() {
    const { styles, callStarted, callAccepted, connectionState } = this.props;
    let borderStyle;
    switch (connectionState) {
      case 'connected':
        borderStyle = 'success';
        break;
      case 'connecting':
        borderStyle = 'warning';
      default:
        borderStyle = 'default';
    }
    return (
      <div className={styles[borderStyle]}>
        <div className={`embed-responsive embed-responsive-4by3 ${styles.embedResponsive}`}>
          {callStarted || callAccepted ?
            <div className={styles.CallState}>
              {callStarted ? <span>... <i className='fa fa-volume-control-phone fa-3x' /></span>: null }
              {callAccepted ? 'You are connected!' : null }
            </div> : null
          }

          <video ref={(video) => this.props.handleRemoteVideo(video)} className='embed-responsive-item' autoPlay muted />
          <video className={`${styles.LocalPlayer}`} ref={(video) => this.props.handleLocalVideo(video)} autoPlay muted />
        </div>
      </div>
    )
  }
}
