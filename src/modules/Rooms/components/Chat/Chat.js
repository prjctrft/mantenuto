/* eslint-disable */
import React from 'react';

import Messages from './Messages';

const styles = require('./Chat.scss');

export default (props) => {
  return (
    <div className={`${styles.Chat}`}>
      <div className={styles.closeChat}>
        <i className="fa fa-times fa-2x" aria-hidden="true"></i>
      </div>
      <button 
        disabled={props.disableLoadMore} 
        onClick={props.loadMore} 
        className={`${styles.loadmore} btn btn-default`}>
        Load More
      </button>
  
      <Messages />
    
      <div className={`${styles.MessageInput}`}>
        <textarea onKeyPress={props.handleSubmit} onChange={props.handleChange} value={props.content} className={`${styles.flexItem} form-control`} />
        <button onClick={props.handleSubmit} className={`${styles.flexItem} btn btn-primary`}>Send</button>
      </div>
    </div>
  )
}
