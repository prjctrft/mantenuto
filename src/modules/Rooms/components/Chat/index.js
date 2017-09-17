/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { pushMessage, addMessage, loadMessages } from '../../actions';

import Chat from './Chat';

@connect(state => ({
  messages: state.rooms.messages,
  user: state.user.user,
  peer: state.rooms.peer,
  roomId: state.rooms.room._id
}), { pushMessage, addMessage, loadMessages })
export default class ChatContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      disableLoadMore: false
    };
  }

  componentDidMount() {
    this.props.loadMessages({
      room: this.props.roomId,
      $sort: { 'timestamp': -1 }
    }).then((response) => {
      const { limit, skip } = response;
      this.setState({...this.state, limit, skip })
    });
    this.registerListeners();
  }

  registerListeners = () => {
    app.service('messages')
      .on('created', (message) => {
        this.props.addMessage(message);
      });
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  }

  handleSubmit = (e) => {
    if (e.charCode && e.charCode !== 13) {
      return;
    }
    e.preventDefault();
    const room = this.props.roomId;
    const user = this.props.user._id;
    const peer = this.props.peer._id;
    const timestamp  = Date();
    const content = this.state.content;
    const message = {
      user,
      peer,
      timestamp,
      content,
      room
    };
    this.props.addMessage(message);
    this.props.pushMessage(message);
  }

  loadMore = (e) => {
    if (this.state.skip >= this.state.total) {
      this.setState({...this.state, disableLoadMore: true })
      return;
    }
    this.props.loadMessages({
      room: this.props.roomId,
      $sort: { 'timestamp': -1 },
      $skip: this.state.skip + this.state.limit
    }).then((response) => {
      const { skip, total } = response;
      this.setState({...this.state, skip, total })
    });
  }

  // renderMessages = (styles) => {
  //   const { messages, user, peer } = this.props;
  //   if (messages.length === 0) {
  //     return <p><em>No messages in your chat history.</em></p>
  //   }
  //   return messages.map((message, i) => {
  //       let side;
  //       let opposite;
  //       let sender;
  //       if (message.user === user._id) {
  //         side = 'right';
  //         opposite = 'left';
  //         sender = user;
  //       }
  //       if (message.user === peer._id) {
  //         side = 'left';
  //         opposite = 'right';
  //         sender = peer;
  //       }
  //       const minutesAgo = (new Date().getTime() - Date.parse(message.timestamp)) / (60 * 1000);
  //       let displayTime =  `${Math.ceil(minutesAgo)} Minutes Ago`;
  //       if (minutesAgo > 59) {
  //         displayTime = `${Math.round(minutesAgo / (60))} Hours Ago`;
  //         if (minutesAgo > (60 * 24 * 2) ) {
  //           displayTime = `${Math.round(minutesAgo / (60 * 24))} Days Ago`;
  //         }
  //         if (minutesAgo > (60 * 24) ) {
  //           displayTime = 'Yesterday';
  //         }
  //       }
  //       return (
  //         <li key={i} className={`${styles[side]} clearfix`}><span className={`chat-img pull-${side}`}>
  //             <i className='fa fa-user-circle fa-3x' aria-hidden="true" />
  //         </span>
  //             <div className={`${styles.ChatBody} clearfix`}>
  //                 <div className={`text-${opposite}`}>
  //                     <small className=" text-muted"><span className="glyphicon glyphicon-time"></span>{' '}{displayTime}</small>
  //                     <strong className={`pull-${side} primary-font`}>{`${sender.first}`}</strong>
  //                 </div>
  //                 <p className={`text-${side}`}>
  //                     { message.content }
  //                 </p>
  //             </div>
  //         </li>
  //       )
  //     })
  // }

  render() {
    // const styles = require('./Chat.scss');
    // const { user, peer, messages } = this.props;

    return (<Chat
      onChange={this.handleChange}
      onSubmit={this.handleSubmit}
      content={this.state.content}
      disableLoadMore={this.disableLoadMore}
    />)

    // return (
    //   <div className={`${styles.Chat}`}>
    //     <ul className={`${styles.ChatList}`}>
    //       {/* <li className={`${styles.LoadMore}`}> */}
    //       <li className='text-center'>
    //         <button disabled={this.state.disableLoadMore} onClick={this.loadMore} className={`${styles.flexItem} btn btn-default`}>Load More</button>
    //       </li>
    //       { this.renderMessages(styles) }
    //       <li className={`${styles.MessageInput}`}>
    //         <textarea onKeyPress={this.handleSubmit} onChange={this.handleChange} value={this.state.content} className={`${styles.flexItem} form-control`} />
    //         <button onClick={this.handleSubmit} className={`${styles.flexItem} btn btn-primary`}>Send</button>
    //       </li>
    //     </ul>
    //   </div>
    // )
  }
}
