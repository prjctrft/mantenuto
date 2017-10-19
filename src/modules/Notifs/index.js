import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { notifDismiss } from './redux';

@connect((state) => ({notifs: state.notifs}), { notifDismiss })
export default class Notifs extends Component {
  static propTypes = {
    notifs: PropTypes.arrayOf(PropTypes.shape({
      kind: PropTypes.string.isRequired //one of: "success", "warning", "danger", "info"
    })),
    notifDismiss: PropTypes.func.isRequired,
  };

  dismiss = (id) => {
    return (e) => {
      e.preventDefault();
      this.props.notifDismiss(id);
    }
  }

  render() {
    const bootstrap = require('theme/bootstrap.scss');
    const styles = require('./Notifs.scss');
    const { notifs } = this.props.notifs;
    if (!notifs) {
      return null;
    }


    return (
      <div className={styles.notifContainer}>

        {notifs.map(notif =>
          (<Alert
            cssModule={bootstrap}
            key={notif.id}
            className={`${styles.notification} ${styles[notif.kind]}`}
            toggle={this.dismiss(notif.id)}
          >
            {notif.message}
          </Alert>))}
      </div>
    );
  }
}
