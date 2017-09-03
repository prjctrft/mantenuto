import React from 'react';

export default function ListenAnytime(props) {
	const styles = require('./ListenAnytime.scss');

	return (
		<div className={styles.ListenAnytime}>
			<h2>Listen anytime?</h2>
			<button>On</button>
		</div>
	)
}