import React from 'react';
import PropTypes from 'prop-types';

const ChatIconButton = (props) => {
  const styles = require('./ChatIconButton.scss');

  return (
    <div className={styles.ChatIconButton}>
      <button onClick={props.toggleChat}>
        <i className="fa fa-comments-o fa-3x" aria-hidden="true" />
      </button>
    </div>
  )
}

ChatIconButton.propTypes = {
  toggleChat: PropTypes.func.isRequired
}

export default ChatIconButton;
