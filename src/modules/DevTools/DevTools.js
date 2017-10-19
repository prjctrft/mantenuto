/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    toggleVisibilityKey="ctrl-H"
    changePositionKey="ctrl-Q"
  >
    {/* Reimplemnet when this is fixed: https://github.com/alexkuz/react-json-tree/issues/94 */}
    {/* <LogMonitor /> */}
  </DockMonitor>
);
