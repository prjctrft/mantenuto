import React from 'react';

import Looking from './Looking';
import ListenerFound from './ListenerFound';
import RoomReady from './RoomReady';
import ListenerNotFound from './ListenerNotFound';

import styles from './Talk.scss';

const Talk = (props) => {
  return (
    <div className={styles.talk}>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 text-center'>
            {props.pipeline === 'looking' ? <Looking /> : null}
            {props.pipeline === 'listenerFound' ? <ListenerFound /> : null}
            {props.pipeline === 'roomReady' ? <RoomReady /> : null}
            {props.pipeline === 'listenerNotFound' ? <ListenerNotFound /> : null}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Talk;
