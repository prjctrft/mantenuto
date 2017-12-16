/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

const Messages = (props) => {
  const styles = require('./Messages.scss');
  const { messages, user, peer } = props;
  if (messages.length === 0) {
    return <p><em>No messages in your chat history.</em></p>
  }
  if(!user._id || !peer._id) {
    return null;
  }
  const list =  messages.map((message, i) => {
      let side;
      let opposite;
      let sender;
      if (message.from === user._id) {
        side = 'right';
        opposite = 'left';
        sender = user;
      }
      // debugger;
      if (message.from === peer._id) {
        side = 'left';
        opposite = 'right';
        sender = peer;
      }
      const minutesAgo = (new Date().getTime() - Date.parse(message.timestamp)) / (60 * 1000);
      let displayTime =  `${Math.ceil(minutesAgo)} Minutes Ago`;
      if (minutesAgo > 59) {
        displayTime = `${Math.round(minutesAgo / (60))} Hours Ago`;
        if (minutesAgo > (60 * 24) ) {
          displayTime = 'Yesterday';
          if (minutesAgo > ((60 * 24) + 1) ) {
            displayTime = `${Math.round(minutesAgo / (60 * 24))} Days Ago`;
            if (minutesAgo > (60 * 24 * 30) ) {
              displayTime = `${Math.round(minutesAgo / (60 * 24 * 30))} Months Ago`;
            }
          }
        }
      }
      return (
        <li key={i} className={styles[side]}>
          <div className={styles.MessageBody}>
            <div>
              <small className={styles.time}><span className="glyphicon glyphicon-time" />{' '}{displayTime}</small>
              <strong className="primary-font">{sender.username || ''}</strong>
            </div>
            <p>
              { message.content }
            </p>
          </div>
        </li>
      )
    })
  return <ul className={styles.ChatList}>{ list }</ul>
}
const mapStateToProps = (state) => {
  const peer = state.rooms.peer;
  const messages = state.messages.messages;
  return {
    user: state.user.user,
    messages,
    peer
  }
};

export default connect(mapStateToProps)(Messages)
