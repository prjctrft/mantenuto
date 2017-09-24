import React from 'react';

const NotFound = () => {
  const styles = require('./NotFound.scss');

  return (
    <div className={styles.container}>
      <h1>Sorry!</h1>
      <p>We <em>can{"'"}t</em> find the page the you are looking for!</p>
    </div>
  );
}

export default NotFound;
