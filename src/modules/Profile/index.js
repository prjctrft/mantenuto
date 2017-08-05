import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../App/redux';

import { notifSend } from '../Notifs/redux';

import ProfileForm from './components/ProfileForm';

@connect(
  state => ({
    user: state.user.user
  }), { updateUser, notifSend }
)
export default class Profile extends Component {

  updateProfile = (data) => {
    const initial = this.props.user;
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

  success = (updatedUser) => {
    const notif = {
      kind: 'success',
      message: 'You successfully updated your profile!'
    }
    this.props.notifSend(notif);
  }

  render() {
    const { user } = this.props;
    if (user) {
      user.confirmEmail = user.email;
    }
    return (
      <div className='container'>
        <h1>Edit Your Profile</h1>
        { user ? <ProfileForm initialValues={user} onSubmit={this.updateProfile} /> : null }
      </div>
    )
  }
}
