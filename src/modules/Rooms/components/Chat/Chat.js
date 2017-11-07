/* eslint-disable */
import React from 'react';

import Messages from './Messages';


export default (props) => {
  const styles = require('./Chat.scss');

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatHeader}>
        <button className={styles.closeChat} onClick={props.toggleChat}>
          <i className={`fa ${styles.faTimesThin} fa-2x`} aria-hidden="true"></i>
        </button>
      </div>
      <p className='text-center'>
        <button
          disabled={props.disableLoadMore}
          onClick={props.loadMore}
          className='btn btn-default btn-sm btn-outline-secondary'>
          ...
        </button>
      </p>
      <Messages />

      <div className={`${styles.MessageInput}`}>
        <textarea placeholder='Send some love.' onKeyPress={props.handleSubmit} onChange={props.handleChange} value={props.content} className={`${styles.flexItem} form-control`} />
        {/* <button onClick={props.handleSubmit} className={`btn btn-primary`}>Send</button> */}
      </div>
    </div>
  )
}
