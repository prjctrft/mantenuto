import React, { Component } from 'react';

const ListenAnytime = (props) => {
	const styles = require('./ListenAnytime.scss');

		return (
		  <div className={styles.ListenAnytime}>
		    <h2>Listen anytime?</h2>
		    {
		      props.listenAnytime ?
		        <button className={styles.on} onClick={this.props.toggleListen}>On</button> :
		        <button className={styles.off} onClick={props.toggleListen}>Off</button>
		    }
		  </div>
		  );
	}

export default ListenAnytime;
