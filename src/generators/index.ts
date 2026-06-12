import { createProjectDirectory } from "./project.generator.js"
import type { Answers } from "../types/answers.js"
import { generateEnv } from "./env.generator.js";
import { generatePrettier } from "./prettier.generator.js";
import { generatorGit } from "./git.generator.js";
import { generatepackage } from "./package.generator.js";
export const runGenerator =async(answer:Answers ,projectPath:string)=>{
  await generateEnv(projectPath)
  await generatePrettier(projectPath)
  await generatorGit(projectPath)
  await generatepackage(projectPath,answer)
 
}