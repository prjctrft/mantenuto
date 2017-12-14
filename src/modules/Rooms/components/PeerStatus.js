import React from 'react';
import { connect } from 'react-redux';

const PeerStatus = (props) => {
  if(props.peerCheckedIn) {
    return <hr style={{
      'border': '2px solid green',
      'width': '100%'
    }}
    />
  }
  return null;
}

const mapStateToProps = (state) => {
  const peerCheckedIn = state.rooms.peerCheckedIn;
  return { peerCheckedIn }
}

export default connect(mapStateToProps)(PeerStatus);
