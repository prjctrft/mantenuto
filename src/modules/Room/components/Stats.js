import React from 'react';

export default (props) => {
  if (!props.peer || !props.user) {
    return null;
  }
  const peerCheckedIn = props.peerCheckedIn;
  let badge;
  if (peerCheckedIn) {
    badge = <span className={`badge ${props.styles.BadgeSuccess}`}>Checkedin!</span>;
  }
  if (!peerCheckedIn) {
    badge = <span className='badge default'>Not Checkedin</span>;
  }
  return (
    <h1>{props.peer.user.first}{' '}{badge}</h1>
  )
}
