import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import app from 'app';
import { Alert } from 'reactstrap';
import { notifDismiss } from './redux';

@connect((state) => ({notifs: state.notifs.notifs}), { notifDismiss })
export default class Notifs extends Component {
  static propTypes = {
    notifs: PropTypes.arrayOf(PropTypes.shape({
      kind: PropTypes.string.isRequired, //one of: "success", "warning", "danger", "info"
      message: PropTypes.string.isRequired,
      dismissAfter: PropTypes.number
    })),
    notifDismiss: PropTypes.func.isRequired,
  };

  componentDidMount() {
    app.service('notifications').on('talker waiting', ({roomSlug}) => {
      if(location.pathname === '/listen') {
        return;
      }
      const message = <p>A talker is waiting for you! Click here: <Link to={`/rooms/${roomSlug}`}>Room</Link></p>;
      notifSend({
        message,
        kind: 'success'
      });
    })
  }

  dismiss = (id) => {
    return (e) => {
      e.preventDefault();
      this.props.notifDismiss(id);
    }
  }

  render() {
    const styles = require('./Notifs.scss');
    const notifs = this.props.notifs;
    if (!notifs) {
      return null;
    }


    return (
      <div className={styles.notifContainer}>

        {notifs.map(notif =>
          (<Alert
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
