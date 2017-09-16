import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import ControlButton from './ControlButton';

export default (props) => {

  const styles = require('./Controls.scss');

  return (
    <div className={`${styles.controlBar}`}>
      <div className="btn-group btn-group-lg" role="group" aria-label="...">
        <ControlButton
          onClick={props.toggleVideo}
          streamOpen={props.streamOpen}
          controlOn={props.cameraOn}
          faClass={'fa fa-eye'}
        />
        <ControlButton
          onClick={props.toggleAudio}
          streamOpen={props.streamOpen}
          controlOn={props.audioOn}
          faClass={'fa fa-microphone'}
        />
        <ControlButton
          onClick={props.startCall}
          streamOpen={props.streamOpen}
          controlOn={props.wasCallAccepted}
          faClass={'fa fa-phone'}
        />
        {/* <button onClick={this.startCall}
          type="button"
          className={
            `${this.disableCallButton() ? 'disabled' : ''}
            btn btn-default`
          }
          >
          <i className='fa fa-phone' aria-hidden='true'></i>
        </button> */}
        <ControlButton
          onClick={props.stopCall}
          streamOpen={props.wasCallAccepted}
          controlOn={!props.wasCallAccepted}
          faClass={'fa fa-times'}
        />
        {/* <button onClick={this.stopCall}
          type="button"
          className={
            `${this.disableControlButtons() ? 'disabled' : ''}
            btn btn-default`
          }>
          <i className='fa fa-times' aria-hidden='true' />
        </button> */}
      </div>
       <Modal show={props.receiveCallPrompt} onHide={props.close}>
        <Modal.Header closeButton>
          { props.peer && props.peer.user ? <Modal.Title>Incoming Call from {props.peer.user.first}.</Modal.Title> : null }
        </Modal.Header>
        <Modal.Body>
          <h4>Accept Call?</h4>
          <hr />
          <p className={styles.BtnBar}>
            <button type='button' onClick={props.acceptCallOnClick(true)} className='btn btn-success'>Accept</button>
            <button type='button' onClick={props.acceptCallOnClick(false)} className='btn btn-danger'>Don't Accept</button>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-default' onClick={props.close}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
