export function appfile(module:'commonjs'|'modulejs'){

if(module === 'commonjs') return cjs();
if(module === 'modulejs') return mjs()
    
}

function cjs(){

   return `require('dotenv').config();
    const express = require('express');
    const app = express();
    const cors = require('cors');
    app.use(cors());
    module.exports = app;`
};

function mjs() {

   return `import 'dotenv/config';
    import express from 'express';
    import cors from 'cors';
const app = express();
app.use(cors())
export default app`
}