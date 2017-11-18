/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

const Video = (props) => {
  const styles = require('./Video.scss');

  const attachLocalStream = (element) => {
    if(element) {
      element.srcObject = props.localStream
    }
  }

  const attachRemoteStream = (element) => {
    if(element) {
      element.srcObject = props.remoteStream
    }
  }

  const localVideoOn = () => {
    // TODO: fix this to properly account for video not playing
    if(!props.localStream) {
      return false;
    }
  }

  const { callStarted, callAccepted, connectionState } = props;
  return (
    <div className={`embed-responsive embed-responsive-4by3 ${styles.embedResponsive}`}>
      {callStarted || callAccepted ?
        <div className={styles.CallState}>
          {callStarted ? <span>... <i className='fa fa-volume-control-phone fa-3x' /></span>: null }
          {callAccepted ? 'You are connected!' : null }
        </div> : null
      }
      <div className='embed-responsive-item'>
        {/* {!props.callInProgress ? <i className='fa fa-5x fa-user' /> : null} */}
        {props.callInProgress ? <video ref={attachRemoteStream} autoPlay muted /> : null}
      </div>
      <div className={`${styles.LocalPlayer}`}>
        <video ref={attachLocalStream} autoPlay muted />
        {/* <video src={props.localStream} autoPlay muted /> */}
        {!localVideoOn() ? <i className='fa fa-5x fa-user' /> : null}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => state => ({
  callStarted: state.rooms.callStarted,
  callAccepted: state.rooms.callAccepted,
  connectionState: state.rooms.connectionState,
  localStream: state.calls.localStream,
  remoteStream: state.calls.remoteStream,
  callInProgress: state.calls.callInProgress
});

export default connect(mapStateToProps)(Video);
