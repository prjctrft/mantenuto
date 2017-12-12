import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Compatibility extends Component {
  constructor(props) {
    super(props);
    this.inCompatableRoutes = ['talk', 'listen', 'rooms']
    this.state = {
      modal: false,
      browserIncompatible: false
    };
  }

  componentDidMount() {
    const { detect } = require('detect-browser');
    const browser = detect();

    // handle the case where we don't detect the browser
    switch (browser && browser.name) {
      case 'chrome':
      case 'firefox':
        break;
      default:
        this.setState({
          browserIncompatible: true,
          modal: true
        });
        this.forbidRoute(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.browserIncompatible) {
      this.forbidRoute(nextProps);
    }
  }

  forbidRoute = (props) => {
    const path = props.pathname.split('/')[1];
    if(this.inCompatableRoutes.indexOf(path) !== -1) {
      props.push('/');
      this.setState({modal: true});
    }
  }

  toggle = () => {
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
            <div class='row'>
              <p className='col-md text-center'>
                <a className='btn btn-primary' target='_blank' onClick={this.toggle} href='https://www.mozilla.org/en-US/firefox/new/'>Download Firefox <i class="fa fa-firefox" aria-hidden="true"></i></a>
              </p>
              <p className='col-md text-center'>
                <a className='btn btn-primary' target='_blank' onClick={this.toggle} href='https://www.google.com/chrome/browser/desktop/index.html'>Download Chrome <i class="fa fa-chrome" aria-hidden="true"></i></a>
              </p>
              <p className='col-md text-center'>
                <Button color='secondary' onClick={this.toggle}>Cancel</Button>
              </p>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const pathname = state.routing.locationBeforeTransitions.pathname;
  return { pathname }
}

export default connect(mapStateToProps, { push })(Compatibility);
