/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class CameraButtonComponent extends Component {

  render() {
    const iconVideoOn = require('./assets/ic_video_on.png');
    const iconVideoOff = require('./assets/ic_video_off.png');
    return (
      <button
        onClick={this.props.onClick} type="button"
        className={`btn btn-default `}
        >
        <img className='img-fluid' src={this.props.cameraOn ? iconVideoOn : iconVideoOff} aria-hidden="true" />
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  const { cameraOn } = state.rooms;
  return { cameraOn }
}

export default connect(mapStateToProps)(CameraButtonComponent)
