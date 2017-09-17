/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

const styles = require('./Chat.scss');

const Messages = (props) => {
  const { messages, user, peer } = props;
  if (messages.length === 0) {
    return <p><em>No messages in your chat history.</em></p>
  }
  const list =  messages.map((message, i) => {
      let side;
      let opposite;
      let sender;
      if (user && (message.user === user._id)) {
        side = 'right';
        opposite = 'left';
        sender = user;
      }
      if (peer && (message.user === peer._id)) {
        side = 'left';
        opposite = 'right';
        sender = peer;
      }
      const minutesAgo = (new Date().getTime() - Date.parse(message.timestamp)) / (60 * 1000);
      let displayTime =  `${Math.ceil(minutesAgo)} Minutes Ago`;
      if (minutesAgo > 59) {
        displayTime = `${Math.round(minutesAgo / (60))} Hours Ago`;
        if (minutesAgo > (60 * 24 * 2) ) {
          displayTime = `${Math.round(minutesAgo / (60 * 24))} Days Ago`;
        }
        if (minutesAgo > (60 * 24) ) {
          displayTime = 'Yesterday';
        }
      }
      return (
        <li key={i} className={`${styles[side]} clearfix`}><span className={`chat-img pull-${side}`}>
          <i className='fa fa-user-circle fa-3x' aria-hidden="true" />
        </span>
          <div className={`${styles.ChatBody} clearfix`}>
            <div className={`text-${opposite}`}>
              <small className=" text-muted"><span className="glyphicon glyphicon-time" />{' '}{displayTime}</small>
              <strong className={`pull-${side} primary-font`}>{`${sender ? sender.first : ''}`}</strong>
            </div>
            <p className={`text-${side}`}>
              { message.content }
            </p>
          </div>
        </li>
      )
    })
  return <div>{ list }</div>
}
const mapStateToProps = (state) => ({
  messages: state.rooms.messages,
  user: state.user.user,
  peer: state.rooms.peer.user
  // peer: state.rooms.peer
});

export default connect(mapStateToProps)(Messages)
