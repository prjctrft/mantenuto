import React from 'react';
import { connect } from 'react-redux';

const PeerStatus = (props) => {
  const styles = require('./PeerStatus.scss');
  return (
    <div className={`${styles.PeerStatus} text-center`}>
      <p>
        { props.peerCheckedIn ?
          <i className="fa fa-circle" aria-hidden="true"></i> :
          <i className="fa fa-circle-o" aria-hidden="true"></i>
        }
        <span className={styles.username}>{props.peer.username}</span>
      </p>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { peerCheckedIn, peer } = state.rooms;

  return { peerCheckedIn, peer }
}

export default connect(mapStateToProps)(PeerStatus);
