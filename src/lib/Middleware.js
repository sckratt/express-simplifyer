const express = require('express');

class Middleware {
    #args;

    /**
     * @param {...(string | (req: express.Request, res: express.Response, next: express.NextFunction) => unknown)} args
     */
    constructor(...args) {
        this.#args = args;

        this.router = this.#Router();
    };

    /**
     * @returns {express.Router}
     */
    #Router() {
        const router = express.Router();

        router.use(...this.#args);

        return router;
    }
};

module.exports = { Middleware };