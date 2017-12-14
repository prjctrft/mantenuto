import React from 'react';
import { connect } from 'react-redux';

const CallButton = (props) => {
  return (
    <button
      onClick={props.onClick} type="button"
      className={`btn btn-default ${props.className}`}
    >
      {props.src ? <img className='img-fluid' src={props.src} aria-hidden="true" /> : null}
      {props.faClass ? <i className={props.faClass} /> : null }
    </button>
  )
}

const mapStateToProps = (state) => {
  const peerCheckedIn = state.rooms.peerCheckedIn;
  return { peerCheckedIn }
}

export default connect(mapStateToProps)(CallButton)
