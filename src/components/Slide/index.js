import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const defaultStyles = {
  width: '100%',
  height: '100%'
}

const transitionStyles = (duration) => ({
  'entering': {
    transform: 'translate(100vw)'
  },
  'entered': {
    transform: 'translate(0%)',
    transition: `transform ${duration * 0.75}ms ease-in-out`
  },
  'exiting': {
    transform: 'translate(100vw)',
    transition: `transform ${duration * 0.75}ms ease-in-out`
  },
  'exited': {
    display: 'none',
    transform: 'translate(100vw)'
  }
})


const Slide = ({ slideIn, children, duration, className }) => (
  <Transition in={slideIn} timeout={duration}>
    {(state) => (
      <div
        className={className || ''} style={{
        ...defaultStyles,
        ...transitionStyles(duration)[state]
      }}
      >
        { children }
      </div>
    )}
  </Transition>
);

Slide.propTypes = {
  slideIn: PropTypes.bool.isRequired, // whether or not elements are visible
  children: PropTypes.arrayOf(PropTypes.element).isRequired, // element(s) to slide in
  duration: PropTypes.number.isRequired, // how long transition takes
  className: PropTypes.string // apply custom classes to element
}

export default Slide;
