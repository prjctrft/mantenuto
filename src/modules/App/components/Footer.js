import React from 'react';

export default function Footer(props) {
	const styles = require('./Footer.scss');
	return (
		<footer className={styles.footer}>
			<span>&copy;2017 by Project Refit</span>
			<button><a href="https://www.projectrefit.us/">Home site</a></button>
			<button><a href="#">Our sponsors</a></button>
		</footer>
	)
}
