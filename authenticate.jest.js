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
  let env;
  try {
    env = fs.readFileSync('.env');
  } catch(e) {
    // if env doesn't exist (like in circleci), build from scratch
    env = [`EMAIL=${EMAIL}`, `USER_ID=${USER_ID}`, `PW=${PW}`, `API_ENDPOINT=${API_ENDPOINT}`].join('\n');
    console.log(e);
  }
  return {oldEnv: env, accessToken};
}).then(({oldEnv, accessToken}) => {
  const newLines = ['# These lines created automatically by "authenticate.jest.js"', `TOKEN=${accessToken}\n`];
  let newEnv = oldEnv.toString().split('\n');
  // if the last line is `TOKEN=`
  if(newEnv[newEnv.length - 2].search('TOKEN=') === 0) {
    newEnv = newEnv.slice(0, newEnv.length - 3);
  };
  newEnv = [].concat(newEnv, newLines).join('\n')
  // if(trimToken[trimToken.length].search(token))
  // add token to .env file to be used in the rest of tests
  return fs.writeFile('.env', newEnv, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}).catch((err) => {
  console.log(err);
});
