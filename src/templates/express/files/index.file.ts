
const commonjs = ["require('dotenv').config();", "const app = require('./app.js');"]
const modulejs = ["import 'dotenv/config'", "import app from './app.js'"]
export function generateIndex(module: 'commonjs' | 'modulejs'): string {
    return`
    ${module === 'commonjs' ? commonjs.join("\n") : modulejs.join('\n')}

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log('server is running port', port)
    })

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

    })`


}