const express = require('express');
const fs = require('fs');
const path = require('path');

const { Middleware } = require('./Middleware');
const { Route } = require('./Route');

class App {
    #app;
    /**
     * @typedef {object} AppConfig 
     * @property {object} views
     * @property {string} views.dirname
     * @property {string} views.engine
     * @property {Route[]} routes
     * @property {Middleware[]} middlewares 
     */
    /**
     * @param {AppConfig} config
     */
    constructor(config) {
        this.#app = express()
            .use(express.urlencoded({ extended: true }))
        if(config?.views?.dirname) this.#app.set("views", config.views.dirname);
        if(config?.views?.engine) this.#app.set("view engine", config.views.engine);

        this.routes = config?.routes ?? [];
        this.middlewares = config?.middlewares ?? [];
    };

    /**
     * @param {string} dirname
     */
    loadMiddlewares(dirname) {
        fs.readdirSync(dirname)
        .forEach(dir => {
            if(fs.statSync(path.join(dirname, dir)).isDirectory()) return this.loadMiddlewares(path.join(dirname, dir));
            
            if(dir.endsWith(".js")) {
                const execute = require(path.relative(__dirname, path.join(dirname, dir)));
                if(execute instanceof Middleware) this.middlewares.push(execute);
            };
        });
        return this;
    };
    /**
     * @param {string} dirname
     */
    loadRoutes(dirname) {
        fs.readdirSync(dirname)
        .forEach(dir => {
            if(fs.statSync(path.join(dirname, dir)).isDirectory()) this.loadRoutes(path.join(dirname, dir));
            else if(dir.endsWith(".js")) {
                const execute = require(path.relative(__dirname, path.join(dirname, dir)));
                console.log((path.relative(__dirname, path.join(dirname, dir))));
                if(execute instanceof Route) this.routes.push(execute);
            };
        });
        return this;
    };

    /**
     * @param {string} path 
     * @param {string} dirname 
     */
    static(path, dirname) {
        this.#app.use(path, express.static(dirname));
    };

    /**
     * @param {number} port 
     * @param {() => unknown} callback 
     */
    start(port, callback) {
        for(let middleware of this.middlewares) this.#app.use(middleware.router);
        for(let route of this.routes) this.#app.use(route.router);
        this.#app.listen(port, callback);
        return this;
    };
};

module.exports = { App };