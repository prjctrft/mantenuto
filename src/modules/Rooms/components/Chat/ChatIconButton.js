import React from 'react';
import PropTypes from 'prop-types';

const ChatIconButton = (props) => {
  const styles = require('./Chat.scss');

  return (
    <div className={styles.ChatIconContainer}>
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
