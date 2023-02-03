const express = require('express');

class Route {
    #path;
    /**
     * @param {string} path 
     */
    constructor(path) {
        this.#path = path;

        this.router = express.Router();
    };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    get(callback) { this.router.get(this.#path, callback); return this };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    post(callback) { this.router.post(this.#path, callback); return this };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    put(callback) { this.router.put(this.#path, callback); return this };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    delete(callback) { this.router.delete(this.#path, callback); return this };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    head(callback) { this.router.head(this.#path, callback); return this };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    connect(callback) { this.router.connect(this.#path, callback); return this };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    options(callback) { this.router.options(this.#path, callback); return this };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    trace(callback) { this.router.trace(this.#path, callback); return this };
    /**
     * @param {(req: express.Request, res: express.Response, next: express.NextFunction)} callback
     */
    patch(callback) { this.router.patch(this.#path, callback); return this };
};

module.exports = { Route };