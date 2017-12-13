/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RemoteVideoPlaceholder from './RemoteVideoPlaceholder';

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

  const remoteVideoOn = () => {
    // TODO: fix this to properly account for video not playing
    if(!props.remoteStream) {
      return false;
    }
    if(props.remoteStream.getVideoTracks().length === 0) {
      return false;
    }
    return true;
  }

  const localVideoOn = () => {
    if(!props.localStream) {
      return false;
    }
    if(props.localStream.getVideoTracks().length === 0) {
      return false;
    }
    return true;
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
        {remoteVideoOn() ? <video ref={attachRemoteStream} autoPlay /> : <RemoteVideoPlaceholder />}
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
