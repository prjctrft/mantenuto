/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { pushMessage, addMessage, loadMessages } from '../../redux';

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

  render() {
    return (<Chat
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      content={this.state.content}
      disableLoadMore={this.disableLoadMore}
      toggleChat={this.props.toggleChat}
      renderChat={this.props.renderChat}
    />)
  }
}
