# express-simplifyer

This module allows you to launch an express server easily.

## Usage

```javascript
const { App } = require('express-simplifyer');

const app = new App({
  views: {
    dirname: __dirname + '/views',
    engine: 'ejs'
  },
  routes: [
    new Route('/').get((req, res) => {
      res.render('index');
    }),
    new Route('/contact').get((req, res) => {
      res.render('contact');
    })
  ],
  middlewares: [
    // Use Middleware class
    new Middleware((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    }),$

    // Or express middlewares
    require('morgan')('common'),
    require('express-session')({ secret: "..." })
  ]
});

app.loadMiddlewares(__dirname + '/middlewares')
  .loadRoutes(__dirname + '/routes')
  .static('/public', __dirname + '/public')
  .start(3000, () => {
    console.log('Server started on port 3000');
  });
```

## Docs

### Class : App

The App class is used to define and launch the express server.

#### Constructor

The constructor takes as input a configuration in the form of an object:

```yaml
{
    views: {
        dirname: string,
        engine: string
    },
    routes: Route[],
    middlewares: Middleware[]
}
```

- **`views`** defines the views used by the server.
    - **`dirname`** defines the views directory.
    - **`engine`** defines the view engine used.
- **`routes`** defines server routes.
- **`middlewares`** defines the server middleware.


#### Methods

- **`loadMiddlewares(dirname: string)`** is used to load the middlewares of a directory.
- **`loadRoutes(dirname: string)`** Allows you to load routes from a directory.
- **`static(path: string, dirname: string)`** allows you to add a static directory to the application.
- **`start(port: number, callback: () => unknown)`** allows to start the server on a given port with a callback function.



### Class : Middleware

The Middleware class is used to define a middleware.

#### Exemple

```javascript
// src/middlewares/authorization.js
const { Middleware } = require("express-simplifyer");

module.exports = new Middleware((req, res, next) => {
    const authorization = req.header("Authorization");

    if(authorization === "secret") next();
    else res.sendStatus(401);
});

// Or use an express middleware, like morgan
module.exports = new Middleware(
    require('morgan')('common')
);

// Or express-session
module.exports = new Middleware(
    require('express-session')({
        secret: "...",
        resave: true
    })
);
```

#### Properties

- **`router`** defines the middleware router.



### Class : Route

The Route class is used to define a route.

#### Usage

```javascript
const { Route } = require("express-simplifyer");

module.exports = new Route("/")
.get((req, res) => {
    res.send("Bienvenue sur la page d'accueil !");
});
```

#### Properties

- **`router`** defines the router of the route

#### Methods

- **`<Route>.get()`**
- **`<Route>.post()`**
- **`<Route>.put()`**
- **`<Route>.delete()`**
- **`<Route>.patch()`**
- **`<Route>.head()`**
- **`<Route>.trace()`**
- **`<Route>.connect()`**