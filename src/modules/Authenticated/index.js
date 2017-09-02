import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import { populateRooms } from '../App/redux';

import Authenticated from './Authenticated';

@connect(
  state => ({
    user: state.user.user,
    id: state.auth.user,
    rooms: state.user.rooms,
    authenticated: state.auth.user
    // socketAuthenticated: state.auth.socketAuthenticated
  }), { push, populateRooms })
export default class AuthenticatedContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (!nextProps.rooms && nextProps.authenticated) {
      this.props.populateRooms(this.props.id);
    }
  }

  copyRoomLink = (slug) => {
    return (event) => {
      event.preventDefault();
      const linkElement = document.createElement('textarea');
      const roomLink = `${window.location.href}rooms/${slug}`;
      linkElement.innerText = roomLink;
      document.body.appendChild(linkElement)
      linkElement.select()
      document.execCommand('copy')
      linkElement.remove()
    }
  }

  gotoRoom = (slug) => {
    return (event) => {
      event.preventDefault();
      this.props.push(`/rooms/${slug}`);
    }
  }
  
  // renderWelcome = () => {
  //   const { user } = this.props;
  //   if (!user) {
  //     return null;
  //   }
  //   return (
  //     <div className='row'>
  //       <div className='col-xs-12 text-center'>
  //         <h1> Welcome { user.first }!</h1>
  //         <p className='lead'>We're really glad you're here.</p>
  //       </div>
  //     </div>
  //   )
  // }

  // renderRooms = () => {
  //   const { rooms } = this.props;
  //   if (!rooms) {
  //     return null;
  //   }
  //   const listenerRooms = [];
  //   const talkerRooms = [];
  //   rooms.forEach((room) => {
  //     const roomComponent = (
  //       <div key={room.slug}>
  //         {/* Room Link: <Link onClick={this.gotoRoom(room.slug)}>{`${window.location.href}rooms/${room.slug}`}</Link> */}
  //         <button onClick={this.copyRoomLink(room.slug)} className='btn btn-lg btn-default'>Copy Room Link</button>
  //         <button onClick={this.gotoRoom(room.slug)} className='btn btn-lg btn-default'>Go now!</button>
  //       </div>
  //     )
  //     if (room.listener.user._id === this.props.id) {
  //       return listenerRooms.push(roomComponent);
  //     }
  //     if (room.talker.user._id === this.props.id) {
  //       return talkerRooms.push(roomComponent)
  //     }
  //   });
  //   return (
  //     <div className='row'>
  //       <div className='col-xs-12 text-center'>
  //         <h3>Rooms where you are a talker:</h3>
  //         { talkerRooms.length > 0 ? talkerRooms : <em>None</em>}
  //         <h3>Rooms where you are a listener:</h3>
  //         { listenerRooms.length > 0 ? listenerRooms : <em>None</em>}
  //       </div>
  //     </div>
  //   )
  // }

  render() {
    return (
      <Authenticated />
    )
  }
}
// {/* <div className={styles.home}>
//   <Helmet title="Home" />
//   <div className={styles.masthead}>
//     <div className="container">
//       {/*<h1>Refit Chat</h1>
//
//       <h2>Where veterans connect and heal.</h2>*/}
//       <div className={styles.pipelineBtns}>
//
//           <button onClick={this.clickTalk} className='btn btn-lg btn-primary btn-block btn-circle'>
//             Talk
//           </button>
//
//
//           <button onClick={this.clickListen} className='btn btn-lg btn-primary btn-block btn-circle'>
//             Listen
//           </button>
//
//       </div>
//     </div>
//   </div>
// </div> */}
