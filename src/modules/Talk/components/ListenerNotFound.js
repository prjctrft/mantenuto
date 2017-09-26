import React, { PropTypes } from 'react';

const ListenerNotFound = ({ totalListeners }) =>
(
  <div>
    <h3>There aren{"'"}t currently any listeners online.</h3>
    <p>But not to worry!</p>
    <p>We just sent an email out to our {totalListeners} of our best listeners.</p>
    <p>They{"'"}ll be in touch soon!</p>
  </div>
)

ListenerNotFound.propTypes = {
  totalListeners: PropTypes.number
}

export default ListenerNotFound;
