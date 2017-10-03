# Testing
One of the best things about using React, is that there are a really great set of tools
for testing.  [Facebook's Jest](https://facebook.github.io/jest/) and [Airbnb's Enzyme](http://airbnb.io/enzyme/) being the two most important.  We use jest to run our tests, enzyme to mock render and traverse components, and [chai](http://chaijs.com/) as our assertion library.

## Getting Started
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

* [API Calls]() - TODO, need to setup some good integration tests.

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
