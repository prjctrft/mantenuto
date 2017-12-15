import React from 'react';
import PropTypes from 'prop-types';
import { RefitButton } from 'components';

const ListenerNotFound = (props) =>
(
  <div>
    <h3>There aren{"'"}t currently any listeners online available to talk.</h3>
    <RefitButton content='Keep searching?' onClick={props.startSearch} />
    {/* <p>But not to worry!</p>
    <p>We just sent an email out to our {props.totalListeners} of our best listeners.</p>
    <p>They{"'"}ll be in touch soon!</p> */}
  </div>
)

ListenerNotFound.propTypes = {
  startSearch: PropTypes.func.isRequired
  // totalListeners: PropTypes.number
}

export default ListenerNotFound;
