import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ChatIconButton = (props) => {
  const styles = require('./ChatIconButton.scss');

  return (
    <div className={styles.ChatIconButton}>
      <button onClick={props.toggleChat}>
        <i className="fa fa-comments-o fa-3x" aria-hidden="true" />
      </button>
      {props.unreadMessages > 0 ? <p>You have {props.unreadMessages} unread messages!</p> : null }
    </div>
  )
}

ChatIconButton.propTypes = {
  toggleChat: PropTypes.func.isRequired
}

export default connect((state) => ({unreadMessages: state.messages.unreadMessages}))(ChatIconButton);
