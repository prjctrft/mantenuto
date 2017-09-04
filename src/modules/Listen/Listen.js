import React, { Component } from 'react';

import Connecting from './components/Connecting';
import Preferences from './components/Preferences';

class Listen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connecting: false
    }
  }

  handleAnytime = () => {
    // some action
    this.setState({ connecting: true });
  }

  handleNow = () => {
    // some action
    this.setState({ connecting: true });
  }

  render() {
    // TODO don't display preferences if user has already chosen ANYTIME
    if(this.state.connecting) {
      return <Connecting />
    }
    return <Preferences handleNow={this.handleNow} handleAnytime={this.handleAnytime} />;
  }
}

export default Listen;
