import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

import { updateUser } from 'modules/user/redux';

import { notifSend } from '../Notifs/redux';

import ProfileForm from './components/ProfileForm';
import ListenAnytime from './components/ListenAnytime';

@connect(
  state => ({
    user: state.user
  }), { updateUser, notifSend }
)
export default class Profile extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired,
    user: PropTypes.object
    // handleSubmit: PropTypes.func.isRequired,
    // error: PropTypes.string
  }

  updateProfile = (data) => {
    const initial = this.props.user.user;
    const patch =  {};
    for(let key in data) {
      const d = data[key];
      if(d !== initial[key]) {
        patch[key] = d;
      }
    }
    if (Object.keys(patch).length > 0) {
      this.props.updateUser(data._id, patch).then(this.success)
    }
  }

  success = () => {
    const notif = {
      kind: 'success',
      message: 'You successfully updated your profile!'
    }
    this.props.notifSend(notif);
  }

  toggleListen = () => {
    debugger;
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
    const styles = require('./Profile.scss');
    const { user } = this.props;
    debugger;
    // user is initialized as an empty object, so this will ALWAYS be true
    // let's move this concern to the form itself
    return (
      <div className={styles.profile}>
        <h1>Profile</h1>
        { user.userPopulated ? <ProfileForm initialValues={user.user} onSubmit={this.updateProfile} /> : <div>Loading Profile Information...</div> }
        <ListenAnytime toggleListen={this.toggleListen} listenAnytime={user.user.listenAnytime} />
      </div>
    )
  }
}
