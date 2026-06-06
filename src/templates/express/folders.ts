import path from "node:path";
import type { Answers } from "../../types/answers.js";
import fs from 'fs-extra'

export async function generateFolders(answers:Answers,pathName:string) {
    const {architecture,language} = answers;
    if(architecture==='mvc') await mvc(language,pathName);
    if(architecture==='feature') await feature()
    
    
}

async function mvc (language:'javascript'|'typescript',pathName:string){
    const folders:string[] = ['controllers','config','models','routes','services','middlewares','validations','utils'];

    if(language === 'typescript'){
        folders.push('types')
    }

    await fs.mkdir(path.join(pathName,'src'));
    
    for( let folder of folders){
     await fs.mkdir(path.join(pathName,`src/${folder}`));
    }

    

}

async function feature(){

}