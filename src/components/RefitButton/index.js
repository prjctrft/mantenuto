import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import CircleButton from '../CircleButton';
import SquareButton from '../SquareButton';

class RefitButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: '0'
    }
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  updateWindowWidth() {
    this.setState({
      width: window.innerWidth
    })
  }

  render() {
    const styles = require('./RefitButton.scss');
    return ( this.state.width >= 768 ? 
      <CircleButton 
        onClick={this.props.onClick}
        className={`${this.props.className}, ${styles.RefitButton}`} 
        content={this.props.content}
      /> 
      : 
      <SquareButton 
        onClick={this.props.onClick}
        className={`${this.props.className}, ${styles.RefitButton}`} 
        content={this.props.content}
      /> 
    )
  }
}

RefitButton.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

RefitButton.defaultProps = {
  className: ''
}

export default RefitButton