# Testing
One of the best things about using React, is that there are a really great set of tools
for testing.  [Facebook's Jest](https://facebook.github.io/jest/) and [Airbnb's Enzyme](http://airbnb.io/enzyme/) being the two most important.  We use jest to run our tests, enzyme to mock render and traverse components, and [chai](http://chaijs.com/) as our assertion library.

## Getting Started
Setup integration tests by creating a `.env` file with the following:
```
EMAIL=<YOUR_PROJECTREFIT_EMAIL>
USERNAME=<YOUR_PROJECTREFIT_USERNAME>
USER_ID=<YOUR_USER_ID>
PW=<YOUR_PASSWORD>
API_ENDPOINT=https://api.projectrefit.us
# don't check this file in (duh)
```

Run all tests:
```
npm test
```

Run the test suite in watch mode:
```
# this will keep the test runner alive, and only rerun the tests that fail
# or that are affected by a file change
npm run tdd
```

Run the tests with a debugger:
```
# requires node ~8
# e.g. nvm use 8
npm run debug-tests
```

## What to Test
The following are things that **should** be tested

* [Basic rendering](https://github.com/prjctrft/mantenuto/blob/master/src/modules/App/components/Footer.test.js) - at the least, make sure a component is not broken

* [Route configuration](https://github.com/prjctrft/mantenuto/blob/master/src/modules/Listen/index.test.js) - make sure our routes are in the places we expect, rendering the components we expect

* [State Changes](https://github.com/prjctrft/mantenuto/blob/master/src/modules/Talk/TalkController.test.js) - test that states change when they are expected to

* [Socket event listeners](https://github.com/prjctrft/mantenuto/blob/master/src/modules/Talk/TalkController.test.js) - test that the correct listeners are registered and that they fire the proper methods

* [Reducers](https://github.com/prjctrft/mantenuto/blob/master/src/modules/Auth/redux.test.js) - test that the store changes as expected when an action is fired

* [Actions]() - TODO, need some good examples of testing redux actions.

* [API Calls](https://github.com/prjctrft/mantenuto/blob/master/src/modules/users/redux.test.js) - test that api calls used will return expected results.

* [Any important ui expectations](https://github.com/prjctrft/mantenuto/blob/master/src/modules/Home/Home.test.js) - like that an image is present

Example of testing with socket events:
`modules/Talk/TalkController.test.js`
Example of testing UI:
`modules/Home/Home.test.js`

## What not to Test (Probably)
There is actually not a whole lot of things that are "bad" to test.  However, ultimately, in order to maximize the utilitiy of writing tests (and the time it takes for them to run), focussing on the important stuff means you can stay away from the following, in general:

* Any functionality or methods core to a well tested, third party library.  For example, When testing routes, instead of trying to mount the entire app, manually go to a route and then testing react router by asserting that `"<Foo>" should render at route '/foo'`.  Since `react-router` is well tested, just test our configuration as described above.

* Anything static.  Not because it is bad, but probably just because it is overkill.  For example:
  * Content of HTML tags
  * css styles

* Anything that will break in a CI environment.

## A Little Bit About How Tests are Set Up
Tests are set up to run locally and in circleci ci.
* `npm test` runs the tests
* `npm run tdd` will run the tests in watch mode for test driven development, e.g. only files that change are tested
* `npm run debug-tests` nothing more refreshing than being able to interactively debug tests

Before `jest` runs, `authenticate.jest.js` is run.  It looks for a `.env` file with the environment variables mentioned in the getting started section OR it will look for the variables directly in `process.env`.

These variables are used by `authenticate.jest.js` to create a new env variables called `TOKEN` that will be used to authenticate api requests with the given user.

In development, use your own identity, or have an admin create you a user.  All tests should fix what they break, or restore data to original state, so using your own identity shouldn't be a problem (but undoubtedly it will at some point be a problem).

`jest` itself will use the `setup.jest.js` file to setup each test.  This sets some important variables, loads the `.env` file created by `authenticate.jest.js` and sets up `Enzyme` to be used with React 16.
