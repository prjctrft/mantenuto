import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MakingCall = (props) => {
  return (
    <Modal isOpen={props.modalOpen} toggle={props.toggle} className={props.className}>
      <ModalBody>
        {/* <div className='row justify-content-center'> */}
          {/* <div className='col-6'> */}
            <h2 className='text-center'>Calling {props.peer.username}!</h2>
            <h2 className='text-center'>...<i className={'fa fa-2x fa-phone'} /></h2>
          {/* </div> */}
        {/* </div> */}
      </ModalBody>
    </Modal>
  );
};

export default MakingCall;
