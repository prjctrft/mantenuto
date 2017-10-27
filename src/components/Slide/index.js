import React from 'react';
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
    // transform: 'translate(0%)'
    transform: 'translate(100vw)',
    transition: `transform ${duration * 0.75}ms ease-in-out`
  },
  'exited': {
    // transform: 'translate(100vw)',
    // transition: `transform ${duration}ms ease-in-out`
    display: 'none',
    transform: 'translate(100vw)'
  }
})


const Slide = ({ slideIn, children, duration, className }) => (
  <Transition in={slideIn} timeout={duration}>
    {(state) => (
      <div className={className || ''} style={{
        ...defaultStyles,
        ...transitionStyles(duration)[state]
      }}>
      { children }
      </div>
    )}
  </Transition>
);

export default Slide;
