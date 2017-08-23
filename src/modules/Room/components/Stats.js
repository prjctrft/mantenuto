import React from 'react';

import { connect } from 'react-redux';

const Stats = (props) => {
  const peerCheckedIn = props.peerCheckedIn;
  let badge;
  if (peerCheckedIn) {
    badge = <span className={`badge ${props.styles.BadgeSuccess}`}>Checkedin!</span>;
  }
  if (!peerCheckedIn) {
    badge = <span className='badge default'>Not Checkedin</span>;
  }
  return (
    <h1>{props.peer ? props.peer.first : null}{' '}{badge}</h1>
  )
}

const mapStateToProps = (state) => ({
  peer: state.rooms.peer.user
})

export default connect(mapStateToProps)(Stats);
