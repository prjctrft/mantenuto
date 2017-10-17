# Modules
This is where most of the important things in our app are taking place.

In general, most of the time a module will correspond directly to a route.  For example, `./Password` is the set of routes at `/password`.  In fact,`./Password/index.js` exports `./Password/routes.js` from that module.

There are some notable exceptions to this convention.  For example, `./App` is the parent app rendered at `/` by `react-router`, from which all other routes will inherit.   Additionally, `./Auth` contains some really important [HOC Components](https://reactjs.org/docs/higher-order-components.html) that serve important functions like require a user to be logged in at a certain route, or fire the authentication pipeline if a token is found in the `localStorage` or in a `cookie`.

Finally, `./user` does not contain any components, but rather contains a set of common actions used to manage user data.

## Module Structure
Typically modules will resemble the following structure:
* `./routes.js`: will contain all routes for the module.  Typically the root route for the module will match the module name.  e.g. The `./Password` module will mount at `/password`.
* `./index.js`: can exports routes, or the important components - for example, [`./Auth/index.js`](https://github.com/hdngr/mantenuto/tree/master/src/modules/Auth/index.js)
* `./redux.js`: the reducer, all actions, and action creators for the module - following the [ducks proposal](https://github.com/erikras/ducks-modular-redux).  Some modules, for example, [`./Register/index.js`](https://github.com/prjctrft/mantenuto/blob/master/src/modules/Register/redux.js) follows this convention, while [`./Rooms`](https://github.com/prjctrft/mantenuto/tree/master/src/modules/Rooms) splits actions, creators, and the reducer into three different files.
* `./components`: will contain any components used to render parts of the module.  For example, check out [`./Talk/components`](https://github.com/prjctrft/mantenuto/tree/master/src/modules/Talk)
* `./assets`: any images, or other media assets used within the module.
* `./SomeAwesomeSubModule`: for modules that are larger, they may contain submodules.  For instance, `./Home` renders routes and handles logic for the landing page `/`.  [`./Home/Home.js`](https://github.com/prjctrft/mantenuto/blob/master/src/modules/Home/Home.js) handles the public landing page (when users aren't logged in), where as [`./Home/Authenticated`](https://github.com/prjctrft/mantenuto/tree/master/src/modules/Home/Authenticated) handles the landing page when users are logged in.
