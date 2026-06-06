
import type { Answers } from "../../types/answers.js";
import fs from 'fs-extra'
import path from 'path'
import { generateIndex } from "./files/index.file.js";
import { appfile } from "./files/app.file.js";
import { generateError } from "./files/error.file.js";

export async function createfile(answer:Answers,pathName:string) {

    const {architecture} = answer;

    if(architecture === 'mvc') await mvc(answer,pathName);

}

async function mvc(answer:Answers,pathName:string){

    const {language,module} = answer
   
    const files = [
        {name:'index',content:generateIndex(module)??''},
        {name:'app',content:appfile(module)??''},
        {name:'config/db',content:''},
        {name:'routes/index',content:''},
        {name:'routes/user.routes',content:''},
        {name:'controllers/user.controller',content:''},
        {name:'services/user.services',content:''},
        {name:'models/user.model',content:''},
        {name:'middlewares/auth.middleware',content:''},
        {name:'middlewares/error.middleware',content:generateError(answer)}
    ];

    const ext = language === 'typescript'?'ts':'js'

    for(let file of files){
    await fs.writeFile(path.join(pathName,`src/${file.name}.${ext}`),file.content)
    }



};