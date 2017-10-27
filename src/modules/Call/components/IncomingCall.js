import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const IncomingCall = (props) => {
  return (
    <Modal isOpen={props.modalOpen} toggle={props.toggle} className={props.className}>
      <ModalBody>
        {/* <div className='row justify-content-center'> */}
          {/* <div className='col-6'> */}
            <h2 className='text-center'>{props.peer.username} is calling!</h2>
            <h2 className='text-center'>...<i className={'fa fa-2x fa-phone'} /></h2>
            <div className='row'>
              <div className='col-6 text-success'>
                <button onClick={props.acceptCall} className='btn btn-lg btn-success'>Accept?</button>
              </div>
              <div className='col-6 text-center'>
                <button onClick={props.rejectCall} className='btn btn-lg btn-outline-danger'>Reject?</button>
              </div>
            </div>
          {/* </div> */}
        {/* </div> */}
      </ModalBody>
    </Modal>
  );
};

export default IncomingCall;
