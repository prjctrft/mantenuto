import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUser } from 'modules/user/redux';

import Connecting from './components/Connecting';
import Preferences from './components/Preferences';


class Listen extends Component {
  constructor(props) {
    super(props);
  }

  handleAnytime = () => {
    this.props.updateUser(this.props.user.id, {listenAnytime: true });
  }

  handleNow = () => {
    this.props.updateUser(this.props.user.id, {listenAnytime: false });
  }

  render() {
    // TODO don't display preferences if user has already chosen ANYTIME
    return (
      <div>
        <Connecting />
        {!this.props.user.listenAnytime ?
          <Preferences handleNow={this.handleNow} handleAnytime={this.handleAnytime} />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, { updateUser }, Listen);
