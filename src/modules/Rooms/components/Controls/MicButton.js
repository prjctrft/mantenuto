/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'reactstrap';

import { toggleMicTooltip } from '../../redux';

export class MicButtonComponent extends Component {
  // constructor(props) {
  //    super(props);
  //    this.state = {
  //      tooltipOpen: false
  //    }
  // }

  toggle = () => {
    this.props.toggleMicTooltip()
  }

  render() {
    const iconVoiceOn = require('./assets/ic_voice_on.png');
    const iconVoiceOff = require('./assets/ic_voice_off.png');
    const styles = require('./MicButton.scss');
    return (
      <button
        id='MicButton'
        onClick={this.props.onClick} type="button"
        className={`btn btn-default ${this.props.className}`}
      >
        <img className='img-fluid' src={this.props.audioOn ? iconVoiceOn : iconVoiceOff} aria-hidden="true" />
        {!this.props.audioOn ?
          <Tooltip placement="left-start" className={styles.Tooltip} isOpen={this.props.micTooltip} target="MicButton" toggle={this.toggle}>
            Click to unmute your mic!
          </Tooltip>
          : null
        }
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  const { micTooltip, audioOn } = state.rooms;
  return {
    micTooltip,
    audioOn
  }
}

export default connect(mapStateToProps, { toggleMicTooltip })(MicButtonComponent)
