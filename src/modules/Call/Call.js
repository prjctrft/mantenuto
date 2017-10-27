import React, { Component } from 'react';
import app from 'app';
import { connect } from 'react-redux';

import { callIncoming, acceptCall, rejectCall } from './redux';

import MakingCall from './components/MakingCall';
import IncomingCall from './components/IncomingCall';

export class CallController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  componentDidMount() {
    app.service('calls').on('created', (Call) => {
      if(!this.props.makingCall) {
        this.props.callIncoming();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.makingCall || nextProps.incomingCall && !this.state.modalOpen) {
      this.setState({ modalOpen: true });
    }
  }

  render() {
    return (
      <div>
        {this.props.makingCall ?
          <MakingCall
            modalOpen={this.state.modalOpen}
            peer={this.props.peer} />
            : null}
        {this.props.incomingCall ?
          <IncomingCall
            modalOpen={this.state.modalOpen}
            acceptCall={this.props.acceptCall}
            rejectCall={this.props.rejectCall}
            peer={this.props.peer} />
            : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const peer = state.rooms.peer;
  return { ...state.calls, peer }
};

export default connect(mapStateToProps, { callIncoming, acceptCall, rejectCall })(CallController)
