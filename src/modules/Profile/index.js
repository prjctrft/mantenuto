import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateUser } from 'modules/user/redux';
import { updatePassword } from 'modules/Password/redux';

import { notifSend } from '../Notifs/redux';

import ProfileForm from './components/ProfileForm';
import ListenAnytime from './components/ListenAnytime';
import ChangePassword from './components/ChangePassword';

@connect(
  state => ({
    user: state.user.user,
    userPopulated: state.user.userPopulated
  }), { updateUser, updatePassword, notifSend }
)
export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changePassword: false
    }
  }

  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired,
    user: PropTypes.object,
    userPopulated: PropTypes.bool.isRequired
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

  updatePassword = ({password, newPassword, confirmPassword}) => {
    const id = this.props.user._id;
    return this.props.updateUser(id, {password, newPassword, confirmPassword})
      .then(() => {
        this.setState({ changePassword: false });
        this.success()
      });
  }

  success = () => {
    const notif = {
      kind: 'success',
      message: 'You successfully updated your profile!',
      dismissAfter: 5000
    }
    this.props.notifSend(notif);
  }

  toggleListen = () => {
    const listenAnytime = !this.props.user.listenAnytime;
    this.props.updateUser(this.props.user._id, {listenAnytime})
      .then(this.success);
  }

  toggleChangePassword = () => {
    this.setState({changePassword: !this.state.changePassword})
  }

  render() {
    const styles = require('./Profile.scss');
    const { user, userPopulated } = this.props;

    // user is initialized as an empty object, so this will ALWAYS be true
    // let's move this concern to the form itself
    return (
      <div className={`${styles.profile} container`}>
        <div className='text-center'>
            <h1>Profile</h1>
        </div>
        { userPopulated ? <ProfileForm initialValues={user} onSubmit={this.updateProfile} /> : <div>Loading Profile Information...</div> }
        <ChangePassword changePassword={this.state.changePassword} toggleChangePassword={this.toggleChangePassword} onSubmit={this.updatePassword} />
        <ListenAnytime toggleListen={this.toggleListen} listenAnytime={user.listenAnytime} />
      </div>
    )
  }
}
