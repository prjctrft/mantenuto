/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { pushMessage, addMessage, loadMessages, markMessagesRead } from 'modules/Messages/redux';

import Chat from './Chat';

class ChatController extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      disableLoadMore: false,
      limit: 5
    };
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.peerId && nextProps.peerId) {
      this.loadMessages({to: nextProps.peerId});
    }
    if(nextProps.renderChat && !this.props.renderChat) {
      this.props.markMessagesRead();
    }
  }

  loadMessages = ({ to }) => {
    this.props.loadMessages({
      from: this.props.userId,
      to
    })
    // .then((response) => {
    //   const { skip, total } = response;
    //   this.setState({skip, total })
    // });
    // this.props.loadMessages({
    //   room: this.props.roomId,
    //   $sort: { 'timestamp': -1 }
    // }).then((response) => {
    //   const { limit, skip } = response;
    //   this.setState({...this.state, limit, skip })
    // });
  }

  // registerListeners = () => {
  //   app.service('messages')
  //     .on('created', (message) => {
  //       this.props.addMessage(message);
  //     });
  // }

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  }

  handleSubmit = (e) => {
    if (e.charCode && e.charCode !== 13) {
      return;
    }
    e.preventDefault();
    const from = this.props.userId
    const to = this.props.peerId
    const timestamp  = Date();
    const content = this.state.content;
    const message = {
      from,
      to,
      timestamp,
      content
    };
    this.props.addMessage(message);
    this.props.pushMessage(message);
  }

  loadMore = (e) => {
    if (this.props.skip >= this.props.total) {
      this.setState({disableLoadMore: true })
      return;
    }
    this.props.loadMessages({
      from: this.props.userId,
      to: this.props.peerId,
      skip: this.props.skip + this.state.limit
    })
  }

  render() {
    return (<Chat
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      content={this.state.content}
      disableLoadMore={this.disableLoadMore}
      toggleChat={this.props.toggleChat}
      renderChat={this.props.renderChat}
      loadMore={this.loadMore}
    />)
  }
}

const mapStateToProps = (state) => {
  const { skip, limit, total } = state.messages;
  return {
    userId: state.user.user._id,
    peerId: state.rooms.peer._id,
    roomId: state.rooms.room._id,
    skip, limit, total
  }
}

export default connect(mapStateToProps, { pushMessage, addMessage, loadMessages, markMessagesRead })(ChatController)
