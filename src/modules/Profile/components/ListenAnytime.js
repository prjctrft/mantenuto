import React, { Component } from 'react';

class ListenAnytime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listen: true
		}
	}

  toggleListen = () => {
    const { listen } = this.state;

    if (listen) {
      this.setState({
        listen: false
      });
    } else {
      this.setState({
        listen: true
      });
    }
  }

	render() {
		const styles = require('./ListenAnytime.scss');

		return (
  <div className={styles.ListenAnytime}>
    <h2>Listen anytime?</h2>
    { 
      this.state.listen ?
        <button className={styles.on} onClick={this.toggleListen}>On</button> :
        <button className={styles.off} onClick={this.toggleListen}>Off</button>
    }
  </div>
    );
  }
}

export default ListenAnytime;
