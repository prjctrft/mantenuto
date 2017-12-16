/* eslint-disable */
import React, { Component } from 'react';
import { Slide } from 'components';

import PeerStatus from './PeerStatus';
import Chat from './Chat';
import ChatIconButton from './ChatIconButton';
import Controls from './Controls';
import Video from './Video';
import Stats from './Stats';

export default class RoomsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderChat: false
    }
  }

  toggleChat = () => {
    this.setState({renderChat: !this.state.renderChat});
  }

  chatClasses = () => {
    const classes = ['col-12', 'col-xl-3', 'align-items-center', 'd-flex', 'flex-column']
    if(this.state.renderChat) {
      return classes.concat(['col-md-3', 'justify-content-start']).join(' ');
    }
    return classes.concat(['col-md-2', 'justify-content-end']).join(' ');
  }

  render() {
    const styles = require('./RoomsLayout.scss');
    return (
      <div className={`${styles.RoomsLayout} container-fluid`}>
        <div className='row align-items-center pt-5 pb-2'>
          <div className='col-12'>
            <PeerStatus />
          </div>
        </div>
        <div className='row justify-content-end pb-5'>
          <div className='col-12 col-md-8 col-xl-6'>
            {/* <Stats peer={this.props.peer} user={this.props.user} styles={styles} /> */}
            <Video />
          </div>
          <div className={`${styles.chatCol} ${this.chatClasses()}`}>
            <Slide slideIn={this.state.renderChat} duration={1000}>
              <div className='mb-3'>
                <Chat renderChat={this.state.renderChat} toggleChat={this.toggleChat} />
              </div>
            </Slide>
          </div>
          {/* <div className='col-md-3'> */}
          {/* </div> */}
        </div>
        <div className='row justify-content-end'>
          <div className='col-12 col-md-8 col-xl-6'>
            <Controls />
          </div>
          <div className={`${styles.chatCol} ${this.chatClasses()}`}>
            <ChatIconButton className='mt-3' toggleChat={this.toggleChat} />
          </div>
        </div>
      </div>
    );
  }
}
