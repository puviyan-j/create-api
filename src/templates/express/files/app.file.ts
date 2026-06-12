export function appfile(module: 'commonjs' | 'modulejs'):string {

    if (module === 'commonjs') return cjs();
    return mjs()

}

function cjs() {

    return `
    const express = require('express');
    const app = express();
    const cors = require('cors');
    const Router = require('./routes/index');
    const {ErrorHandler} = require('./middlewares/error.middleware');
    app.use(cors());
    
    app.use('/v1',Router);
    app.use(ErrorHandler)

    module.exports = app;`
};

function mjs() {

    return `
    import express from 'express';
    import cors from 'cors';
    const app = express();
    import Router from './routes/index.js';
    import {ErrorHandler} from './middlewares/error.middleware.js';
    app.use(cors());
    app.use('/v1',Router);
    app.use(ErrorHandler)
    
    export default app`
}