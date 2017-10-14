import React from 'react';
import PropTypes from 'prop-types';

const ListenAnytime = (props) => {
  const styles = require('./ListenAnytime.scss');
  return (
    <div className={styles.ListenAnytime}>
      <h2>Listen anytime?</h2>
      {props.listenAnytime
        ? <button className={styles.on} onClick={props.toggleListen}>On</button>
        : <button className={styles.off} onClick={props.toggleListen}>Off</button>}
    </div>
  );
}

ListenAnytime.propTypes = {
  toggleListen: PropTypes.func.isRequired,
	listenAnytime: PropTypes.bool.isRequired
};

export default ListenAnytime;
