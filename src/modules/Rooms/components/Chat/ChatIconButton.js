import React from 'react';

const styles = require('./Chat.scss');

const ChatIconButton = (props) => {
  return (
    <div className={styles.ChatIconContainer}>
      <button onClick={props.toggleChat}>
        <i className="fa fa-comments-o fa-3x" aria-hidden="true" />
      </button>
    </div>
  )
}

export default ChatIconButton;