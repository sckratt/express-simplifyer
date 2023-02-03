const { Route } = require('../../src/lib/Route');

module.exports = new Route("/")
.get(async (req, res, next) => {
    res.send("Welcome to EXPRESS-INITIALIZER !");
});