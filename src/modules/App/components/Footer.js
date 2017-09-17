import React from 'react';

const Footer = () => {
	const styles = require('./Footer.scss');
	return (
  <footer className={styles.footer}>
    <span>&copy;2017 by Project Refit</span>
    <button><a href="https://www.projectrefit.us/">Home site</a></button>
    <button><a href="/sponsors">Our sponsors</a></button>
  </footer>
	)
}

export default Footer
