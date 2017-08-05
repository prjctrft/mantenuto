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
    const { notifs } = this.props.notifs;
    if (!notifs) {
      return null;
    }


    return (
      <div className={`notif-container ${this.props.className}`}>
        {notifs.map(notif => <Alert key={notif.id} bsStyle={notif.kind}>{notif.message}</Alert>)}
      </div>
    );
  }
}
