import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/lib/Alert';
import { notifDismiss } from './redux';

// kind = one of: "success", "warning", "danger", "info"

@connect((state) => ({notifs: state.notifs}), { notifDismiss })
export default class Notifs extends Component {
  static propTypes = {
    notifs: PropTypes.object.isRequired,
    notifDismiss: PropTypes.func.isRequired,
  };

  dismiss = (id) => {
    return (e) => {
      e.preventDefault();
      this.props.notifDismiss(id);
    }
  }

  render() {
    const styles = require('./Notifs.scss');
    const { notifs } = this.props.notifs;
    if (!notifs) {
      return null;
    }


    return (
      <div className={styles.notifContainer}>

        {notifs.map(notif =>
          (<Alert
            key={notif.id}
            bsClass={styles.notification}
            className={styles[notif.kind]}
            onDismiss={this.dismiss(notif.id)}
          >
            {notif.message}
          </Alert>))}
      </div>
    );
  }
}
