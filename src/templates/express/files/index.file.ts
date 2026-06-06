

export function generateIndex(module:'commonjs'|'modulejs') {
    
   return `
    ${module === 'commonjs'?`const app = require('./app.js')`:`import app from './app.js'`}
    const port = process.env.PORT;
    app.listen(port,()=>{
        console.log('server is running port',port)
    })`
}