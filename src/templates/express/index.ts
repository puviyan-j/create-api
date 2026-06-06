import type { Answers } from "../../types/answers.js";
import { createfile } from "./files.js";
import { generateFolders } from "./folders.js";
import {execa} from 'execa'


export async function expressTemplate(answer:Answers, projectPath:string) {

    const { language,architecture } = answer;
    await generateFolders(answer,projectPath);
    await createfile(answer, projectPath)

    if(language === 'typescript') await initTypescript(projectPath)

}

async function initTypescript(projectPath:string){
const dependencies = ["express","cors","helmet",];

await execa("npm",["install", ...dependencies],{ cwd: projectPath});

const devdependencies = ["prettier","eslint","@types/node","@types/express"];
   
await execa('npm',['install','-D',...devdependencies],{cwd:projectPath});

// await execa('npx',['tsc','--init'],{cwd:projectPath})

}