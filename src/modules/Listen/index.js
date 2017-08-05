import React, { Component } from 'react';

export default (props) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 text-center'>
          <h1>Finding someone that needs your ears now!</h1>
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
          <p>There are currently 10 in the queue.</p>
        </div>
      </div>
    </div>
  )
};
