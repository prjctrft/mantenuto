require('./server.babel.js');
require('dotenv').config();
const request = require('superagent')
const fs = require('fs');

global.__SERVER__ = true;
const restApp = require('./src/app').restApp;

const { EMAIL, USER_ID, PW, API_ENDPOINT } = process.env;

// authenticate against production server
restApp.authenticate({
  strategy: 'local',
  lookup: EMAIL,
  password: PW
}).then(({accessToken}) => {
  const env = fs.readFileSync('.env');
  return {oldEnv: env, accessToken};
}).then(({oldEnv, accessToken}) => {
  debugger;
  const newLine = `TOKEN=${accessToken}\n`;
  const trimToken = oldEnv.toString().split('\n');
  // if the last line is `TOKEN=`
  let newEnv;
  if(trimToken[trimToken.length - 2].search('TOKEN=') === 0) {
    newEnv = [].concat(trimToken.slice(0, trimToken.length - 2), [newLine]).join('\n');
  };
  // if(trimToken[trimToken.length].search(token))
  // add token to .env file to be used in the rest of tests
  return fs.writeFile('.env', newEnv, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}).catch((err) => {
  console.log(err);
});
