/* eslint-disable */
import React from 'react';

const renderClasses = (props) => {
  if(props.streamOpen && props.controlOn) {
    return 'btn btn-success'
  }
  if(props.streamOpen && !props.controlOn) {
    return 'btn btn-success'
  }
  if(!props.streamOpen) {
    return 'btn btn-default';
  }
}

export default (props) => {
  return (
    <button
      onClick={props.onClick} type="button"
      className={`${renderClasses(props)} ${props.className}`}
    >
      <i className={props.faClass} aria-hidden="true" />
    </button>
  )
}
