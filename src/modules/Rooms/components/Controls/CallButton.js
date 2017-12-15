import React from 'react';
import { connect } from 'react-redux';

const CallButton = (props) => {
  const glowPhone = require('./assets/ic_phone_green_glow.png')
  return (
    <button
      onClick={props.onClick} type="button"
      className={`btn btn-default ${props.className}`}
    >
      {props.callInProgress ?
        <img className='img-fluid' src={glowPhone} aria-hidden="true" /> :
        <i className='fa fa-phone fa-2x' />
      }
    </button>
  )
}

const mapStateToProps = (state) => {
  const { peerCheckedIn } = state.rooms;
  const { callInProgress } = state.calls;
  return { peerCheckedIn, callInProgress }
}

export default connect(mapStateToProps)(CallButton)
