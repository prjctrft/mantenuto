import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import chatIcon from '../assets/ic_private_message.png';
import chatIconNewMessage from '../assets/ic_private_message_new.png';

const ChatIconButton = (props) => {
  const styles = require('./ChatIconButton.scss');
  return (
    <div className={styles.ChatIconButton}>
      <button onClick={props.toggleChat}>
        {props.unreadMessages > 0 ? 
          <img src={chatIconNewMessage} alt='new chats' />
          : 
          <img src={chatIcon} alt='chat icon' /> 
        }
      </button>
      {props.unreadMessages > 0 ? <p>You have {props.unreadMessages} unread messages!</p> : null }
    </div>
  )
}

ChatIconButton.propTypes = {
  toggleChat: PropTypes.func.isRequired,
  unreadMessages: PropTypes.array.isRequired
}

export default connect((state) => ({unreadMessages: state.messages.unreadMessages}))(ChatIconButton);
