import fs from 'fs-extra'
import path from 'path'
import type{Answers} from '../types/answers.js'

export async function generatepackage(pathName: string, answer: Answers) {
    const {projectName,language,module} = answer;
 const content:any ={
    "name":projectName,
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
    "start":language=== "javascript"?"node src/index.js": "node dist/index.js",
    "dev":language==="javascript"?"node --watch index.js":"tsx src/index.ts",
    "format":"prettier --write .",
    "lint":"eslint"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": module==="modulejs" ?"module":"commonjs"
    }

    language==="typescript"&&(content.scripts.build="tsc");

    fs.writeJSON(path.join(pathName,'package.json'),content,{spaces:2})

} 