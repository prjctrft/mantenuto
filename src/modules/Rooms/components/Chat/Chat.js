/* eslint-disable */
import React from 'react';

import Messages from './Messages';

const styles = require('./Chat.scss');

export default (props) => {
  return (
    <div className={`${styles.Chat}`}>
      <ul className={`${styles.ChatList}`}>
        {/* <li className={`${styles.LoadMore}`}> */}
        <li className='text-center'>
          <button disabled={props.disableLoadMore} onClick={props.loadMore} className={`${styles.flexItem} btn btn-default`}>Load More</button>
        </li>
        {/* { this.renderMessages(styles) } */}
        <Messages />
        <li className={`${styles.MessageInput}`}>
          <textarea onKeyPress={props.handleSubmit} onChange={props.handleChange} value={props.content} className={`${styles.flexItem} form-control`} />
          <button onClick={props.handleSubmit} className={`${styles.flexItem} btn btn-primary`}>Send</button>
        </li>
      </ul>
    </div>
  )
}
