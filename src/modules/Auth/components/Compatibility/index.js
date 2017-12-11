import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Compatibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div> {/* not sure if we need this container div*/}
        {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        don't think we need this button, was in reactstrap example
        */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Project Refit Uses WebRTC</ModalHeader>
          <ModalBody>
            The video technology we use is only supported by Chrome and Firefox (so far). Please download one of these browsers to use Project Refit Chat.
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>
              <a href='https://www.mozilla.org/en-US/firefox/new/'>Download Firefox</a></Button>
            <Button color='primary' onClick={this.toggle}>
              <a href='https://www.google.com/chrome/browser/desktop/index.html'>Download Chrome</a></Button>
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Compatibility;