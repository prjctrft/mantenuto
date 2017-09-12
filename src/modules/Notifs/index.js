import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/lib/Alert';

//kind = one of: "success", "warning", "danger", "info"

@connect(
  (state, props) => ({notifs: state.notifs}),
  {}
)
export default class Notifs extends Component {
  static propTypes = {
    notifs: PropTypes.object.isRequired,
    // NotifComponent: PropTypes.func.isRequired,
    // className: PropTypes.string
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     alertVisible: true;
  //   }
  // }

  // handleAlertDismiss = () => {
  //   this.setState({ alertVisible: false });
  // }

  render() {
    const styles = require('./Notifs.scss');
    //const { notifs } = this.props.notifs;
    const notifs = [
      {
        message: 'The greatest success ever',
        kind: 'success'
      },
      {
        message: 'The greatest warning ever',
        kind: 'warning'
      },
      {
        message: 'The greatest danger ever',
        kind: 'danger'
      },
      {
        message: 'The greatest info ever',
        kind: 'info'
      }
    ]
    // if (!notifs) {
    //   return null;
    // }


    return (
      <div className={`notif-container ${this.props.className}`}>

        {notifs.map(notif =>
          <Alert 
            key={notif.id}
            bsClass={styles.notification}
            className={styles[notif.kind]}
          >
            {notif.message}
          </Alert>)}
      </div>
    );
  }
}
