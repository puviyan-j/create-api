import type { Module, Orm } from '../../../types/answers.js';

const commonjs = ["require('dotenv').config();", "const app = require('./app.js');"];
const modulejs = ["import 'dotenv/config'", "import app from './app.js'"];
export function generateIndex(module: Module, orm: Orm): string {
  return `
    ${module === 'commonjs' ? commonjs.join('\n') : modulejs.join('\n')};
    ${databaseimport(module, orm)}

    const port = process.env.PORT;
 
    ${startserver(orm)}

    process.on("unhandledRejection", (error) => {
        console.log("unhandledRejection", error)
    });

    process.on("uncaughtException", (error) => {
        console.log("uncaughtException", error)
    })

    process.on("SIGTERM", () => {
        console.log("SIGTERM received");
        process.exit(0)
    });

    process.on("SIGINT", () => {
        console.log("SIGINT received");
        process.exit(0)

    })`;
}
const databaseimport = (module: Module, orm: Orm) => {
  if (orm === 'mongoose') {
    return module === 'commonjs'
      ? "const { connectDb } = require('./config/db')"
      : "import { connectDb } from './config/db.js'";
  }

  return '';
};

const startserver = (orm: Orm) => {
  if (orm === 'mongoose') {
    return `
    connectDb().then(() => {
        app.listen(port, () => {
            console.log('server is running port', port)
        })
    }).catch(() => {
        process.exit(0)
    });`;
  }

  return `app.listen(port, () => {
        console.log('server is running port', port)
    })`;
};
