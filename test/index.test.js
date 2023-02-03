const App = require('../src/index');
const path = require('path');

new App()
.loadMiddlewares(path.resolve(__dirname, "middlewares"))
.loadRoutes(path.resolve(__dirname, "routes"))
.start(3000, () => {
    console.log("EXPRESS-SIMPLIFYER: Test server running on port 3000");
});