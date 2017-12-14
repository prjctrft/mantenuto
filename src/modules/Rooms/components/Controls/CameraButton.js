/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'reactstrap';

import { toggleCameraTooltip } from '../../redux';

export class CameraButtonComponent extends Component {

  toggle = () => {
    this.props.toggleCameraTooltip()
  }

  render() {
    const iconVideoOn = require('./assets/ic_video_on.png');
    const iconVideoOff = require('./assets/ic_video_off.png');
    const styles = require('./CameraButton.scss');
    return (
      <button
        id='CameraButton'
        onClick={this.props.onClick} type="button"
        className={`btn btn-default `}
        >
        <img className='img-fluid' src={this.props.cameraOn ? iconVideoOn : iconVideoOff} aria-hidden="true" />
        {!this.props.camerOn ?
          <Tooltip placement="right-start" className={styles.Tooltip} isOpen={this.props.cameraTooltip} target="CameraButton" toggle={this.toggle}>
            Click to turn your camera on!
          </Tooltip>
          : null
        }
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  const { cameraOn, cameraTooltip } = state.rooms;
  return { cameraOn, cameraTooltip }
}

export default connect(mapStateToProps, { toggleCameraTooltip })(CameraButtonComponent)
