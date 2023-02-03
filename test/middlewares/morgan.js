const { Middleware } = require('../../src/lib/Middleware');

module.exports = new Middleware(require('morgan')("common"))